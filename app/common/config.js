

const ENV = process.env.NODE_ENV || 'development';
const config = {
    development: {
        DB_HOST: process.env.DEV_DB_HOST,
        DB_USER: process.env.DEV_DB_USER ,
        DB_PASSWORD: process.env.DEV_DB_PASSWORD ,
        DB_NAME: process.env.DEV_DB_NAME ,
        PORT: process.env.DEV_PORT,       
        JWT_SECRET: process.env.DEV_JWT_SECRET,
        DB_ENV:process.env.DEV_ENV
    },

    production: {
        DB_HOST: process.env.PROD_DB_HOST,
        DB_USER: process.env.PROD_DB_USER ,
        DB_PASSWORD: process.env.PROD_DB_PASSWORD ,
        DB_NAME: process.env.PROD_DB_NAME,
        PORT: process.env.PROD_PORT,       
        JWT_SECRET: process.env.PROD_JWT_SECRET,
        DB_ENV:process.env.PROD_ENV 
    }
};

module.exports = config[ENV]; // Use module.exports instead of export default
