import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Player } from '../player/player.schema';

export type ClubDocument = Club & Document;

@Schema()
export class Club {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({
    required: false,
    default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png',
  })
  logoUrl!: string;

  @Prop()
  players: string[] | undefined;
}

export const ClubSchema = SchemaFactory.createForClass(Club);