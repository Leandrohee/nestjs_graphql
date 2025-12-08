/* -- THIS STRATEGY IS RESPONSIBLE FOR VERIFYNG THE AUTHENTICITY OF THE TOKEN FROM THE COOKIES -- */

/**
 * In comparision to the normal jwtstategy this one stract the jwt from the cookies.
 *
 * In order to this strategy to work i had to install cookie-parser
 *
 * Insomnia storage the cookies automatcly
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

interface ValidateProps {
  sub: number;
  email: string;
}

const extractJwtFromCookies = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

@Injectable()
export class JwtCookiesStrategy extends PassportStrategy(
  Strategy,
  'jwtCookies',
) {
  constructor() {
    super({
      jwtFromRequest: extractJwtFromCookies,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  async validate(payload: ValidateProps): Promise<ValidateProps> {
    return payload;
  }
}
