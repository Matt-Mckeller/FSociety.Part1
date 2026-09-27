import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Reward } from './Reward.entity';
import { School } from './School';
import { Course } from './Course';
import { Coin } from './Coin.entity';
import { Enrollment } from './Enrollment';
import { RewardableEvent } from './RewardableEvent.entity';
import { Assignment } from './Assignment';

@Entity()
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  edLinkID: string;

  @Column()
  name: string;

  @OneToMany(() => Reward, (reward) => reward.classStore)
  public storeRewards: Reward[];

  @ManyToOne(() => School, (school) => school.classes)
  school: School;

  @OneToMany(() => RewardableEvent, (rewardableEvent) => rewardableEvent.class)
  rewardableEvents: RewardableEvent;

  @OneToMany(() => Assignment, (assignment) => assignment.class)
  assignments: Assignment[];

  @ManyToOne(() => Course, (course) => course)
  course: Course;

  @OneToOne(() => Coin, (coin) => coin.class)
  coin: Coin;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.class)
  enrollments: Enrollment;

  @Column({ type: 'timestamp', nullable: true })
  lastSuccessfulRewardSync: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
