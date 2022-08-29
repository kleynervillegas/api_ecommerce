import ModelRoles from '../models/Roles.js'
import Sequelize from 'sequelize';

export class RolesService {

    constructor() { }

    async createRoles(transaction, data, token) {

        const Roles = ModelRoles.create(data, transaction)
        .catch( () =>{
            throw 'badRequest';
        });

        return Roles;
    }

    async getList() {

        const Op = Sequelize.Op;
        const Roles = ModelRoles.findAll({where:{status:true,[Op.not]: [{ id: 1 }]}});

        return Roles;
    }

    async getAllRoles() {
        const Op = Sequelize.Op;
        const Roles = ModelRoles.findAll({where:{[Op.not]: [{ id: 1 }]}});
        return Roles;
    }

    async getOneRole(id) {

        const Roles = await ModelRoles.findOne({ where: {id: id } });

        if (Roles === null) {
            throw 'notFound'
        }

        return Roles;
    }

    async deleteRole(id) {

        let Roles = await ModelRoles.findOne({ where: { id: id } });

        if (Roles === null) {
            throw 'notFound'
        }

        await ModelRoles.update(
            {
                status: false,
            },
            {
                where: {
                    id: id
                }
            })
           
        return true;
    }

    async activeRole(id) {

        let Roles = await ModelRoles.findOne({ where: { id: id } });

        if (Roles === null) {
            throw 'notFound'
        }

        await ModelRoles.update(
            {
                status: true,
            },
            {
                where: {
                    id: id
                }
            })
           
        return true;
    }


    async editRole(transaction, data) {

        let Roles = await ModelRoles.findOne({ where: { id: data.role_id } });

        if (Roles === null) {
            throw 'notFound'
        }

        await ModelRoles.update(
            data,
            {
                where: {
                    id: data.role_id
                }
            }, transaction)
            .then(async function (result) {
                Roles = await ModelRoles.findOne({ where: { id: data.role_id } });
            });
        return Roles;
    }
}