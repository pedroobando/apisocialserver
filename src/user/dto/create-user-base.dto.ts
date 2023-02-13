import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsPositive, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserBaseDto {
  @MinLength(2, { message: 'firstname must be greanter tha two' })
  @MaxLength(50, { message: 'firstname must be less than or equal to fifty' })
  firstName: string;

  @MinLength(2, { message: 'lastname must be greanter than two' })
  @MaxLength(50, { message: 'lastname must be less than or equal to fifty' })
  lastName: string;

  @IsEmail()
  @MinLength(2, { message: 'email must be greanter than two' })
  email: string;

  @IsString()
  location: string;

  @IsString()
  occupation: string;

  // picturePath: string;
  // friends: string[];
  // viewedProfile: Number,
  // impressions: Number,
}
