import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coin } from './Coin.entity';
import { ExpansePerson } from './ExpansePerson';
import { Reward } from './Reward.entity';
import { CoinEvent } from './CoinEvent';

@Entity('rewardToOwner')
export class RewardToOwner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Individual entry for each, due to soft deletes, redemptions, etc
  // This may be a revisited area, imagining 100 or 1000s of reward entries and associations, idk
  // hard to determine compute types and vs storage types and efficiencies at this moment
  // focusing on just getting it implemented first
  // @Column()
  // quantity: number;

  @ManyToOne(() => ExpansePerson, (person) => person.ownedRewards)
  owner: ExpansePerson;

  @ManyToOne(() => Reward, (reward) => reward.owners)
  reward: Reward;

  @ManyToOne(() => Coin, (coin) => coin.expansePersonToCoins)
  coin: Coin;

  @ManyToMany(() => CoinEvent, (coinEvent) => coinEvent.rewardToOwner)
  @JoinTable()
  coinEvents: CoinEvent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
