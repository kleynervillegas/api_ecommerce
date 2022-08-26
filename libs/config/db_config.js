import { Sequelize, Model } from 'sequelize'
import * as dotenv from 'dotenv'
import config from "./config.js"
dotenv.config()

const opts = {
    define: {}
}

// const database = new Sequelize('postgres://postgres:root@localhost:5432/admin_web', opts)
    

    //   Option 3: Passing parameters separately (other dialects)
     const database = new Sequelize(config.NAME_DATA_BASE, config.USER_NAME, config.PASSWORD, {
        host: config.SEQUELIZE_URI,
        dialect: config.TIPY_CONNECTION, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
        dialectModule: require('mysql2'),
    });

    await Sequelize.authenticate();
    console.log('connect sucess bd for sequelize', database.getNameDataBase  );


export { database, Model }
