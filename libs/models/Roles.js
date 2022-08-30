import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';

class Roles extends Model { }

const Role = Roles.init({
    name: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},
    {
        sequelize: database,
        modelName: 'roles',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })

export default Roles;