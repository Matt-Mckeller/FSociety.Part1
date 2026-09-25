import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  type Relation,
} from 'typeorm';
import type { AssetKind, AssetSource, VideoInfo } from '@4eye/scene-studio-shared';
import { AssetHistoryEntity } from './asset-history.entity.js';

@Entity('assets')
export class AssetEntity {
  @PrimaryColumn('text')
  id!: string;

  @Index()
  @Column('text')
  kind!: AssetKind;

  // ── file
  @Index()
  @Column('text')
  folder!: string;

  @Column('text')
  filename!: string;

  @Column('text')
  mimeType!: string;

  @Column('integer', { nullable: true })
  sizeBytes!: number | null;

  @Column('integer')
  width!: number;

  @Column('integer')
  height!: number;

  // ── display
  @Column('text')
  title!: string;

  @Column('text', { default: '' })
  description!: string;

  @Column('text', { nullable: true })
  sceneCode!: string | null;

  // ── catalog
  @Index()
  @Column('real')
  order!: number;

  /** JSON-encoded string[] */
  @Column('text', { default: '[]' })
  tagsJson!: string;

  @Column('boolean', { default: false })
  starred!: boolean;

  // ── origin
  @Column('text')
  source!: AssetSource;

  /** JSON-encoded string[] */
  @Column('text', { default: '[]' })
  parentIdsJson!: string;

  @Column('text', { nullable: true })
  prompt!: string | null;

  @Column('text', { nullable: true })
  model!: string | null;

  @Column('text', { nullable: true })
  jobId!: string | null;

  // ── video (JSON-encoded VideoInfo, null for images)
  @Column('text', { nullable: true })
  videoJson!: string | null;

  @OneToMany(() => AssetHistoryEntity, (h) => h.asset, {
    cascade: true,
    eager: true,
  })
  history!: Relation<AssetHistoryEntity[]>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // ── convenience getters/setters ────────────────────────────
  get tags(): string[] {
    try { return JSON.parse(this.tagsJson || '[]'); } catch { return []; }
  }
  set tags(v: string[]) { this.tagsJson = JSON.stringify(v ?? []); }

  get parentIds(): string[] {
    try { return JSON.parse(this.parentIdsJson || '[]'); } catch { return []; }
  }
  set parentIds(v: string[]) { this.parentIdsJson = JSON.stringify(v ?? []); }

  get video(): VideoInfo | null {
    if (!this.videoJson) return null;
    try { return JSON.parse(this.videoJson); } catch { return null; }
  }
  set video(v: VideoInfo | null) {
    this.videoJson = v ? JSON.stringify(v) : null;
  }
}
