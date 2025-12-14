import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './rest/dto/create-note.dto';
import type { Request } from 'express';
import { Public } from 'src/auth/decorator/public.decorator';
import { UpdateNoteDto } from './rest/dto/update-note.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetNoteResponse } from './rest/res/get-note.res';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({ summary: 'Used to create new notes' })
  @Post()
  async createNote(@Body() dto: CreateNoteDto, @Req() req: Request) {
    return await this.noteService.createNote(dto, req);
  }

  @ApiOperation({ summary: 'Used to get all notes' })
  @ApiResponse({
    status: 201,
    description: 'Notes requested',
    type: GetNoteResponse,
  })
  @Get()
  async getNotes(@Req() req: Request): Promise<GetNoteResponse[]> {
    return await this.noteService.getNotes(req);
  }

  @ApiOperation({ summary: 'Used to edit a note' })
  @Put()
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
