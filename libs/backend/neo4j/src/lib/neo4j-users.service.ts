import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class Neo4JUserService {
  private readonly logger = new Logger(Neo4JUserService.name);

  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll(): Promise<any> {
    this.logger.log('Executing Neo4j query to find users connected to Informatica Team');
    const query = `
      MATCH (p:User)-[:WORKS_IN]->(t:Team {name: 'Informatica'})
      RETURN p
    `;
    const result = await this.neo4jService.read(query);
    const users = result.records.map(record => record.get('p').properties);
    return users;
  }
}