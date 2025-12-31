/**
 * This resolver is to handle authentication via graphql
 */

import { Args, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { AuthModel } from './graphql/model/auth.model';
import { SignInDto } from './graphql/dto/signin.dto';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Query(() => AuthModel)
  async signIn(
    @Args('loginInput') dto: SignInDto,
    @Context() ctx: any,
  ): Promise<AuthModel> {
    return await this.authService.signIn(dto, ctx);
  }
}

/**
-------------------------------- Examples of queries and mutations -------------------------------
query SignIn{
  signIn(
    loginInput: {
      email: "leandrohenrique_@live.com",
      password: "jacare1234@"
    }
  ){
    message
  }
}


*/
