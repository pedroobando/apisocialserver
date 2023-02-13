import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto';
// import { CreatePostDto } from './create-post.dto';

export class PaginationPostDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  userId?: string;

  // @IsString()
  // fullName: string;

  // @IsString()
  // description: string;

  @IsOptional()
  @IsString()
  location?: string;

  // @IsOptional()
  // @IsString()
  // picturePath?: string;
}
