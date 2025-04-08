import { IsNotEmpty, IsDate, IsOptional, IsString, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMatchDto {
  date!: Date;          
  location!: string;
  home_club_id!: string;
  away_club_id!: string;
  
  // Optionele scores
  score_home?: number;
  score_away?: number;

  scorers?: string[];
  assisters?: string[];
}
export class UpdateMatchDto {
  date?: Date;
  location?: string;
  home_club_id?: string;
  away_club_id?: string;
  score_home?: number;
  score_away?: number;
  scorers?: string[];
  assisters?: string[];
}