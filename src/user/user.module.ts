import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from 'src/common/common.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities';

@Module({
  imports: [CommonModule, ConfigModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
