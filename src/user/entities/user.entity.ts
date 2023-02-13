import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: true,
    min: 2,
    max: 50,
  })
  firstName: string;

  @Prop({
    required: true,
    min: 2,
    max: 50,
  })
  lastName: string;

  @Prop({
    required: true,
    min: 2,
    index: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ default: '' })
  picturePath: string;

  @Prop([String])
  friends: string[];

  @Prop({ default: '' })
  location: string;

  @Prop({ default: '' })
  occupation: string;

  @Prop({ default: 0 })
  impressions: number;

  @Prop({ default: 0 })
  viewedProfile: number;

  @Prop()
  createdAt?: number;

  @Prop()
  updatedAt?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
