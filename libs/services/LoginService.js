import { CrudService } from "../common/crud/CrudService.js"
import ModelUser from "../models/Users.js"
import ModelRoles from '../models/Roles.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export class LoginService {

    constructor() { }

    async loginUser(data) {
        
        if (data.email && data.password) {

            const user = await ModelUser.findOne(
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
                            attributes: ['name', 'status'],
                        }
                    ]


                },

            );
            if (user && user.status) {
                if (await bcrypt.compare(data.password, user.password)) {
                    user.password = ""
                    const token = await jwt.sign(
                        { user },
                        process.env['JWT_KEY'],
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