import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: false,

    ROOT_DOMAIN_URL: 'http://localhost:3000',
    dataApiUrl: 'http://localhost:3000/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://swderoos:swWelkom01!@footballdbcluster.vsocs.mongodb.net/',

    NEO4J_HOST: 'localhost',
    NEO4J_PORT: 7687,
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'swWelkom01!',
    NEO4J_QUERY_API_URL: 'https://localhost:7474/db/neo4j/query/v2'
};
