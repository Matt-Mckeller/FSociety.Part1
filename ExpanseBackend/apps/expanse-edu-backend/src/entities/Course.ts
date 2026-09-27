import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { School } from './School';
import { Class } from './Class';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  edLinkID: string;

  @Column()
  name: string;

  @ManyToOne(() => School, (school) => school.courses)
  school: School;

  @OneToMany(() => Class, (cls) => cls.course)
  classes: Class[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
