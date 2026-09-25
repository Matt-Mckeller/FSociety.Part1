import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { SessionStatus, VerticalType } from '../../../common/enums';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity('sessions')
export class Session extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  roomId!: string;

  @ManyToOne(() => Room, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'roomId' })
  room!: Room;

  @Field()
  @Column('uuid')
  @Index()
  hostId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'hostId' })
  host!: User;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field(() => SessionStatus)
  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.SCHEDULED })
  @Index()
  status!: SessionStatus;

  @Field(() => VerticalType)
  @Column({ type: 'enum', enum: VerticalType, default: VerticalType.LEARNING })
  verticalType!: VerticalType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  scheduledStartAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  startedAt?: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  endedAt?: Date;

  @Field(() => Int)
  @Column({ default: 0 })
  participantCount!: number;

  @Field()
  @Column({ default: false })
  isRecording!: boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;
}
