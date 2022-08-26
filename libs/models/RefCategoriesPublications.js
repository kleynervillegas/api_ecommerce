import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';

class RefCategoriesPublications extends Model { }

const RefCategoriesPublication = RefCategoriesPublications.init({
    publicationId: {
        type: Sequelize.INTEGER
    },
    categoryId: {
        type: Sequelize.INTEGER
    },
},
    {
        sequelize: database,
        schema: 'public',
        modelName: 'ref_categories_publications',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })

export default RefCategoriesPublications;