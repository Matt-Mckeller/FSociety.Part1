import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { RewardableEvent } from './RewardableEvent.entity';
import { Experience } from './Experience';

@Entity()
export class ExperienceEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  experienceChange: number;

  @ManyToOne(() => Experience, (experience) => experience.experienceEvents)
  experience: Experience;

  @ManyToOne(
    () => RewardableEvent,
    (rewardableEvent) => rewardableEvent.experienceEvents,
  )
  rewardableEvent: RewardableEvent;
}
