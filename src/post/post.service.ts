import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { ValidateProps } from 'src/auth/guard/jwt-cookies.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import brazilTimeNow from 'src/utils/brazil-time';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPosts(req: Request) {
    try {
      const user = req?.user as ValidateProps;

      if (!user) {
        throw new NotFoundException('Sub not found - getPosts');
      }

      const allPosts = await this.prisma.tb_post.findMany({
        where: {
          cod_user: user.sub,
          is_deleted: false,
        },
      });

      const allPostsFilter = allPosts.map(
        ({ is_deleted, deleted_at, ...rest }) => rest,
      );

      return allPostsFilter;
    } catch (error) {
      throw error;
    }
  }

  async createPost(data: { content: string }, user: ValidateProps) {
    try {
      const newPost = await this.prisma.tb_post.create({
        data: {
          content: data.content,
          updated_at: brazilTimeNow(),
          cod_user: user.sub,
        },
      });

      return {
        cod_post: newPost.cod_post,
        cod_user: newPost.cod_user,
        content: newPost.content,
        created_at: newPost.created_at,
      };
    } catch (error) {
      throw error;
    }
  }

  async deletePost(data: { cod_post: number }, user: ValidateProps) {
    try {
      const cod_user = user?.sub;

      await this.prisma.tb_post.delete({
        where: {
          cod_post: data.cod_post,
          cod_user: cod_user,
        },
      });

      return {
        cod_post_deleted: data.cod_post,
        message: `post ${data.cod_post} deleted`,
      };
    } catch (error) {
      throw error;
    }
  }
}
