import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Club as ClubModel, ClubDocument } from './club.schema';
import { IClub } from '@avans-nx-workshop/shared/api';
import { CreateClubDto, UpdateClubDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class ClubService {
  private readonly logger: Logger = new Logger(ClubService.name);

  constructor(
    @InjectModel(ClubModel.name) private clubModel: Model<ClubDocument>,
  ) {}

  async findAll(): Promise<IClub[]> {
    this.logger.log(`Finding all clubs`);
    return this.clubModel.find().lean().exec(); // Voeg .lean() toe
  }

  async findOne(_id: string): Promise<IClub | null> {
    this.logger.log(`Finding club with id ${_id}`);
    return this.clubModel.findOne({ _id }).lean().exec(); // Voeg .lean() toe
  }

  async create(club: CreateClubDto): Promise<IClub> {
    this.logger.log(`Creating club ${club.name}`);
    const createdClub = new this.clubModel(club);
    const savedClub = await createdClub.save();
    return savedClub.toObject(); // Gebruik .toObject() voor consistentie
  }

  async update(_id: string, club: UpdateClubDto): Promise<IClub | null> {
    this.logger.log(`Updating club with id ${_id}`);
    return this.clubModel
      .findByIdAndUpdate(_id, club, { new: true })
      .lean()
      .exec(); // Voeg .lean() toe
  }
}