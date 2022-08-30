import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelUser from '../models/Users.js';
import ModelPublications from '../models/Publications.js'


class Cars extends Model { }

const cars = Cars.init({
    count: {
        type: Sequelize.INTEGER
    },
    publication_id: {
        type: Sequelize.INTEGER
    },
    user_id: {
        type: Sequelize.INTEGER
    },
},
    {
        sequelize: database,
        modelName: 'cars',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })


Cars.hasMany(ModelPublications, {
    foreignKey: "id",
    as: 'Refpublication'
})

Cars.hasOne(ModelUser, {
    foreignKey: "id",
    as: 'RefUser'
})

export default Cars;