import { ApiProperty } from '@nestjs/swagger';

export class GetPostResponse {
  @ApiProperty()
  cod_post: number;

  @ApiProperty()
  cod_user: number;

  @ApiProperty()
  content: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
