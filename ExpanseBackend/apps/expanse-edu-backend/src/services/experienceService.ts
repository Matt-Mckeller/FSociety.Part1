import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Experience } from '../entities/Experience';
import { getUserLevelFromExperience } from '../config/levelConfig';
import { ExperienceEvent, ExpansePerson } from '../entities';
import { RewardableEvent } from '../entities/RewardableEvent.entity';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectDataSource('main')
    private mainDataSource: DataSource,
  ) {}

  calculateExperienceReward(rewardableEventId: string): number {
    // For now, assume a fixed reward of 5 experience points per rewardable event
    const experiencePerEvent = 5;

    // Return the total experience rewarded
    return experiencePerEvent;
  }
}
