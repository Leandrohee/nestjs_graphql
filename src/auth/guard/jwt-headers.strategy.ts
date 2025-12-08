import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

interface ValidateProps {
  sub: string;
  email: string;
  iat: string;
  exp: string;
}

@Injectable()
export class JwtHeadersStrategy extends PassportStrategy(
  Strategy,
  'jwtHeaders',
) {
  //"jwtHeaders" is the name that goes in the guard
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // this will trigger error if expired
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  //This payload come from the jwt extracted from headers
  async validate(payload: ValidateProps) {
    return {
      sub: payload.sub,
      email: payload.email,
      iat: new Date(Number(payload.iat) * 1000).toLocaleTimeString(), //transforming the Unix timestamp to a time in my local time
      exp: new Date(Number(payload.exp) * 1000).toLocaleTimeString(), //transforming the Unix timestamp to a time in my local time
    };
  }
}

/**
 * The validate method inject date related to the user to the request
 *
 * The retrieve this date, use the method get from express like this:
 *
 * Right way to send the token through the header:
 *      Authorization: Bearer <token>
 */
