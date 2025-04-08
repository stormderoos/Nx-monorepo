import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole, UserGender } from '@avans-nx-workshop/shared/api';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ 
    type: String, 
    required: true, 
    enum: Object.values(UserRole),
    default: UserRole.User 
  })
  role!: UserRole;

  @Prop({ 
    required: false, 
    default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png' 
  })
  profileImgUrl!: string;

  @Prop({ 
    type: String, 
    required: false, 
    enum: Object.values(UserGender),
    default: UserGender.Unknown 
  })
  gender!: UserGender;
}

export const UserSchema = SchemaFactory.createForClass(User);