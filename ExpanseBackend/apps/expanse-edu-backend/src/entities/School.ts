import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { District } from './District';
import { Course } from './Course';
import { Class } from './Class';
import { Coin } from './Coin.entity';
import { RewardableEvent } from './RewardableEvent.entity';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  edLinkID: string;

  @Column()
  name: string;

  @ManyToOne(() => District, (district) => district.schools)
  district: District;

  @OneToMany(() => Course, (course) => course.school)
  courses: Course[];

  @OneToMany(() => RewardableEvent, (rewardableEvent) => rewardableEvent.school)
  rewardableEvents: RewardableEvent[];

  @OneToMany(() => Class, (cls) => cls.school)
  classes: Class[];

  @OneToMany(() => Coin, (coin) => coin.school)
  coins: Coin[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
