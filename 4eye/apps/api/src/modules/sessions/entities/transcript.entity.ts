import { Entity, Column, OneToOne, OneToMany, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { TranscriptStatus } from '../../../common/enums';
import { Session } from './session.entity';
import { TranscriptSegment } from './transcript-segment.entity';

@ObjectType()
@Entity('transcripts')
export class Transcript extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  sessionId!: string;

  @OneToOne(() => Session, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sessionId' })
  session!: Session;

  @Field(() => String)
  @Column({ type: 'enum', enum: TranscriptStatus, default: TranscriptStatus.PENDING })
  status!: TranscriptStatus;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sourceLanguage?: string;

  @Field(() => Int)
  @Column({ default: 0 })
  segmentCount!: number;

  @Field(() => Int)
  @Column({ default: 0 })
  durationMs!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  sttProvider?: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;

  @Field(() => [TranscriptSegment], { nullable: true })
  @OneToMany(() => TranscriptSegment, (segment) => segment.transcript, {
    cascade: true,
    eager: false,
  })
  segments?: TranscriptSegment[];
}
