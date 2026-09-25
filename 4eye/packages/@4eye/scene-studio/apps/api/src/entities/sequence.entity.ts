import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sequences')
export class SequenceEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text', { unique: true })
  slug!: string;

  @Column('text')
  sceneCode!: string;

  @Column('text', { default: '' })
  description!: string;

  @Column('text', { default: '[]' })
  frameIdsJson!: string;

  @Column('boolean', { default: false })
  autoStar!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  get frameIds(): string[] {
    try { return JSON.parse(this.frameIdsJson || '[]'); } catch { return []; }
  }
  set frameIds(v: string[]) { this.frameIdsJson = JSON.stringify(v ?? []); }
}
