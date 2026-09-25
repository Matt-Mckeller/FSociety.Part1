import { Entity, Column, Index, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Organization } from '../../organizations/entities/organization.entity';
import { randomBytes } from 'crypto';

@ObjectType()
@Entity('rooms')
export class Room extends BaseEntity {
  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ unique: true, length: 8 })
  @Index()
  inviteCode!: string;

  @Field()
  @Column({ default: true })
  isRecordingEnabled!: boolean;

  @Field()
  @Column({ default: true })
  isChatEnabled!: boolean;

  @Field()
  @Column({ default: true })
  isActive!: boolean;

  @Field()
  @Column('uuid')
  @Index()
  createdById!: string;

  // A room can belong to multiple organizations (shared spaces)
  @ManyToMany(() => Organization)
  @JoinTable({
    name: 'organization_rooms',
    joinColumn: { name: 'roomId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'organizationId', referencedColumnName: 'id' },
  })
  organizations!: Organization[];

  static generateInviteCode(): string {
    return randomBytes(4).toString('hex').toUpperCase();
  }
}
