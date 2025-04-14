import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
    production: true,

    ROOT_DOMAIN_URL: 'https://jolly-meadow-00d0ed103.5.azurestaticapps.net',
    dataApiUrl: 'https://nx-worskhop-nestjs-acdcg6hqd9b4cja2.westeurope-01.azurewebsites.net/api',

    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://swderoos:swWelkom01!@footballdbcluster.vsocs.mongodb.net/',


    NEO4J_HOST: 'neo4j+s://673ffbf9.databases.neo4j.io',
    NEO4J_PORT: 7687,
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: 'swWelkom01!',
    NEO4J_QUERY_API_URL: 'https://673ffbf9.databases.neo4j.io/db/neo4j/query/v2' 

};
