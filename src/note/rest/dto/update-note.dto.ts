import { IsNumber, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString({ message: 'Has to be a string' })
  title: string;

  @IsString({ message: 'Has to be a string' })
  content: string;

  @IsNumber()
  cod_note: number;
}
