import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBaseDto } from './create-user-base.dto';
// import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserBaseDto) {}
