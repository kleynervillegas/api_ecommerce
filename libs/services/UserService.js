import { CrudService } from "../common/crud/CrudService.js"
import ModelUser from "../models/Users.js"
import ModelRoles from "../models/Roles.js"
import bcrypt from 'bcrypt'
import Sequelize from 'sequelize';
import { getPaginate } from "../common/utils/getPaginate.js";

export class UserService {
    constructor() { }

    async userCreate(transaction, data) {
      
        const user = await ModelUser.create({
            full_name: data.full_name,
            last_names: data.last_names,
            number_id: data.number_id,
            email: data.email,
            type_number_id: data.type_number_id,
            password: await bcrypt.hash(data.password, parseInt(process.env['SALT'])),
            number_phone: data.number_phone,
            role_id: data.role_id,
        }, transaction)
            .catch((error) => {
                throw 'badRequest';
            });

        user.password = ""

        return user;
    }

    async userEdit(transaction, data, user) {
        delete data.password;
        let userUpDate = await ModelUser.findOne({ where: { id: data.user_id } })
        if (userUpDate === null) {
            throw 'notFound'
        }

        await ModelUser.update(
            data,
            {
                where: {
                    id: data.user_id
                }
            })
            .then(async function (result) {
                userUpDate = await ModelUser.findOne(
                    {
                        where: { id: data.user_id },
                        attributes: {
                            exclude: ['password', 'role_id']
                        },
                        include: [
                            {
                                model: ModelRoles,
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt']
                                }
                            }
                        ]
                    }
                );
            }).catch(function (err) {
                throw 'notCreate'
            })

        return userUpDate
    }
    async userDisabled(transaction, id) {
        const user = await ModelUser.findOne({ where: { id: id } })
        if (user === null) {
            throw 'notFound'
        }

        await ModelUser.update(
            { status: false },
            {
                where: {
                    id: id
                }
            }, transaction);

        return true
    }

    async userActive(transaction, id) {
        const user = await ModelUser.findOne({ where: { id: id } })
        if (user === null) {
            throw 'notFound'
        }

        await ModelUser.update(
            { status: true },
            {
                where: {
                    id: id
                }
            }, transaction);

        return true
    }

    async ValidateUser(number_id) {

        const user = await ModelUser.findOne(
            {
                where: {
                    number_id: number_id,
                    status: true
                },
                attributes: {
                    exclude: ['password']
                }
            }
        )

        if (user === null) {
            throw 'notFound'
        }

        return true
    }

    async passwordChange(transaction, data) {
        const user = await ModelUser.findOne({ where: { id: data.user_id,status:true } })
        if (user === null) {
            throw 'notFound'
        }

        await ModelUser.update(
            { password: await bcrypt.hash(data.password, parseInt(process.env['SALT'])) },
            {
                where: {
                    id: data.user_id
                }
            }, transaction)
            .catch(() => {
                throw 'badRequest';
            });
        return true
    }
    async passwordRecovery(transaction, data) {
        const user = await ModelUser.findOne({ where: { number_id: data.number_id,status:true } })
        if (user === null) {
            throw 'notFound'
        }

        await ModelUser.update(
            { password: await bcrypt.hash(data.password, parseInt(process.env['SALT'])) },
            {
                where: {
                    number_id: data.number_id
                }
            }, transaction);

        return true
    }

    async getAllUser(query) {

        const Op = Sequelize.Op;

        const { size, page } = query;

        const { limit, offset } = getPaginate(page, size);

        const count = await ModelUser.count({where: {[Op.not]: [{ role_id: 1 }]},});

        const countPage = Math.floor(Math.abs(count - 1) / limit);

        const user = await ModelUser.findAll(
            {
                where: {
                    [Op.not]: [{ role_id: 1 }]
                },
                attributes: {
                    exclude: ['password', 'role_id', 'createdAt', 'updatedAt'],
                },
                order: [
                    ['id', 'DESC'],
                ],
                include: [
                    {
                        model: ModelRoles,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
                offset: offset,
                limit: limit
            }
        );
        return { ...user, count: count, limit: limit, offset: offset, countPage: countPage }
    }

    async getOneUser(id) {

        const Op = Sequelize.Op;

        const user = ModelUser.findOne(
            {
                where: {
                    id: id,
                    [Op.not]: [{ role_id: 1 }]
                },
                attributes: {
                    exclude: ['password', 'role_id'],
                },
                include: [
                    {
                        model: ModelRoles,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ]
            }
        );
        return user;
    }
}