import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelRoles from './Roles.js'
import ModelNotifications from './Notifications.js'

class Users extends Model { }

const User = Users.init({
    full_name: {
        type: Sequelize.STRING
    },
    last_names: {
        type: Sequelize.STRING
    },
    number_id: {
        type: Sequelize.STRING,
        unique: true
    },
    type_number_id: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    number_phone: {
        type: Sequelize.STRING,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
},
    {
        sequelize: database,
        modelName: 'users',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })

ModelRoles.hasOne(Users, {
    foreignKey: "id"
})
Users.belongsTo(ModelRoles, {
    foreignKey: "role_id"
})

Users.hasMany(ModelNotifications, {
    foreignKey: "user_id"
})
ModelNotifications.belongsTo(Users, {
    foreignKey: "id"
})


export default User;