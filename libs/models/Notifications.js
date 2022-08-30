import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';

class Notifications extends Model { }

const Notification = Notifications.init({
    description: {
        type: Sequelize.STRING(100)
    },
    origin: {
        type: Sequelize.STRING(100)
    },
    send_user: {
        type: Sequelize.BOOLEAN
    },
    publication_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER
    },
    user_origin_id: {
        type: Sequelize.INTEGER
    },
    first_notify: {
        type: Sequelize.BOOLEAN
    },
    view_notify: {
        type: Sequelize.BOOLEAN
    },
},
    {
        sequelize: database,
        modelName: 'notifications',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })

export default Notifications;