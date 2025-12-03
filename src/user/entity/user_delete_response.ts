import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserDeleteResponse {
  @Field()
  email: string;

  @Field()
  message: string;
}
