import { Test, TestingModule } from '@nestjs/testing';
import { RewardActionManagerService } from './reward-action-manager.service';

describe('RewardActionManagerService', () => {
  let service: RewardActionManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardActionManagerService],
    }).compile();

    service = module.get<RewardActionManagerService>(RewardActionManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
