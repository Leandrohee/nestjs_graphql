import { ApiProperty } from '@nestjs/swagger';

export class SignInRes {
  @ApiProperty()
  message: string;
}
