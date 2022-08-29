import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';

class GalleryVideos extends Model { }

const GalleryVideo = GalleryVideos.init({
    title: {
        type: Sequelize.STRING(100)
    },
    description: {
        type: Sequelize.STRING(100)
    },
    url_video: {
        type: Sequelize.STRING(100)
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
},
    {
        sequelize: database,
        schema: 'public',
        modelName: 'gallery_videos',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })

export default GalleryVideos;