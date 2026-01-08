import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthModel {
  @Field()
  message: string;
}

@ObjectType()
export class AuthSignOutModel {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
