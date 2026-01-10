import { Injectable } from '@nestjs/common';
import { ValidateProps } from 'src/auth/guard/jwt-cookies.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import brazilTimeNow from 'src/utils/brazil-time';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

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
}
