import ModelGalleryVideos from '../models/GalleryVideos.js'
import Sequelize from 'sequelize';
import { getPaginate } from "../common/utils/getPaginate.js";


export class GalleryVideosService {

    constructor() { }

    async createVideo(transaction, data) {

        const Video = ModelGalleryVideos.create(data, transaction)
            .catch(() => {
                throw 'badRequest';
            });

        return Video;
    }

    async getList(query) {


        const { size, page} = query;

        const { limit, offset } = getPaginate(page, size);

        
        const count = await ModelGalleryVideos.count({where: { status: true }});

        const countPage = Math.floor(Math.abs(count - 1) / limit);

        const video = await ModelGalleryVideos.findAll({
            where: { status: true },
            order: [
                ['id', 'DESC'],
            ],
            offset: offset,
            limit: limit
        });

        return { ...video, count: count, limit: limit, offset: offset, countPage: countPage }

    }

    async getAllVideo(query) {

        const { size, page} = query;

        const { limit, offset } = getPaginate(page, size);

         
        const count = await ModelGalleryVideos.count();

        const countPage = Math.floor(Math.abs(count - 1) / limit);

        const video = await ModelGalleryVideos.findAll({
            order: [
                ['id', 'DESC'],
            ],
            offset: offset,
            limit: limit
        });

        return { ...video, count: count, limit: limit, offset: offset, countPage: countPage }
    }

    async getOneVideo(id) {

        const Video = await ModelGalleryVideos.findOne({ where: { id: id } });

        if (Video === null) {
            throw 'notFound'
        }

        return Video;
    }

    async deleteVideo(id) {

        let Video = await ModelGalleryVideos.findOne({ where: { id: id } });

        if (Video === null) {
            throw 'notFound'
        }

        await ModelGalleryVideos.update(
            {
                status: false,
            },
            {
                where: {
                    id: id
                }
            })

        return true;
    }

    async activeVideo(id) {

        let Video = await ModelGalleryVideos.findOne({ where: { id: id } });

        if (Video === null) {
            throw 'notFound'
        }

        await ModelGalleryVideos.update(
            {
                status: true,
            },
            {
                where: {
                    id: id
                }
            })

        return true;
    }


    async editVideo(transaction, data) {

        let Video = await ModelGalleryVideos.findOne({ where: { id: data.video_id } });

        if (Video === null) {
            throw 'notFound'
        }

        await ModelGalleryVideos.update(
            data,
            {
                where: {
                    id: data.video_id
                }
            }, transaction)
            .then(async function (result) {
                Video = await ModelGalleryVideos.findOne({ where: { id: data.video_id } });
            });
        return Video;
    }
}