import { Global, Module } from '@nestjs/common';
import { Neo4jModule as NestNeo4jModule } from 'nest-neo4j';
import { environment } from '@avans-nx-workshop/shared/util-env'; 

@Global()
@Module({
  imports: [
    NestNeo4jModule.forRoot({
      scheme: 'bolt',
      host: environment.NEO4J_HOST,
      port: environment.NEO4J_PORT,
      username: environment.NEO4J_USERNAME,
      password: environment.NEO4J_PASSWORD,
    }),
  ],
  exports: [NestNeo4jModule], 
})
export class Neo4jModule {}