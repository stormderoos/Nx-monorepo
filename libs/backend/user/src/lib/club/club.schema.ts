import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsMongoId } from 'class-validator';

export type ClubDocument = Club & Document;

@Schema()
export class Club {
  @IsMongoId()
  id!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  location!: string;

  @Prop()
  owner_id!: string;

  @Prop({
    required: false,
    default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
  })
  logoUrl!: string;
}

export const ClubSchema = SchemaFactory.createForClass(Club);