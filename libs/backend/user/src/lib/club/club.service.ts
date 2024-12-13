import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Club as ClubModel, ClubDocument } from './club.schema';
import { IFindClub, ICreateClub } from '@avans-nx-workshop/shared/api';
import { CreateClubDto, UpdateClubDto } from '@avans-nx-workshop/backend/dto';
import { PlayerDocument, Player } from '../player/player.schema';
import { IFindPlayer } from '@avans-nx-workshop/shared/api';


@Injectable()
export class ClubService {
  private readonly logger: Logger = new Logger(ClubService.name);

  constructor(
    @InjectModel(ClubModel.name) private clubModel: Model<ClubDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>, // Injecteer het Player-model
  ) {}

  async findAll(): Promise<IFindClub[]> {
    this.logger.log(`Finding all clubs`);
    return this.clubModel.find().lean().exec();
  }

  async findOne(_id: string): Promise<IFindClub | null> {
    this.logger.log(`Finding club with id ${_id}`);
    
    // Probeer de club te vinden
    const club = await this.clubModel.findOne({ _id }).lean().exec();
    
    if (!club) {
      this.logger.debug(`Club with id ${_id} not found`);
    }
    return club;
  }

  async create(club: CreateClubDto): Promise<ICreateClub> {
    this.logger.log(`Creating club ${club.name}`);
    const createdClub = new this.clubModel(club);
    const savedClub = await createdClub.save();
    return savedClub.toObject(); // Gebruik .toObject() voor consistentie
  }

  async update(_id: string, club: UpdateClubDto): Promise<IFindClub | null> {
    this.logger.log(`Updating club with id ${_id}`);
    return this.clubModel
      .findByIdAndUpdate(_id, club, { new: true })
      .lean()
      .exec();
  }

  async findPlayersByClub(clubId: string): Promise<IFindPlayer[] | null> {
    this.logger.log(`Finding players for club with id ${clubId}`);
    const club = await this.clubModel.findById(clubId).exec();
    if (!club) {
      throw new HttpException('Club not found', 404);
    }
    return this.playerModel.find({ _id: { $in: club.players } }).lean().exec();
  }
}