import { ApiProperty } from '@nestjs/swagger';

export class GetNoteResponse {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  create_at: Date;

  @ApiProperty()
  cod_note: number;

  @ApiProperty()
  cod_user: number;
}
