import * as dotenv from 'dotenv';

dotenv.config();

export default {
    APP: process.env.APP || 'development',
    BASE_URL: process.env.BASE_URL || 'http://localhost:5007',//'https://dosapi.digipe.com',
    PORT: '5007',
    DB_DIALECT: process.env.DB_DIALECT || 'mongo',
    DB_HOST: 'mongodb://localhost:27017/sankar_groups',
    DB_NAME: process.env.DB_NAME || 'sankar_groups',
    DB_PASSWORD: process.env.DB_PASSWORD || 'xVZ70cYMFAEzBOVM',
    DB_PORT: process.env.DB_PORT || '27017',
    DB_USER: process.env.DB_USER || 'swami',
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || '2B63532B9D6329A7113821CD4C4EA',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    
    MSG91_AUTH_KEY: process.env.MSG91_AUTH_KEY || '283524A5dW2fNzsJ55d1b5585',
    MSG91_ROUTE_NO: process.env.MSG91_ROUTE_NO || 4,
    MSG91_SENDER_ID: process.env.MSG91_SENDER_ID || 'DIGIPE',
    
    IMAGE_PATH: process.env.IMAGE_PATH || 'images',
    // smtp details
    MAIL_HOST: process.env.MAIL_HOST || 'mail.digipe.in',
    PORT_NO: process.env.PORT_NO || '465',
    MAIL_USER: process.env.MAIL_USER || 'reports@digipe.in',
    MAIL_PASSWORD: process.env.MAIL_PASSWORD || 'rdigi@1q2w',

};
