import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import type { Response } from 'express';
import { SignInDto } from './rest/dto/signin.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response, //passthrough necessary
  ) {
    return await this.authService.signInRest(dto, res);
  }
}

/**
 
  {
    "email": "leandrohenrique_@live.com",
    "password": "jacare1234@"
  }

 */
