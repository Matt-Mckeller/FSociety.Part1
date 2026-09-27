import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { RewardableEvent } from './RewardableEvent.entity';
import { Class } from './Class';
import { Submission } from './Submission';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  edLinkID: string;

  @ManyToOne(() => Class, (cls) => cls.assignments)
  class: Class;

  @OneToMany(() => Submission, (submission) => submission.assignment)
  submissions: Submission[];

  @OneToMany(
    () => RewardableEvent,
    (rewardableEvent) => rewardableEvent.assignment,
  )
  rewardableEvents: RewardableEvent[];
}
