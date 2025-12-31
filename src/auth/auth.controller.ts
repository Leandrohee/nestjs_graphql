/**
 *  This controller is to handle authentication via rest
 */

import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import type { Response } from 'express';
import { SignInDto } from './rest/dto/signin.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInRes } from './rest/res/signin.res';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate the user via rest' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated',
    type: SignInRes,
  })
  @Post('signin')
  async signIn(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response, //passthrough necessary
  ): Promise<SignInRes> {
    return await this.authService.signInRest(dto, res);
  }
}

/**
 
  {
    "email": "leandrohenrique_@live.com",
    "password": "jacare1234@"
  }

 */
