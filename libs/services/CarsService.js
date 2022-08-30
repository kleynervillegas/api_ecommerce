import ModelUsers from '../models/Users.js'
import Sequelize from 'sequelize';
import ModelCars from '../models/Cars.js'
import ModelPublications from '../models/Publications.js'

export class CarsService {

    constructor() { }  


    async addCars(data,user,transaction) {        
        const cars = await ModelCars.create({...data,user_id: user.id},transaction)
        .catch( () =>{
            throw 'badRequest';
        });
        return cars;
    }

    async getCarUser(user) {

        const carsUser = await ModelCars.findAll({ 
            where: {user_id: user.id },
            include:[
                {
                    model: ModelPublications,
                    as: 'Refpublication'
                },
                {
                    model: ModelUsers,
                    as: 'RefUser'
                }                                         
            ]
            
        });

        if (carsUser === null) {
            throw 'notFound'
        }

        return carsUser;
    }

    async disabledNotify(id) {

        let Roles = await ModelRoles.findOne({ where: { id: id } });

        if (Roles === null) {
            throw 'notFound'
        }

        await ModelRoles.update(
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

}