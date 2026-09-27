import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { ExpansePersonToCoin } from './ExpansePersonToCoin';
import { RewardToOwner } from './RewardToOwner';

@Entity('coinEvent')
export class CoinEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventType: string;

  @Column()
  changeAmount: number;

  @Column()
  newValue: number;

  @ManyToMany(() => RewardToOwner, { nullable: true })
  rewardToOwner: RewardToOwner[];

  @ManyToOne(() => ExpansePersonToCoin, (personToCoin) => personToCoin.events)
  expansePersonToCoin: ExpansePersonToCoin;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
