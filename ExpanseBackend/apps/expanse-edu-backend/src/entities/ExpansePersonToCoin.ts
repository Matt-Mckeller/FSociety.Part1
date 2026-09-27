import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Coin } from './Coin.entity';
import { CoinEvent } from './CoinEvent';
import { ExpansePerson } from './ExpansePerson';

@Entity('expansePersonToCoin')
export class ExpansePersonToCoin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => ExpansePerson, (person) => person.expansePersonToCoins)
  expansePerson: ExpansePerson;

  @ManyToOne(() => Coin, (coin) => coin.expansePersonToCoins)
  coin: Coin;

  @OneToMany(() => CoinEvent, (coinEvent) => coinEvent.expansePersonToCoin)
  events: CoinEvent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
