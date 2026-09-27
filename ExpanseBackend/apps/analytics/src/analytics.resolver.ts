import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnalyticsService } from './analytics.service';
import { AnalyticsEventDto } from './dto/analytics-event.model';
import { NewAnalyticsEventInput } from './dto/new-analytics-event.input';

@Resolver()
export class AnalyticsResolver {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Query(() => [AnalyticsEventDto])
  async analyticsEvents(): Promise<AnalyticsEventDto[]> {
    return this.analyticsService.getEvents();
  }

  @Mutation(() => AnalyticsEventDto)
  async createAnalyticsEvent(
    @Args('input') input: NewAnalyticsEventInput,
  ): Promise<AnalyticsEventDto> {
    return this.analyticsService.createEvent(input);
  }
}
