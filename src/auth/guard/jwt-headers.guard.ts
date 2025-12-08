/**
 * The JwtCookiesGuard is exacly like the JwtHeadersGuard
 * the difference is in the Strategy used between the 2
 * Argument 'jwtHeaders' has to be the same as his strategy
 *
 *
 * Methods:
 *    canActivate -> verify the @Public()
 *    getRequest  -> allow graphql
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class JwtHeadersGuard extends AuthGuard('jwtHeaders') {
  constructor(private reflector: Reflector) {
    super();
  }
  // This method check if the resolver or resolver class has @Public()
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //If true skip the JwtHeadersGuard
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
    @UseGuards(JwtHeadersGuard)
    @Query(() => [UserEntity])
        
  2. Locally in the Resolver
    @UseGuards(JwtHeadersGuard)
    @Resolver(() => UserEntity)

  3. Globally for the whole project in app.module.ts
    @Module({
      providers: [
        AppService,
        {
          provide: APP_GUARD,
          useClass: JwtHeadersGuard,
        },
      ],
 */
