import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema()
export class Match {
  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  home_club_id!: string;

  @Prop({ required: true })
  away_club_id!: string;

  @Prop({ required: false, default: null })
  score_home?: number;

  @Prop({ required: false, default: null })
  score_away?: number;
}

export const MatchSchema = SchemaFactory.createForClass(Match);