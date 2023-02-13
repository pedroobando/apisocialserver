import { isValidObjectId, Model } from 'mongoose';
import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';

import { BCryptAdapter } from 'src/common/adapter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class UserService {
  private readonly defaulLimit: number;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
    private readonly bcryptAdapter: BCryptAdapter,
  ) {
    this.defaulLimit = configService.get<number>('defaultLimit');
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.bcryptAdapter.hash(createUserDto.password);
      createUserDto.email = createUserDto.email.toLowerCase().trim();
      // createUserDto.details = '';
      const createdUser = await this.userModel.create(createUserDto);
      return createdUser;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaulLimit, offset = 0 } = paginationDto;
    return await this.userModel
      .find({})
      .limit(limit)
      .skip(offset)
      .sort({ firstName: 1, lastName: 1 })
      .select(['-password', '-__v']);
  }

  async findOne(term: string) {
    // const _term = term.toLocaleLowerCase().trim();
    let user: UserDocument;

    // Por no
    // if (!isNaN(+term)) {
    user = await this.userModel.findOne({ email: term.toLowerCase().trim() }).select('-password');
    // }

    // Por MongoId
    if (!user && isValidObjectId(term)) {
      user = await this.userModel.findById(term).select('-password');
    }

    // if (!user) {
    //   user = await this.userModel.findOne({ firstName: term, lastName: term });
    // }

    // Por Name
    // if (!user) {
    //   user = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    // }

    // not found
    if (!user) throw new NotFoundException(`User with id, email, lastname o firstname, no "${term}" not found`);

    return user;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(term);
    if (updateUserDto.email) updateUserDto.email = updateUserDto.email.toLowerCase().trim();

    try {
      await user.updateOne(updateUserDto);
      return { ...user.toJSON(), ...updateUserDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const removeUser = await this.userModel.findByIdAndDelete(id).select('-password');
    if (!removeUser) throw new BadRequestException(`User with id "${id}" not found`);
    return removeUser;
  }

  private handleExceptions(error: any): void {
    if (error.code === 11000) {
      throw new BadRequestException(`User exist in db ${JSON.stringify(error.keyValue)}`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create User in db - Check server logs`);
  }
}
