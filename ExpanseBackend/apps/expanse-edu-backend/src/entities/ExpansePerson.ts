import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { AuthTokens } from './AuthTokens';
import { Enrollment } from './Enrollment';
import { ExpansePersonToCoin } from './ExpansePersonToCoin';
import { Reward } from './Reward.entity';
import { RewardToOwner } from './RewardToOwner';
import { RewardableEvent } from './RewardableEvent.entity';
import { Submission } from './Submission';
import { ExpanseRole } from './ExpanseRole';

@Entity()
export class ExpansePerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  edLinkID: string;

  @Column('varchar', { nullable: true })
  expanseDisplayName: string;

  @OneToOne(() => AuthTokens, (authTokens) => authTokens.expansePerson)
  @JoinColumn()
  authTokens: AuthTokens;

  @ManyToMany(() => ExpanseRole, (expanseRole) => expanseRole.expansePerson)
  @JoinTable({ name: 'expansePersonToRoles' })
  expanseRoles: ExpanseRole[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.expansePerson)
  enrollments: Enrollment[];

  @OneToMany(
    () => ExpansePersonToCoin,
    (expansePersonToCoin) => expansePersonToCoin.expansePerson,
  )
  expansePersonToCoins: ExpansePersonToCoin[];

  @OneToMany(() => Reward, (reward) => reward.creator)
  createdRewards: Reward[];

  @OneToMany(() => RewardToOwner, (rewardToOwner) => rewardToOwner.owner)
  ownedRewards: RewardToOwner[];

  @OneToMany(
    () => RewardableEvent,
    (rewardableEvent) => rewardableEvent.student,
  )
  rewardableEvents: RewardableEvent[];

  @ManyToMany(
    () => RewardableEvent,
    (rewardableEvent) => rewardableEvent.teachers,
  )
  rewardableTeacherEvents: RewardableEvent[];

  @OneToMany(
    () => RewardableEvent,
    (rewardableEvent) => rewardableEvent.student,
  )
  rewardableStudentEvents: RewardableEvent[];

  @OneToMany(() => Submission, (submission) => submission.student)
  submissions: Submission[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
