import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Club } from '../club/club.schema';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  location!: string;

  @Prop()
  home_club_id!: string;

  @Prop()
  away_club_id!: string;

  @Prop({ required: false, default: null })
  score_home: number | undefined;

  @Prop({ required: false, default: null })
  score_away: number | undefined;
}

export const MatchSchema = SchemaFactory.createForClass(Match);