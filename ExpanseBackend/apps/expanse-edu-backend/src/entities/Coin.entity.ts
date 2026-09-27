import { User } from '@edlink/typescript/dist/user';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Class } from './Class';
import { Course } from './Course';
import { School } from './School';
import { ExpansePersonToCoin } from './ExpansePersonToCoin';
import { Reward } from './Reward.entity';

@Entity()
export class Coin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Based on the class/course name, school name, or custom setting
  @Column()
  name: string;

  // For classes:
  // coinIconText will be the first character of the first two words of the class name if there are two words
  // if there are not two words it will be the first two characters of the class name
  // if the two characters already exist for other classes, this is ignored for now and display will utilize the coin name for hover and when displaying wallet
  // can come back and update the logic here I suppose
  // xcoins and family coins dont have an icon text value
  @Column({ nullable: true })
  coinIconText: string;

  @ManyToOne(() => School, (school) => school.coins)
  school?: School;

  @OneToOne(() => Class)
  @JoinColumn()
  class?: Class;

  // I would set this up so that a coin is based on course if I knew that all systems were set up so that
  // a class is always associated with a course and the data was correct, but... idk if this is the case
  @ManyToOne(() => Course, (course) => course)
  course?: Course;

  @OneToMany(
    () => ExpansePersonToCoin,
    (expansePersonToCoin) => expansePersonToCoin.coin,
  )
  expansePersonToCoins?: ExpansePersonToCoin[];

  @OneToMany(() => Reward, (reward) => reward.coin)
  rewards?: Reward[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
