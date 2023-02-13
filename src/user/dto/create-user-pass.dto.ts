import { IsString, MinLength } from 'class-validator';

export class CreateUserPassWordDto {
  @IsString()
  @MinLength(4, { message: 'password must be greanter than four' })
  password: string;
}
