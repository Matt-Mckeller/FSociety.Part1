import { Resolver, Query, ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
class HealthStatus {
  @Field()
  status!: string;

  @Field()
  timestamp!: string;

  @Field(() => Float)
  uptime!: number;
}

@Resolver()
export class HealthResolver {
  @Query(() => HealthStatus, { description: 'Check API health status' })
  health(): HealthStatus {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
