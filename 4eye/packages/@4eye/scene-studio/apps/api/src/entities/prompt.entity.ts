import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { PromptKind } from '@4eye/scene-studio-shared';

@Entity('prompts')
export class PromptEntity {
  @PrimaryColumn('text')
  id!: string;

  @Column('text')
  name!: string;

  @Column('text')
  body!: string;

  @Column('text')
  kind!: PromptKind;

  @Column('text', { default: '[]' })
  tagsJson!: string;

  @Column('integer', { default: 0 })
  usageCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  get tags(): string[] {
    try { return JSON.parse(this.tagsJson || '[]'); } catch { return []; }
  }
  set tags(v: string[]) { this.tagsJson = JSON.stringify(v ?? []); }
}
