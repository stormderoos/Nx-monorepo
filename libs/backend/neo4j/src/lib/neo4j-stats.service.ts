import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j';

@Injectable()
export class Neo4JPlayerService {
  private readonly logger = new Logger(Neo4JPlayerService.name);

  constructor(private readonly neo4jService: Neo4jService) {}

  async getPlayers(): Promise<any[]> {
    this.logger.log('Fetching all players from Neo4j');
    const query = `
      MATCH (p:Player)
      RETURN p
    `;
    const result = await this.neo4jService.read(query);
    return result.records.map(record => record.get('p').properties);
  }
  
  async getPlayerStats(playerId: string): Promise<{ goals: number; assists: number }> {
    this.logger.log(`Fetching stats for player with id ${playerId}`);
    const query = `
      MATCH (p:Player {id: $playerId})
      OPTIONAL MATCH (m1:Match)-[:SCORED_BY]->(p)
      OPTIONAL MATCH (m2:Match)-[:ASSISTED_BY]->(p)
      RETURN count(m1) AS goals, count(m2) AS assists
    `;
    const result = await this.neo4jService.read(query, { playerId });
    const record = result.records[0];
    return {
      goals: record.get('goals').toNumber(),
      assists: record.get('assists').toNumber(),
    };
  }
}