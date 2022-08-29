import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelUser from './Users.js'

class gallerys extends Model { }

const gallery = gallerys.init({
    name: {
        type: Sequelize.STRING
    }, 
    publication_id: {
        type: Sequelize.INTEGER
    },  
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }, 
},
{
    sequelize: database,
    schema: 'public',
    modelName: 'gallery_photos',
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

export default gallerys;