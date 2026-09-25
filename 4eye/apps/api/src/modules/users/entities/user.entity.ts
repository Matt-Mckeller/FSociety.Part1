import { Entity, Column, Index, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { SoftDeletableEntity } from '../../../common/entities/base.entity';
import { UserRole, ReadingLevel, OAuthProvider } from '../../../common/enums';

@ObjectType()
@Entity('users')
export class User extends SoftDeletableEntity {
  @Field()
  @Column({ unique: true })
  @Index()
  email!: string;

  @Column({ nullable: true })
  passwordHash?: string;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role!: UserRole;

  @Field()
  @Column({ default: 'en' })
  preferredLanguage!: string;

  @Field(() => ReadingLevel)
  @Column({ type: 'enum', enum: ReadingLevel, default: ReadingLevel.STANDARD })
  readingLevel!: ReadingLevel;

  // OAuth fields
  @Field(() => OAuthProvider, { nullable: true })
  @Column({ type: 'enum', enum: OAuthProvider, nullable: true })
  oauthProvider?: OAuthProvider;

  @Column({ nullable: true })
  @Index()
  oauthProviderId?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emailVerifiedAt?: Date;

  // Token versioning for refresh token invalidation
  @Column({ default: 0 })
  tokenVersion!: number;

  // Relations will be added as we create other entities
}
