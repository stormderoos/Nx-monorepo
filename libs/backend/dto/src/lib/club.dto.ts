import { IsString, IsBoolean, IsInt, IsOptional, IsMongoId } from 'class-validator';


export class CreateClubDto {
  @IsString()
  name!: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;
}

export class UpdateClubDto {
    @IsString()
    name!: string;
  
    @IsString()
    location!: string;
  
  
    @IsOptional()
    @IsString()
    logoUrl?: string;
  }