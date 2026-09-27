import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { ExpansePerson } from './ExpansePerson';
import { Class } from './Class';

// Sometimes there are multiple enrollments per class even for the same role.
// From what I've seen they have multiple canvas_ids or something like that. May need to learn what
// what this means though.
@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  edLinkID: string;

  @ManyToOne((type) => Class)
  class: Class;

  @ManyToOne((type) => ExpansePerson)
  expansePerson: ExpansePerson;

  @Column()
  role: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
