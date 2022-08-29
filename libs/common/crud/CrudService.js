export class CrudService {
    constructor(model) {
        this.model = model
    }

    /**
     * @Params transaction {sequelize} - Debe ser extraido de la transaccion de sequelize
     * @Params data {Object} - Objeto que contiene la informacion a actualizar
     * @Params validation {null} - Campo actualmente sin uso, sera utilizado para realizar las validaciones
    **/
    async create(transaction,data, validation = null) {
        return this.model
        .create(data,transaction)
        .then((instance) => {
            return instance;
        })
        .catch((error) => {
            if (error.code === 11000) throw 'notCreate';
            throw 'badRequest';
        });
    }

    /**
     * @Params where {Object} - Objeto para realizar las busquedas especificas
     * @Params attributes {Object} - Objeto que contiene atributos para la base de datos
     * @Params order {Object} 
    **/
    async findOne(where=null, attributes=null, order=null){
        const filter = {}
        if(where) filter.where = where;
        if(attributes) filter.attributes = attributes;
        if(order) filter.order = order;

        return this.model
        .findOne(filter)
    }

    /**
     * @Params where {Object} - Objeto para realizar las busquedas especificas
     * @Params attributes {Object} - Objeto que contiene atributos para la base de datos
     * @Params order {Object} 
    **/
    async findAll(where=null, attributes=null, order=null){
        const filter = {}
        if(where) filter.where = where;
        if(attributes) filter.attributes = attributes;
        if(order) filter.order = order;

        return this.model
        .findAll(filter)
    }

    /**
     * @Params transaction {sequelize} - Debe ser extraido de la transaccion de sequelize
     * @Params where {Object} - Objeto para realizar las busquedas especificas
     * @Params data {Object} - Objeto que contiene la informacion a actualizar
     * @Params validation {null} - Campo actualmente sin uso, sera utilizado para realizar las validaciones
    **/
    async update(transaction, where, data, validation = null) {
        return this.model
        .update(data, where, transaction)
        .then((instance) => {
            return instance;
        })
        .catch((error) => {
            if (error.code === 11000) throw 'notCreate';
            throw 'badRequest';
        });
    }
}