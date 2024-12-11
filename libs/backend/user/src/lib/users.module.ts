import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { ClubController } from './club/club.controller';
import { ClubService } from './club/club.service';
import { Club, ClubSchema } from './club/club.schema';
// import { Meal, MealSchema } from '@avans-nx-workshop/backend/features';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            
            { name: Club.name, schema: ClubSchema },
        ])
    ],
    controllers: [UserController, ClubController],
    providers: [UserService, ClubService],
    exports: [UserService, ClubService]
})
export class UsersModule {}
