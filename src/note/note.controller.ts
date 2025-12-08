import { Body, Controller, Post, Req } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import type { Request } from 'express';
import { Public } from 'src/auth/decorator/public.decorator';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  // http:localhost:3000/note/create
  //@Public()
  @Post('create')
  async createNote(@Body() dto: CreateNoteDto, @Req() req: Request) {
    return this.noteService.createNote(dto, req);
  }
}

/**
  {
    "title": "titulo teste",
    "content": "conteudo teste"
  }
 */
