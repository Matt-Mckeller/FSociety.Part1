import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { ConsentType } from '../../../common/enums';
import { User } from './user.entity';

@ObjectType()
@Entity('consent_logs')
export class ConsentLog extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Field(() => ConsentType)
  @Column({ type: 'enum', enum: ConsentType })
  type!: ConsentType;

  @Field()
  @Column()
  version!: string;

  @Field()
  @Column()
  acceptedAt!: Date;

  @Field()
  @Column()
  ipAddress!: string;

  @Field()
  @Column()
  userAgent!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  locale?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;
}
