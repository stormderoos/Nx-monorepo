import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:4000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://swderoos:swWelkom01!@footballdbcluster.vsocs.mongodb.net/'
};
