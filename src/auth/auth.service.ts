import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './graphql/dto/signin.dto';
import { Response } from 'express';
import { SignInDto as SignInDtoRest } from './rest/dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  /**
   *
   * Method to signin via graphql
   */
  async signIn(dto: SignInDto, ctx: any) {
    try {
      //Verify if the user exists
      const user = await this.prisma.tb_user.findUnique({
        where: {
          email: dto.email,
          is_deleted: false,
        },
      });

      if (!user) {
        throw new NotFoundException('User does not exists');
      }

      //Verify the password
      const isPasswordValid = await bcrypt.compare(dto.password, user.hash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      //Creating the payload to send to jwt
      const payload = {
        sub: user.cod_user,
        email: user.email,
      };

      //Generating the jwt token
      const jwtToken = await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });

      //Sending the jwt via cookies throught graphql
      ctx.res.cookie('access_token', jwtToken, {
        httpOnly: true,
        secure: false, //Use false in http and true for https
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, //1h
        // maxAge: 1 * 30 * 1000, //30s
      });

      //Return a message in the data for graphql
      return { message: 'Jwt send successfully' };
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * Methodo to signout via graphql
   */
  async signOut(ctx: any) {
    try {
      ctx.res.cookie('access_token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(0), // Sets expiration to 1970
        maxAge: 0,
      });

      return { success: true, message: 'Signed out successfully' };
    } catch (error) {
      return { success: false, message: error.error ?? 'error to signout' };
    }
  }

  /**
   *
   * Method to signin via Rest
   */
  async signInRest(dto: SignInDtoRest, res: Response) {
    try {
      //Verify if the user exists
      const user = await this.prisma.tb_user.findUnique({
        where: {
          email: dto.email,
          is_deleted: false,
        },
      });

      if (!user) {
        throw new NotFoundException('User does not exists');
      }

      //Verify the password
      const isPasswordValid = await bcrypt.compare(dto.password, user.hash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      //Creating the payload to send to jwt
      const payload = {
        sub: user.cod_user,
        email: user.email,
      };

      //Generating the jwt token
      const jwtToken = await this.jwt.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      });

      //Sending the jwt via cookies throught graphql
      res.cookie('access_token', jwtToken, {
        httpOnly: true,
        secure: false, //Use false in http and true for https
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, //1h
        // maxAge: 1 * 30 * 1000, //30s
      });

      //Return a message in the data for graphql
      return {
        message: 'Authenticated successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
