import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Transcript } from './transcript.entity';

@ObjectType()
@Entity('transcript_segments')
@Index(['transcriptId', 'sequenceIndex'])
export class TranscriptSegment extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  transcriptId!: string;

  @ManyToOne(() => Transcript, (transcript) => transcript.segments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'transcriptId' })
  transcript!: Transcript;

  @Field(() => Int)
  @Column()
  sequenceIndex!: number;

  @Field(() => Float)
  @Column('float')
  startTimeMs!: number;

  @Field(() => Float)
  @Column('float')
  endTimeMs!: number;

  @Field()
  @Column('text')
  text!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  speakerLabel?: string;

  @Field(() => Float, { nullable: true })
  @Column('float', { nullable: true })
  confidence?: number;

  @Field()
  @Column({ default: false })
  isFinal!: boolean;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  wordTimings?: Array<{
    word: string;
    startMs: number;
    endMs: number;
    confidence?: number;
  }>;
}
