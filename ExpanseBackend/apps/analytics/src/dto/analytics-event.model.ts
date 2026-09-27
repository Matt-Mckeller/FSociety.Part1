import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AnalyticsEventDto {
  @Field()
  name: string;

  constructor() {}
}
