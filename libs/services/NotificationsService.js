import ModelRoles from '../models/Roles.js'
import Sequelize from 'sequelize';
import ModelNotifications from '../models/Notifications.js'


export class NotificationsService {

    constructor() { }  


    async getAllNotifyuser(user) {
        const notify = await ModelNotifications.findAll({where:{user_id:user.id,view_notify:false}});
        return notify;
    }

    async getOneRole(id) {

        const Roles = await ModelRoles.findOne({ where: {id: id } });

        if (Roles === null) {
            throw 'notFound'
        }

        return Roles;
    }

    async disabledNotify(id) {

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

}