import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class UserDto {
  @Field()
  id: string;

  @Field()
  active: boolean;

  @Field()
  fullName: string;

  constructor(user: User) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.active = user.active;
  }
}
