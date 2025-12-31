import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteNoteDto {
  @ApiProperty({ title: 'cod_note to delete', example: 11 })
  @IsNotEmpty({ message: 'cod_note cannot be empty' })
  @IsNumber({ allowNaN: false })
  cod_note: number;
}
