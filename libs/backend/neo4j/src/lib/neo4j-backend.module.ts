import { Module } from '@nestjs/common';
import { Neo4jModule } from 'nest-neo4j';
import { Neo4JStatsController } from './neo4j.controller';
import { Neo4JUserService } from './neo4j-users.service';

@Module({
    imports: [Neo4jModule],
    controllers: [Neo4JStatsController],
    providers: [Neo4JUserService],
    exports: []
})
export class Neo4jBackendModule {}
