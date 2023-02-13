import { isValidObjectId, Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Post, PostDocument } from './entities';
import { CreatePostDto, PaginationPostDto, UpdatePostDto } from './dto';

import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  private readonly defaulLimit: number;

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    this.defaulLimit = configService.get<number>('defaultLimit');
  }

  async create(createPostDto: CreatePostDto) {
    const { userId } = createPostDto;
    if (!isValidObjectId(userId)) {
      throw new BadRequestException(`User id ${userId} is not valid`);
    }
    await this.userService.findOneId(userId);

    try {
      const createdUser = await this.postModel.create(createPostDto);
      return createdUser;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationPostDto: PaginationPostDto) {
    const { limit = this.defaulLimit, offset = 0, userId = undefined, location = undefined } = paginationPostDto;
    let posts: PostDocument[];

    if (userId && isValidObjectId(userId)) {
      posts = await this.postModel.find({ userId }).limit(limit).skip(offset).sort({ createdAt: -1 }).exec();
    }

    if (!posts && location) {
      posts = await this.postModel
        .find({ location: new RegExp(location, 'i') })
        .limit(limit)
        .skip(offset)
        .sort({ createdAt: -1 })
        .exec();
    }

    if (!posts) {
      posts = await this.postModel.find({}).limit(limit).skip(offset).sort({ createdAt: -1 }).exec();
    }

    return posts;
  }

  async findOne(term: string) {
    let post: PostDocument;

    if (!post && isValidObjectId(term)) {
      post = await this.postModel.findById(term);
    }

    if (!post) throw new NotFoundException(`Post with id no "${term}" not found`);

    return post;
  }

  async update(term: string, updatePostDto: UpdatePostDto) {
    const updatePost = await this.findOne(term);
    // if (updateDUserDto.email) updateUserDto.email = updateUserDto.email.toLowerCase().trim();

    try {
      await updatePost.updateOne(updatePostDto);
      return { ...updatePost.toJSON(), ...updatePostDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const removePost = await this.postModel.findByIdAndDelete(id);
    if (!removePost) throw new BadRequestException(`Post with id: ${id} not found`);
    return removePost;
  }

  private handleExceptions(error: any): void {
    if (error.code === 11000) {
      throw new BadRequestException(`Post exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Post in db - Check server logs`);
  }
}
