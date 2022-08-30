import ModelPublication from "../models/Publications.js"
import fs from 'fs';
import * as dotenv from 'dotenv';
import uniqid from 'uniqid';
import ModelUser from '../models/Users.js'
import ModelGalleryImage from '../models/GalleryImage.js'
import { getPaginate } from "../common/utils/getPaginate.js";
import Sequelize from 'sequelize';

export class PublicationService {

    constructor() { }

    async createPublication(transaction, data, user) {

        const dataSave = {
            user_id: user.id,
            name: data.name,
            description: data.description,
            coin: data.coin,
            price: data.price,
            stop_min: data.stop_min,
            stop_max: data.stop_max,
        }

        const publication = await ModelPublication.create(dataSave, transaction);

        let galleryImage = {};

        let nameImage = {}

        const dataSaveGallery = await Promise.all(data.image.map(async (element) => {
            const name = await this.handleImage(
                element,
                process.env['URL_DIR_IMAGE'])
            nameImage = { ...nameImage, url_image: 'ecommerce/image/' + name, publication_id: publication.id }
            return nameImage
        }));

        galleryImage = await ModelGalleryImage.bulkCreate(dataSaveGallery, transaction);

        return { ...publication.dataValues, galleryImage: galleryImage };
    }

    async handleImage(file, urlDir, nameEdit) {

        const image = Buffer.from(file.substring(file.indexOf(',') + 1), 'base64');

        const splitOne = file.split('data:image/');

        const splitTwo = splitOne[1].split(';')

        let extension = '.' + splitTwo[0];

        let name = uniqid() + extension;

        if (nameEdit != undefined) name = nameEdit;

        const a = await fs.mkdir(urlDir, { recursive: true }, function (err) {
            if (err) {
                console.log(err)
            } else {
                fs.writeFile(urlDir + name, image, function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('imagen guardada correctamente')

                    }
                });
            }
        });

        return name
    }
 
    async getAllPublications(query) {

        const { size, page, filter, status, category, author, featured, multipleFilter } = query;

        const { limit, offset } = getPaginate(page, size);

        const Op = Sequelize.Op;
        ///todos los regitros
        const count = await ModelPublication.count();

        const countPage = Math.floor(Math.abs(count - 1) / limit);

        const publications = await ModelPublication.findAll({
            // attributes: { exclude: ['image', 'url_dir_html', 'image_news', 'user_id',] },
            order: [
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: ModelUser,
                    attributes: ['id', 'full_name', 'last_names'],
                },
                {
                    model: ModelGalleryImage,
                    attributes:['id','url_image']
                }
            ],
            offset: offset,
            limit: limit,
        })

        return {publications :publications, count: count, limit: limit, offset: offset, countPage: countPage }
    }

    async getOnePublications(id) {

        const publications = await ModelPublication.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: ModelUser,
                    attributes: ['id', 'full_name', 'last_names'],
                },
                {
                    model: ModelGalleryImage,
                    attributes: ['id', 'url_image', 'status']
                },             
            ],
        })

        return publications
    }
    async disabledPublications(id, user) {

        let publication = await ModelPublication.findOne({
            where: {
                id: id
            }
        }
        )

        if (publication === null) {
            throw 'notFound';
        }

        await ModelPublication.update(
            {
                status: false,
                user_disabled_id: user.id
            },
            {
                where: {
                    id: id
                }
            })
            .then(async function (result) {
                publication = await ModelPublication.findOne({ where: { id: id } });
            });

        return publication;
    }
    async activePublications(id, user) {

        let publication = await ModelPublication.findOne({
            where: {
                id: id
            }
        }
        )

        if (publication === null) {
            throw 'notFound';
        }

        await ModelPublication.update(
            {
                status: true,
                user_disabled_id: user.id
            },
            {
                where: {
                    id: id
                }
            })
            .then(async function (result) {
                publication = await ModelPublication.findOne({ where: { id: id } });
            });

        return publication;
    }
    async editPublications(transaction, data) {

        let gallery = {}

        let publication = await ModelPublication.findOne({
            where: {
                id: data.publication_id
            },
            include: [
                {
                    model: ModelGallery,
                    attributes: ['name', 'status'],
                }
            ]
        });

        if (publication === null) {
            throw 'notFound'
        }
        if (data.image) {

            const name = await this.handleImage(
                data.image,
                process.env['URL_DIR_IMAGE'],
                publication.image
            )

            delete data.image

            data = { ...data, image: publication.image }
        }
        if (data.gallery) {

            let nameImage = {}

            const dataSaveGallery = await Promise.all(data.gallery.map(async (element) => {

                const name = await this.handleImage(
                    element,
                    process.env['URL_DIR_GALLERY'])

                nameImage = { ...nameImage, name: 'gallery/' + name, publication_id: publication.id }

                return nameImage
            }));

            gallery = await ModelGallery.bulkCreate(
                dataSaveGallery,
                {
                    where: {
                        publication_id: publication.id
                    }
                })

        }

        if (data.categories) {

            let saveRefCategoryPublication = {}

            const category = await ModelRefCategoriesPublications.destroy(
                {
                    where: {
                        publication_id: publication.id,
                    },
                }
            )

            const RefCategoryPublication = await Promise.all(data.categories.map(async (element) => {
                return { ...saveRefCategoryPublication, categoryId: element, publicationId: publication.id };
            }));

            const categoryUpdate = await ModelRefCategoriesPublications.bulkCreate(RefCategoryPublication, transaction);
            delete data.categories;

        }
        await ModelPublication.update(
            data,
            {
                where: {
                    id: data.publication_id
                }
            })
            .then(async function (result) {
                publication = await ModelPublication.findOne({
                    attributes: { exclude: ['image', 'url_dir_html', 'image_news', 'user_id', 'body_news'] },
                    where:
                    {
                        id: data.publication_id
                    },

                    include: [
                        {
                            model: ModelUser,
                            attributes: ['id', 'first_name', 'last_name'],
                        },
                        {
                            model: ModelGallery,
                            attributes: ['id', 'name', 'status']
                        },
                        {
                            model: ModelCategories,
                            attributes: {
                                exclude: ['status', 'createdAt', 'updatedAt'],
                            }
                        },
                    ],
                });
            });

        return { ...publication.dataValues, gallery: gallery }
    }

    async deleteImagen(id) {

        let image = await ModelGallery.findOne({
            where: {
                id: id
            }
        });

        if (image === null) {
            throw 'notFound';
        }

        await image.destroy();

        await fs.unlink(process.env['URL_DIR_GALLERY'] + image.name.replace('gallery/', ''), (err) => {
            if (err) {
                console.error(err)
                return
            } else {
                console.log('imagen borrada correctamente');

            }
        })

        return []
    }
}