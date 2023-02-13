import { Type } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class UpdatePostLike {
  @IsString()
  userId: string;

  @Type(() => Boolean)
  @IsBoolean()
  like: boolean;
}
