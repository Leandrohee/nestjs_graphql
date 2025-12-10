import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import type { Request } from 'express';
import { Public } from 'src/auth/decorator/public.decorator';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  // http:localhost:3000/note/create
  @Post('create')
  async createNote(@Body() dto: CreateNoteDto, @Req() req: Request) {
    return await this.noteService.createNote(dto, req);
  }

  // http:localhost:3000/note/get
  @Get('get')
  async getNotes(@Req() req: Request) {
    return await this.noteService.getNotes(req);
  }

  // http:localhost:3000/note/put
  @Put('udpate')
  async updateNote(@Body() dto: UpdateNoteDto, @Req() req: Request) {
    return await this.noteService.updateNote(dto, req);
  }
}

/**
 
  {
    "title": "titulo teste",
    "content": "conteudo teste"
  }

 */
