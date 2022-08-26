import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelRoles from './Roles.js'
class Users extends Model { }

const User = Users.init({
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    }, 
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    role_id: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    number_id: {
        type: Sequelize.STRING,
        unique: true
    }
},
{
    sequelize: database,
    schema: 'public',
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

export default User;