import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'User email', example: 'teste@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: '123' })
  @IsString()
  @MinLength(3, { message: 'Password has to be at least 3 characters' })
  password: string;
}
