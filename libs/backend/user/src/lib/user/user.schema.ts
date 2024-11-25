import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserGender } from '@avans-nx-workshop/shared/api';
import { IsMongoId,} from 'class-validator';

export type UserDocument = User & Document;

@Schema()
export class User {
    @IsMongoId()
    id!: string;

    @Prop({ required: true })
    username!: string;

    @Prop({ required: true, unique: true })
    email!: string;

    @Prop({ required: true, select: false })
    password!: string;

    @Prop({
        required: true,
        enum: Object.values(UserRole),
        default: UserRole.Fan,
        type: String,
    })
    role!: UserRole;

    @Prop({
        required: false,
        select: true,
        default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png'
    })
    profileImgUrl!: string;

    @Prop({
        required: false,
        type: String,
        default: UserGender
    })
    gender: UserGender = UserGender.Unknown;

}

export const UserSchema = SchemaFactory.createForClass(User);