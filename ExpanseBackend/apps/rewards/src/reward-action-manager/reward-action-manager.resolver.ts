import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DemoEventCompletionInput, DemoEventCompletionResponse } from '../dto';
import { RewardActionManagerService } from './reward-action-manager.service';

@Resolver()
export class RewardActionManagerResolver {
  constructor(private rewardActionManagerService: RewardActionManagerService) {}

  @Mutation(() => DemoEventCompletionResponse)
  async completeDemoEvent(
    @Args('input') input: DemoEventCompletionInput,
  ): Promise<DemoEventCompletionResponse> {
    try {
      await this.rewardActionManagerService.createDemoEvent(input?.eventType);
      return {
        success: true,
      };
    } catch (e) {
      // todo error and exception handling, apply generic types
      console.error('Encountered an error when trying to create demo event');
      console.error({ e });
      throw e;
    }
  }
}
