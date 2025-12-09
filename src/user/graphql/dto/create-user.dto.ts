import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'First Name cannot be empty' })
  firstName: string;

  @Field()
  @IsString()
  lastName?: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
