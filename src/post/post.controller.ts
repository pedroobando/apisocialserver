import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, PaginationPostDto, UpdatePostDto } from './dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll(@Query() paginationPostDto: PaginationPostDto) {
    return this.postService.findAll(paginationPostDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.postService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(term, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
