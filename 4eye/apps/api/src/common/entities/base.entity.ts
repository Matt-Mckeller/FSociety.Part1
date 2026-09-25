import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}

@ObjectType({ isAbstract: true })
export abstract class SoftDeletableEntity extends BaseEntity {
  @Field(() => Date, { nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
