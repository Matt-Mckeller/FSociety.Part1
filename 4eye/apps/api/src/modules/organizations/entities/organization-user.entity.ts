import { Entity, Column, ManyToOne, JoinColumn, Index, Unique } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { OrgRole } from '../../../common/enums';
import { Organization } from './organization.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
@Entity('organization_users')
@Unique(['organizationId', 'userId'])
export class OrganizationUser extends BaseEntity {
  @Field()
  @Column('uuid')
  @Index()
  organizationId!: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organizationId' })
  organization!: Organization;

  @Field()
  @Column('uuid')
  @Index()
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Field(() => OrgRole)
  @Column({ type: 'enum', enum: OrgRole, default: OrgRole.MEMBER })
  role!: OrgRole;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt!: Date;
}
