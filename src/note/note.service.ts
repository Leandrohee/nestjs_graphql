import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Request } from 'express';
import { ValidateProps } from 'src/auth/guard/jwt-cookies.strategy';

@Injectable()
export class NoteService {
  constructor(private readonly prisma: PrismaService) {}

  async createNote(dto: CreateNoteDto, req: Request) {
    try {
      const user = req.user as ValidateProps;

      if (!user.sub) {
        throw new NotFoundException('Sub not found - createNote');
      }

      const noteCreated = await this.prisma.tb_note.create({
        data: {
          cod_user: user.sub,
          title: dto.title,
          content: dto.content,
        },
      });

      return noteCreated;
    } catch (error) {
      return error;
    }
  }
}
