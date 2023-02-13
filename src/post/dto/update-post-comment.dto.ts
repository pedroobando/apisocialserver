import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePostCommentDto {
  @IsString()
  userId: string;

  @MinLength(1)
  @MaxLength(250)
  comment: string;
}
