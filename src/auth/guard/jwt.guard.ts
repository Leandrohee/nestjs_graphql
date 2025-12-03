/**
 * Creating a guard to protect routes
 *
 * The name 'jwt' has to match the 'jwt' in the strategy
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  // This method check if the resolver or resolver class has @Public()
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    //If true skip the JwtGuard
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
    @UseGuards(JwtGuard)
    @Query(() => [UserEntity])
        
  2. Locally in the Resolver
    @UseGuards(JwtGuard)
    @Resolver(() => UserEntity)

  3. Globally for the whole project in app.module.ts
    @Module({
      providers: [
        AppService,
        {
          provide: APP_GUARD,
          useClass: JwtGuard,
        },
      ],
 */
