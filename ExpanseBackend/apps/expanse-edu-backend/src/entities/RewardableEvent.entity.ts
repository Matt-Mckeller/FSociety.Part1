import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { ExpansePerson } from './ExpansePerson';
import { Assignment } from './Assignment';
import { Submission } from './Submission';
import { School } from './School';
import { Class } from './Class';
import { ExperienceEvent } from './ExperienceEvent';

//review relationships and design patterns later after getting mvp functional and working
// could create a separate object/event for the actual reward result? also probably want timestamps
// but this would add alot of duplicate data
// do we need history data?
// Reward event vs rewardable event, naming options and re these two separate entities? or one in the same
// reward event sounds better but is it technically a reward event if its not yet a valid event and we are waiting?
@Entity('rewardableEvent')
export class RewardableEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => RewardableEventType, { eager: true })
  // type: RewardableEventType; // Reference to the event type

  @ManyToOne(() => Assignment, (assignment) => assignment.rewardableEvents)
  assignment: Assignment;

  @OneToOne(() => Submission, (submission) => submission.rewardableEvent)
  @JoinColumn()
  submission: Submission;

  @Column()
  eventType: string; // 'assignment'

  // @Column({
  //   type: 'enum',
  //   enum: ['UNCLAIMED', 'PROCESSING', 'CLAIMED'],
  //   default: 'UNCLAIMED',
  // })
  @Column()
  status:
    | 'NOT_READY' // This reward is not yet ready to be claimed, i.e. the assignment may not be submitted yet
    | 'PROCESSING' // This reward is currently being processed
    | 'CLAIMABLE' // This reward is ready to be claimed
    | 'CLAIMED' // This reward has been claimed
    | 'PROCESSING_REWARD' // This reward has been claimed
    | 'REWARDED' // This reward has been claimed
    | 'REOPENED' // ? do I want to handle resubmissions by having a status type and process or multiple rewardable events?
    | string;

  @ManyToOne(() => ExpansePerson, (person) => person.rewardableStudentEvents)
  student: ExpansePerson;

  @ManyToMany(() => ExpansePerson, (person) => person.rewardableTeacherEvents)
  @JoinTable()
  teachers: ExpansePerson[];

  @ManyToOne(() => School, (school) => school.rewardableEvents)
  school: School;

  @ManyToOne(() => Class, (cls) => cls.rewardableEvents)
  class: Class;

  @OneToMany(
    () => ExperienceEvent,
    (experienceEvent) => experienceEvent.rewardableEvent,
  )
  experienceEvents: ExperienceEvent[];

  // is this too many relationships? idk, probably better than querying through multiple tables, I think,
  // but will also need to do rewards for each in order
  // to do calculations on exp/rewards
  // first step is to get something visible though but this is good

  // where is this going to go? how am I going to do this?
  // is this related to the joins ? is there a school experience, class experience, student experience, teacher experience?
  // @OneToMany
  // experience: string;

  // @Column('varchar')
  // rewardableEventHistory: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  processedAt?: Date; // Optional field

  // @Column({ type: 'text', nullable: true })
  // errorMessage?: string; // Optional field
}
