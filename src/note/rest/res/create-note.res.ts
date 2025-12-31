import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateNoteResponse {
  @ApiProperty()
  cod_note: number;

  @ApiProperty()
  cod_user: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  is_deleted: boolean;

  @ApiProperty()
  deleted_at: Date | null;
}
