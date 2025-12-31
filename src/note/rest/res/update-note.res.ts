import { ApiProperty } from '@nestjs/swagger';

export class UpdateNoteResponse {
  @ApiProperty()
  message: string;
}
