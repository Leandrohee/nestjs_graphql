import { Controller, Get, Req } from '@nestjs/common';
import { PostService } from './post.service';
import type { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetPostResponse } from './rest/res/get-post.res';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @ApiOperation({ summary: 'Get all the posts realated to one user' })
  @ApiResponse({
    status: 200,
    description: 'Returned all users',
    type: [GetPostResponse],
  })
  @Get()
  async getPosts(@Req() req: Request): Promise<GetPostResponse[]> {
    return await this.postService.getPosts(req);
  }
}
