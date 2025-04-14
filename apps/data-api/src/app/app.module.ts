import { Module, Logger } from '@nestjs/common';
import { AuthModule } from '@avans-nx-workshop/backend/auth';
import { UsersModule } from '@avans-nx-workshop/backend/user';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { Neo4jBackendModule} from '@avans-nx-workshop/backend/neo4j'

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          Logger.verbose(`Mongoose connected to ${environment.MONGO_DB_CONNECTION_STRING}`);
        });
        return connection;
      },
    }),
    UsersModule, Neo4jBackendModule
  ],
})
export class AppModule {}