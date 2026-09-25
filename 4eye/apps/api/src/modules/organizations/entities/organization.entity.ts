import { Entity, Column, Index, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SoftDeletableEntity } from '../../../common/entities/base.entity';
import { VerticalType } from '../../../common/enums';

@ObjectType()
@Entity('organizations')
export class Organization extends SoftDeletableEntity {
  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  @Index()
  slug!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  logoUrl?: string;

  @Field(() => VerticalType)
  @Column({ type: 'enum', enum: VerticalType, default: VerticalType.LEARNING })
  verticalType!: VerticalType;

  @Field({ nullable: true })
  @Column({ nullable: true })
  transcriptRetentionDays?: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, unknown>;
}
