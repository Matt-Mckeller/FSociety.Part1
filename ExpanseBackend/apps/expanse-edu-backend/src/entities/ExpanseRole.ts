import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ExpansePerson } from './ExpansePerson';

@Entity()
export class ExpanseRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role: string;

  @ManyToMany(
    () => ExpansePerson,
    (expansePerson) => expansePerson.expanseRoles,
  )
  expansePerson: ExpansePerson[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
