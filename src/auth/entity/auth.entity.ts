import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthEntity {
  @Field()
  access_token: string;
}
