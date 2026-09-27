import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { RewardInterface, REWARD_POINT_OPTIONS } from '@app/shared/types';
import { Class } from './Class';
import { JoinTable, ManyToMany } from 'typeorm';
import { ExpansePerson } from './ExpansePerson';
import { Coin } from './Coin.entity';
import { RewardToOwner } from './RewardToOwner';

@Entity()
export class Reward implements RewardInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => RewardToOwner, (rewardToOwner) => rewardToOwner.reward)
  owners: RewardToOwner[];

  @ManyToOne(() => ExpansePerson, (person) => person.createdRewards)
  creator: ExpansePerson;

  @ManyToOne(() => Coin, (coin) => coin.rewards)
  coin: Coin;

  @ManyToOne(() => Class, (cls) => cls.storeRewards)
  public classStore: Class;

  // If a reward has duplicate versions of itself, say for different classes
  // then the sharedIdentity will be an array of those rewards
  // so that we can update or remove all of them at once
  @ManyToMany(() => Reward)
  @JoinTable()
  sharedIdentity: Reward[];

  @Column({ type: 'bigint', nullable: true })
  availableQuantity?: number;

  @Column({ type: 'varchar' })
  category: string;

  @Column({ type: 'varchar' })
  variant: string | { type: string; value: string };

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { nullable: true })
  name?: string;

  @Column({ type: 'bigint', nullable: true })
  cost?: number;

  @Column('boolean', { nullable: false, default: false })
  limitMaxPurchase: boolean;

  @Column('bigint', { nullable: true })
  maxPurchaseQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
