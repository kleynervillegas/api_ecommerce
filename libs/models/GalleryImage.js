import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelUser from './Users.js'

class gallerysImage extends Model { }

const galleryImage = gallerysImage.init({
    url_image: {
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
    modelName: 'gallerys_image',
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

export default gallerysImage;