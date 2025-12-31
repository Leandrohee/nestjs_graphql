import { ApiProperty } from '@nestjs/swagger';

export class DeleteNoteResponse {
  @ApiProperty()
  cod_note: number;

  @ApiProperty()
  cod_user: number;

  @ApiProperty()
  deleted_at: Date | null;
}
