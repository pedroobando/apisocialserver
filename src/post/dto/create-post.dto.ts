import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePostDto {
  // @Type(() => Number)
  // readonly no: number;

  @IsString()
  userId: string;

  @IsString()
  fullName: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  picturePath?: string;
}
