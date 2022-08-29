import { database, Model } from '../config/db_config.js';
import Sequelize from 'sequelize';
import ModelUser from '../models/Users.js'
import ModelGallery from '../models/Gallery.js'
import ModelRefCategoriesPublications from "./RefCategoriesPublications.js"
import ModelCategories from "../models/Categories.js"


class publications extends Model { }

const Publication = publications.init({
    user_id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    url_dir_image: {
        type: Sequelize.STRING,
    },
    featured: {
        type: Sequelize.BOOLEAN
    },
    image: {
        type: Sequelize.STRING
    },
    body_news: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    user_disabled_id: {
        type: Sequelize.INTEGER
    },
    url_video: {
        type: Sequelize.STRING,
        defaultValue: null
    },
},
    {
        sequelize: database,
        schema: 'public',
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
publications.hasMany(ModelGallery, {
    foreignKey: "publication_id"
})
ModelGallery.belongsTo(publications, {
    foreignKey: "id"
})

publications.belongsToMany(ModelCategories, { through: ModelRefCategoriesPublications });

ModelCategories.belongsToMany(publications, { through: ModelRefCategoriesPublications });





export default publications;