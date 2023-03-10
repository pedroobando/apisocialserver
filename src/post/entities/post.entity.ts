import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
// import { User } from 'src/user/entities';
// import { User } from 'src/user/entities';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({
    required: true,
    index: true,
  })
  userId: string;

  @Prop({
    required: true,
    index: true,
  })
  fullName: string;

  @Prop({
    default: '',
    index: true,
  })
  location: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  picturePath: string;

  @Prop({ default: '' })
  userPicturePath: string;

  @Prop({
    index: true,
  })
  likes: string[];

  @Prop()
  comments: [{ id: string; userId: string; comment: string }];

  // @Prop([String])
  // friends: string[];

  // @Prop({ default: '' })
  // occupation: string;

  // @Prop({ default: 0 })
  // impressions: number;

  // @Prop({ default: 0 })
  // viewedProfile: number;

  @Prop()
  createdAt?: number;

  @Prop()
  updatedAt?: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
