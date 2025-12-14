import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, maxLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ description: 'Title of the note', example: '15/11/1994' })
  @IsNotEmpty()
  @IsString({ message: 'Title has to be a string' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  @ApiProperty({
    description: 'Content of the note',
    example: 'This is a note example',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500, { message: 'Content cannot exceed 500 characters' })
  content: string;
}
