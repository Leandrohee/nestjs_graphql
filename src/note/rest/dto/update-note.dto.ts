import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({ description: 'Title of the new note', example: '15/11/1994' })
  @IsString({ message: 'Has to be a string' })
  title: string;

  @ApiProperty({
    description: 'Content of the new note',
    example: 'This is a content example',
  })
  @IsString({ message: 'Has to be a string' })
  content: string;

  @ApiProperty({
    description: 'cod_note of the new note',
    example: 100,
  })
  @IsNumber()
  cod_note: number;
}
