import { isValidObjectId, Model } from 'mongoose';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { Post, PostDocument } from './entities';
import { CreatePostDto, PaginationPostDto, UpdatePostDto } from './dto';
import { UserDocument } from 'src/user/entities';
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
    await this.userService.findOne(userId);

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
    // const _term = term.toLocaleLowerCase().trim();
    let post: PostDocument;

    // Por no
    // if (!isNaN(+term)) {
    // post = await this.postModel.findOne({ email: term.toLowerCase().trim() }).select('-password');
    // }

    // Por MongoId
    if (!post && isValidObjectId(term)) {
      post = await this.postModel.findById(term);
    }

    // if (!user) {
    //   user = await this.userModel.findOne({ firstName: term, lastName: term });
    // }

    // Por Name
    // if (!user) {
    //   user = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    // }

    // not found
    if (!post) throw new NotFoundException(`Post with id no "${term}" not found`);

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  private handleExceptions(error: any): void {
    if (error.code === 11000) {
      throw new BadRequestException(`Post exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Post in db - Check server logs`);
  }
}
