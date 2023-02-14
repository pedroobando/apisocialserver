import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdatePostLike {
  @IsString()
  userId: string;
}
