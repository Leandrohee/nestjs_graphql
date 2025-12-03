import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthEntity } from './entity/auth.entity';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Resolver(() => AuthEntity)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthEntity)
  async signIn(@Args('loginInput') dto: SignInDto): Promise<AuthEntity> {
    return await this.authService.signIn(dto);
  }
}

/**
-------------------------------- Examples of queries and mutations -------------------------------
mutation SignIn{
  signIn(
    loginInput: {
      email: "leandrohenrique_@live.com",
      password: "jacare1234@"
    }
  ){
    access_token
  }
}


*/
