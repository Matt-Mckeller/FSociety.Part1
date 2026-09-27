import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ExpansePerson } from './ExpansePerson';
import { ExperienceEvent } from './ExperienceEvent';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 1 })
  level: number;

  @Column('int')
  totalExperience: number;

  @OneToOne(() => ExpansePerson)
  @JoinColumn({ name: 'person_id' })
  expansePerson: ExpansePerson;

  @OneToMany(
    () => ExperienceEvent,
    (experienceEvents) => experienceEvents.experience,
  )
  experienceEvents: ExperienceEvent[];
}
