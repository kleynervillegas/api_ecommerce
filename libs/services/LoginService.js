import ModelUser from "../models/Users.js"
import ModelRoles from '../models/Roles.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export class LoginService {

    constructor() { }

    async loginUser(data) {

        if (data.email && data.password) {

            let user = await ModelUser.findOne(
                {
                    attributes: {
                        exclude: ['role_id']
                    },
                    where: {
                        email: data.email
                    },
                    include: [
                        {
                            model: ModelRoles,
                            attributes: ['id','name', 'status'],
                        }
                    ]


                },

            );
            if (user && user.status) {
                if (await bcrypt.compare(data.password, user.password)) {
                     user = {
                        id:user.id,
                        full_name:user.full_name,
                        last_names:user.last_names,
                        number_id:user.number_id,
                        type_number_id:user.type_number_id,
                        number_phone:user.number_phone,
                        email:user.email,
                        createdAt:user.createdAt,
                        role_id:user.role.id,
                        role_name:user.role.name
                    }
                    const token = await jwt.sign(
                        { user },
                        process.env['jwtSecret'],
                        { expiresIn: process.env['AUTH_EXPIRED_TIME'] });
                    return { authorization: token }
                } else {
                    throw 'incorrectPassword';
                }
            }
        }
        throw 'Unauthorized'
    }
}