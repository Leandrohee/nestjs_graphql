import { IsNotEmpty, IsString, MaxLength, maxLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString({ message: 'Title has to be a string' })
  @MaxLength(100, { message: 'Title cannot exceed 100 characters' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500, { message: 'Content cannot exceed 500 characters' })
  content: string;
}
