import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelUser from '../models/Users.js'
import ModelGalleryImage from './GalleryImage.js'


class publications extends Model { }

const Publication = publications.init({
    user_id: {
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    coin: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.DOUBLE
    },
    stop_min: {
        type: Sequelize.INTEGER
    },
    stop_max: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
},
    {
        sequelize: database,
        modelName: 'publications',
        timestamps: true,
        underscored: true,
        freezeTableName: true
    })
//relacion para los usuarios que crean la publicacion
ModelUser.hasOne(publications, {
    foreignKey: "id"
})
publications.belongsTo(ModelUser, {
    foreignKey: "user_id"
})

//relacion para la galeria de la publicacion
publications.hasMany(ModelGalleryImage, {
    foreignKey: "publication_id"
})
ModelGalleryImage.belongsTo(publications, {
    foreignKey: "id"
})

// publications.belongsToMany(ModelCategories, { through: ModelRefCategoriesPublications });

// ModelCategories.belongsToMany(publications, { through: ModelRefCategoriesPublications });





export default publications;