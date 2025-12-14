import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './rest/dto/create-note.dto';
import { Request } from 'express';
import { ValidateProps } from 'src/auth/guard/jwt-cookies.strategy';
import brazilTimeNow from 'src/utils/brazil-time';
import { UpdateNoteDto } from './rest/dto/update-note.dto';

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
          updated_at: brazilTimeNow(),
        },
      });

      return noteCreated;
    } catch (error) {
      return error;
    }
  }

  async getNotes(req: Request) {
    const user = req.user as ValidateProps;
    const cod_user = user.sub;
    try {
      const notes = await this.prisma.tb_note.findMany({
        where: {
          cod_user: cod_user,
        },
      });

      const notesFormat = notes.map((item) => {
        return {
          title: item.title,
          content: item.content,
          create_at: item.created_at,
          cod_note: item.cod_note,
          cod_user: item.cod_user,
        };
      });

      return notesFormat;
    } catch (error) {
      throw error;
    }
  }

  async updateNote(dto: UpdateNoteDto, req: Request) {
    try {
      const user = req.user as ValidateProps;

      const note = await this.prisma.tb_note.update({
        where: {
          cod_user: user.sub,
          cod_note: dto.cod_note,
          is_deleted: false,
        },
        data: {
          title: dto.title,
          content: dto.content,
          updated_at: brazilTimeNow(),
        },
      });
      return note;
    } catch (error) {
      return error;
    }
  }
}
