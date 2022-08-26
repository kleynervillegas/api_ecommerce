import ModelCategories from '../models/Categories.js'
import ModelRefCategoriesPublications from '../models/RefCategoriesPublications.js'
import { getPaginate } from "../common/utils/getPaginate.js";

export class CategoriesService {

    constructor() { }

    async createCategory(transaction, data) {

        const category = ModelCategories.create(data, transaction);

        return category;
    }

    async getAllCategory(query) {

        const { size, page } = query;

        const { limit, offset } = getPaginate(page, size);
        
        const count = await ModelCategories.count();
         
        const countPage = Math.floor(Math.abs(count - 1) / limit);

        const category = await ModelCategories.findAll({
            order: [['id', 'DESC']],
            offset: offset,
            limit: limit,
        });

        return { ...category, count: count, limit: limit, offset: offset, countPage: countPage }
    }

    async getList(query) {       

        const category = await ModelCategories.findAll({
            where: {
                status: true
            },
            order: [['id', 'DESC']],           
        });

        return category
    }

    async getOneCategory(id) {

        const category = await ModelCategories.findOne({ where: { id: id } });

        if (category === null) {
            throw 'notFound'
        }

        return category;
    }

    async deleteCategory(id) {

        let category = await ModelCategories.findOne(
            {
                where:
                {
                    id: id
                },
                include: [
                    {
                        model: ModelRefCategoriesPublications,
                        as: 'RefCategory'
                    }
                ]
            });

        if (category === null) {
            throw 'notFound'
        }

        if (category.RefCategory.length > 0) {
            throw 'notDisableCategory'
        }

        await ModelCategories.update(
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

    async activeCategory(id) {

        let category = await ModelCategories.findOne({ where: { id: id } });

        if (category === null) {
            throw 'notFound'
        }

        await ModelCategories.update(
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

    async editCategory(transaction, data) {

        let category = await ModelCategories.findOne({ where: { id: data.category_id } });

        if (category === null) {
            throw 'notFound'
        }

        await ModelCategories.update(
            data,
            {
                where: {
                    id: data.category_id
                }
            }, transaction)
            .then(async function (result) {
                category = await ModelCategories.findOne({ where: { id: data.category_id } });
            });
        return category;
    }
}