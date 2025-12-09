import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UserModel } from './graphql/model/user.model';
import { CreateUserDto } from './graphql/dto/create-user.dto';
import { UserService } from './user.service';
import { GetUserDto } from './graphql/dto/get-user.dto';
import { EditUserDto } from './graphql/dto/edit-user.dto';
import { UserDeleteResponse } from './graphql/model/user_delete_response';
import { Public } from 'src/auth/decorator/public.decorator';

//@Public()
@Resolver(() => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Mutation(() => UserModel)
  async createUser(
    @Args('createUserInput') dto: CreateUserDto,
  ): Promise<UserModel> {
    return await this.userService.createUser(dto);
  }

  @Query(() => [UserModel])
  async findAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAllUsers();
  }

  @Query(() => UserModel, { nullable: true })
  async findUser(@Args('getUserInput') dto: GetUserDto): Promise<UserModel> {
    return this.userService.findUser(dto);
  }

  @Mutation(() => UserModel)
  async editUser(@Args('editUserInptut') dto: EditUserDto): Promise<UserModel> {
    return await this.userService.editUser(dto);
  }

  @Mutation(() => UserDeleteResponse)
  async deleteUser(
    @Args('deleteUserInput') dto: GetUserDto,
  ): Promise<UserDeleteResponse> {
    return this.userService.deleteUser(dto);
  }
}

/**
-------------------------------- Examples of queries and mutations -------------------------------
mutation CreateUser {
  createUser(
    createUserInput: {
      email: "leandrohenrique_@live.com"
      password: "jacare1234@"
      firstName: "leandro"
      lastName: "torres"
    }
  ) {
    cod_user
    email
    firstName
    lastName
    created_at
  }
}


query findAllUsers{
  	findAllUsers{
    cod_user
    created_at
    deleted_at
    email
    firstName
    is_deleted
    lastName
    updated_at
    }
}


query findUser{
  	findUser(
			getUserInput: {
				email: "leandrohenrique_@live.com"
			}
		){
    cod_user
    created_at
    deleted_at
    email
    firstName
    is_deleted
    lastName
    updated_at
    }
}

mutation editUser{
  	editUser(
			editUserInptut: {
				email: "leandrohenrique_@live.com",
				newFirstName: "Leandro Henrique",
				newLastName: "Torres"
			}
		){
    cod_user
    created_at
    deleted_at
    email
    firstName
    is_deleted
    lastName
    updated_at
    }
}


mutation deleteUser{
  	deleteUser(
			deleteUserInput: {
				email: "leandrohenrique_@live.com"
			}
		){
    message
		email
    }
}
 */
