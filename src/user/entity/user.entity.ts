import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => Int)
  cod_user: number;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field()
  is_deleted: Boolean;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date;
}
