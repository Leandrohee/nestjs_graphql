import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtHeadersStrategy } from './guard/jwt-headers.strategy';
import { JwtCookiesStrategy } from './guard/jwt-cookies.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthResolver,
    JwtHeadersStrategy,
    JwtCookiesStrategy,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
