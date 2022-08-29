import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelRefCategoriesPublications from '../models/RefCategoriesPublications.js'

class categories extends Model { }

const category = categories.init({
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
        schema: 'public',
        modelName: 'categories',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })


categories.hasMany(ModelRefCategoriesPublications, {
    foreignKey: "category_id",
    as: 'RefCategory'
})


export default categories;