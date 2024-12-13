import { IsNotEmpty, IsDate, IsOptional, IsString, IsDateString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsDateString()
  date!: string;

  @IsNotEmpty()
  location!: string;

  @IsNotEmpty()
  home_club_id!: Types.ObjectId;

  @IsNotEmpty()
  away_club_id!: Types.ObjectId;

  @IsOptional()
  score_home?: number;

  @IsOptional()
  score_away?: number;
}

export class UpdateMatchDto {
  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  home_club_id?: Types.ObjectId;

  @IsOptional()
  away_club_id?: Types.ObjectId;

  @IsOptional()
  score_home?: number;

  @IsOptional()
  score_away?: number;
}