import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { AssetEntity } from './asset.entity.js';

@Entity('asset_history')
export class AssetHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => AssetEntity, (a) => a.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'assetId' })
  asset!: Relation<AssetEntity>;

  @Column('text')
  assetId!: string;

  @Column('text')
  filename!: string;

  @Column('text', { nullable: true })
  prompt!: string | null;

  @Column('text', { nullable: true })
  model!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}
