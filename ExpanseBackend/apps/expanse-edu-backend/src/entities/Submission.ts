import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RewardableEvent } from './RewardableEvent.entity';
import { Assignment } from './Assignment';
import { ExpansePerson } from './ExpansePerson';
import { SubmissionState } from '@edlink/typescript';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  edLinkID: string;

  @Column('varchar')
  state: SubmissionState;

  @Column('datetime', { nullable: true })
  createdDate: Date; //When the object was created in the source.

  @Column('datetime', { nullable: true })
  updatedDate: Date; //When the object was last updated in the source.

  @Column({ nullable: true })
  gradeComment: string; //	An optional comment left by the grader.

  @Column({ nullable: true })
  gradePoints: number; // The numerical representation of the grade, if applicable. (i.e. 96)

  @Column({ nullable: true })
  grade: string; //	The string representation of the grade, if applicable. (i.e. A+)

  @Column({ nullable: true })
  extraAttempts: number; // The number of extra attempts the assignee is allowed beyond the Assignment's max_attempts.

  // @Column()
  // override_due_date: Date; // The due_date for this particular assignee, overriding that of the Assignment.

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions)
  assignment: Assignment;

  @ManyToOne(() => ExpansePerson, (person) => person.submissions)
  student: ExpansePerson;

  @OneToOne(
    () => RewardableEvent,
    (rewardableEvent) => rewardableEvent.submission,
  )
  rewardableEvent: RewardableEvent;
}
