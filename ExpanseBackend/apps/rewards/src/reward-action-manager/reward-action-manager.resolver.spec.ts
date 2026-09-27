import { Test, TestingModule } from '@nestjs/testing';
import { RewardActionManagerResolver } from './reward-action-manager.resolver';

describe('RewardActionManagerResolver', () => {
  let resolver: RewardActionManagerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardActionManagerResolver],
    }).compile();

    resolver = module.get<RewardActionManagerResolver>(RewardActionManagerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
