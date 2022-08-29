import { config } from "dotenv";
config();

export default {
    port: process.env.PORT || 8000,
    SEQUELIZE_URI: process.env.SEQUELIZE_URI,
    NAME_DATA_BASE: process.env.NAME_DATA_BASE,
    USER_NAME: process.env.USER_NAME,
    PASSWORD: process.env.PASSWORD,
    TIPY_CONNECTION: process.env.TYPE_CONNECTION,  
    jwtSecret: process.env.jwtSecret || "miclaveultrasecreta123*",
}