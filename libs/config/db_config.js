import { Sequelize, Model } from 'sequelize'
import * as dotenv from 'dotenv'
import config from "./config.js"
import mysql2 from 'mysql2'
dotenv.config()


const database = new Sequelize(config.NAME_DATA_BASE, config.USER_NAME, config.PASSWORD, {
    host: config.SEQUELIZE_URI,
    dialect: config.TIPY_CONNECTION, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialectModule: mysql2,
});

await database.authenticate();
console.log('connect sucess bd for sequelize', database.getDatabaseName());


export { database, Model }
