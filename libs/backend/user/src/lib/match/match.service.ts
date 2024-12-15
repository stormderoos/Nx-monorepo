import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './match.schema';
import { IMatch, IFindMatch } from '@avans-nx-workshop/shared/api';
import { CreateMatchDto, UpdateMatchDto } from '@avans-nx-workshop/backend/dto';
import { ClubService } from '../club/club.service';

@Injectable()
export class MatchService {
  private readonly logger: Logger = new Logger(MatchService.name);

  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    private readonly clubService: ClubService, 
  ) {}

  async findAll(): Promise<IFindMatch[]> {
    this.logger.log('Finding all matches');
    return this.matchModel.find().populate('home_club_id away_club_id').lean().exec();
  }

  async findOne(_id: string): Promise<IFindMatch | null> {
    this.logger.log(`Finding match with id ${_id}`);
    return this.matchModel.findById(_id).populate('home_club_id away_club_id').lean().exec();
  }

  async create(match: CreateMatchDto): Promise<Match> {
    this.logger.log(`Creating match between ${match.home_club_id} and ${match.away_club_id}`);
    const createdMatch = new this.matchModel(match);
    const savedMatch = await createdMatch.save();
    return savedMatch.toObject(); 
  }

  async update(_id: string, match: UpdateMatchDto): Promise<IFindMatch | null> {
    this.logger.log(`Updating match with id ${_id}`);
    return this.matchModel
      .findByIdAndUpdate(_id, match, { new: true })
      .populate('home_club_id away_club_id')
      .lean()
      .exec();
  }

  async delete(_id: string): Promise<void> {
    this.logger.log(`Deleting match with id ${_id}`);
    await this.matchModel.findByIdAndDelete(_id).exec();
  }
}