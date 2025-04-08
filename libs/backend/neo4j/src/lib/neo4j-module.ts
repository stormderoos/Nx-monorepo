import { Global, Module } from '@nestjs/common';
import { Neo4jModule as NestNeo4jModule } from 'nest-neo4j';

@Global()
@Module({
  imports: [
    NestNeo4jModule.forRoot({
      scheme: 'bolt',
      host: process.env['NEO4J_HOST'] || 'localhost',
      port: Number(process.env['NEO4J_PORT']) || 7687,
      username: process.env['NEO4J_USERNAME'] || 'neo4j',
      password: process.env['NEO4J_PASSWORD'] || 'TTcFQDP_tZU5nglZ1RtyzM_5p4yY6X1tKdGGlNDmrOI',
    }),
  ],
  exports: [NestNeo4jModule],
})
export class Neo4jModule {}