import { Injectable } from '@nestjs/common';
import { ValidateProps } from 'src/auth/guard/jwt-cookies.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: { content: string }, user: ValidateProps) {}
}
