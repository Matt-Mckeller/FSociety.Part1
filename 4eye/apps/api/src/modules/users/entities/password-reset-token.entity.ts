import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from './user.entity';

@ObjectType()
@Entity('password_reset_tokens')
export class PasswordResetToken extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ unique: true })
  @Index()
  token!: string;

  @Field()
  @Column()
  expiresAt!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  usedAt?: Date;
}
