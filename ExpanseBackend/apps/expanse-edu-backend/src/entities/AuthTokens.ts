import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ExpansePerson } from './ExpansePerson';

/*
Note: Wondering if this will support scaling
May need to separate tokens?
At least the required fields etc
Sometimes users may not have edlink tokens i.e. parents or admins etc
*/
@Entity()
export class AuthTokens {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: false })
  expanseAccessToken: string;

  @Column('varchar', { length: 255, nullable: false })
  edLinkAccessToken: string;

  @Column('varchar', { length: 255, nullable: false })
  edLinkRefreshToken: string;

  @Column({ nullable: false })
  expansePersonId: number;

  @OneToOne(() => ExpansePerson)
  @JoinColumn()
  expansePerson: ExpansePerson;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
