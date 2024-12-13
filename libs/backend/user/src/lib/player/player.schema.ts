import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true })
  firstName!: string;

  @Prop({ required: true })
  lastName!: string;

  @Prop({
    required: true,
    enum: ['GK', 'LB', 'CB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'ST', 'RW'],
  })
  position!: string;

  @Prop()
  clubId?: string;

  @Prop({ required: true })
  birthdate!: Date;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);