import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import CompanyController from './controllers/Companies/CompanyController';

import {MongoHelper} from './helpers/MongoHelper';

const app = new App({
    port: 5000,
    controllers: [
        new CompanyController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true}),
        loggerMiddleware
    ],
    mongoHelper: MongoHelper
});

app.listen();
