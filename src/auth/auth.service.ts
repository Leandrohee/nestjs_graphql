import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signIn(dto: SignInDto) {
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
      return { access_token: jwtToken };
    } catch (error) {
      return error;
    }
  }
}
