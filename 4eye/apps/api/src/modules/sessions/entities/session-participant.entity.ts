import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ParticipantRole } from '../../../common/enums';
import { Session } from './session.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity('session_participants')
@Unique(['sessionId', 'userId'])
export class SessionParticipant extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  sessionId!: string;

  @ManyToOne(() => Session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  session!: Session;

  @Field({ nullable: true })
  @Column('uuid', { nullable: true })
  @Index()
  userId?: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  guestName?: string;

  @Field(() => ParticipantRole)
  @Column({ type: 'enum', enum: ParticipantRole, default: ParticipantRole.PARTICIPANT })
  role!: ParticipantRole;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  leftAt?: Date;

  @Field()
  @Column({ default: true })
  isActive!: boolean;
}
