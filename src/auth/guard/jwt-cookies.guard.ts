/**
 * The JwtCookiesGuard is exacly like the JwtHeadersGuard
 * the difference is in the Strategy used between the 2
 * jwtCookies has to be the same as his strategy
 *
 * Methods:
 *    canActivate -> verify the @Public()
 *    getRequest  -> allow graphql
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtCookiesGuard extends AuthGuard('jwtCookies') {
  constructor(private refrector: Reflector) {
    super();
  }

  //This methdod check if the resolver or resolver methodo has @Public()
  canActivate(context: ExecutionContext) {
    const isPublic = this.refrector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //If true skip the JwtCookiesGuard
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  // This method getRequest bellow is import for GraphQl (no need for REST)
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

/**
 * 
 * The guards can be use in 3 ways
  
  1. Locally in Query/Mutation:
    @UseGuards(JwtCookiesGuard)
    @Query(() => [UserEntity])
        
  2. Locally in the Resolver
    @UseGuards(JwtCookiesGuard)
    @Resolver(() => UserEntity)

  3. Globally for the whole project in app.module.ts
    @Module({
      providers: [
        AppService,
        {
          provide: APP_GUARD,
          useClass: JwtCookiesGuard,
        },
      ],
 */
