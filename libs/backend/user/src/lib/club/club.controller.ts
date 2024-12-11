import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClubService } from './club.service';
import { IClub } from '@avans-nx-workshop/shared/api';
import { CreateClubDto, UpdateClubDto } from '@avans-nx-workshop/backend/dto';
import { ClubExistGuard } from './club-exists.guard';

@Controller('clubs')
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get()
  async findAll(): Promise<IClub[]> {
    return this.clubService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IClub | null> {
    return this.clubService.findOne(id);
  }

  @Post('')
  @UseGuards(ClubExistGuard)
  create(@Body() club: CreateClubDto): Promise<IClub> {
    return this.clubService.create(club);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() club: UpdateClubDto,
  ): Promise<IClub | null> {
    return this.clubService.update(id, club);
  }
}