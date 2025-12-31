import { Body, Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './rest/dto/create-note.dto';
import type { Request } from 'express';
import { Public } from 'src/auth/decorator/public.decorator';
import { UpdateNoteDto } from './rest/dto/update-note.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetNoteResponse } from './rest/res/get-note.res';
import { DeleteNoteDto } from './rest/dto/delete-note.dto';
import { DeleteNoteResponse } from './rest/res/delete-note.res';
import { UpdateNoteResponse } from './rest/res/update-note.res';
import { CreateNoteResponse } from './rest/res/create-note.res';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @ApiOperation({ summary: 'Used to create new notes' })
  @ApiResponse({
    status: 201,
    description: 'Create a new note',
    type: CreateNoteResponse,
  })
  @Post()
  async createNote(
    @Body() dto: CreateNoteDto,
    @Req() req: Request,
  ): Promise<CreateNoteResponse> {
    return await this.noteService.createNote(dto, req);
  }

  @ApiOperation({ summary: 'Used to delete a note' })
  @ApiResponse({
    status: 200,
    description: 'Note for delete',
    type: DeleteNoteResponse,
  })
  @Delete()
  async deleteNote(
    @Body() dto: DeleteNoteDto,
    @Req() req: Request,
  ): Promise<DeleteNoteResponse> {
    return await this.noteService.deleteNote(dto, req);
  }

  @ApiOperation({ summary: 'Used to get all notes' })
  @ApiResponse({
    status: 201,
    description: 'Notes requested',
    type: GetNoteResponse,
    isArray: true,
  })
  @Get()
  async getNotes(@Req() req: Request): Promise<GetNoteResponse[]> {
    return await this.noteService.getNotes(req);
  }

  @ApiOperation({ summary: 'Used to edit a note' })
  @ApiResponse({
    status: 200,
    description: 'Note updated',
    type: UpdateNoteResponse,
  })
  @Put()
  async updateNote(
    @Body() dto: UpdateNoteDto,
    @Req() req: Request,
  ): Promise<UpdateNoteResponse> {
    return await this.noteService.updateNote(dto, req);
  }
}

/**
 
  {
    "title": "titulo teste",
    "content": "conteudo teste"
  }

 */
