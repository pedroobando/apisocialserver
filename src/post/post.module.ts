import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CommonModule } from 'src/common/common.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './entities';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    UserModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
