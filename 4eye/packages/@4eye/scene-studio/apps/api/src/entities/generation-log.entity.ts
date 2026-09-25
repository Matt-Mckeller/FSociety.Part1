import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';
import type { Generation } from '@4eye/scene-studio-shared';

@Entity('generation_logs')
export class GenerationLogEntity {
  @PrimaryColumn('text')
  id!: string;

  @Index()
  @CreateDateColumn({ type: 'datetime' })
  createdAt!: Date;

  @Column('datetime', { nullable: true })
  finishedAt!: Date | null;

  @Column('integer', { nullable: true })
  durationMs!: number | null;

  @Index()
  @Column('text')
  kind!: Generation.Kind;

  @Index()
  @Column('text')
  status!: Generation.Status;

  @Column('text')
  provider!: string;

  @Column('text')
  model!: string;

  @Column('text')
  prompt!: string;

  @Column('text', { nullable: true })
  promptBody!: string | null;

  /** JSON-encoded Generation.ReferenceResolved[] */
  @Column('text', { default: '[]' })
  referencesJson!: string;

  /** JSON-encoded string[] */
  @Column('text', { default: '[]' })
  inputAssetIdsJson!: string;

  /** JSON-encoded string[] */
  @Column('text', { default: '[]' })
  outputAssetIdsJson!: string;

  @Index()
  @Column('text', { nullable: true })
  targetSequenceId!: string | null;

  /** JSON-encoded string[] */
  @Column('text', { default: '[]' })
  targetSequenceFrameIdsJson!: string;

  /** JSON-encoded params */
  @Column('text', { default: '{}' })
  paramsJson!: string;

  @Index()
  @Column('text', { nullable: true })
  seedId!: string | null;

  @Column('text', { nullable: true })
  seedGitSha!: string | null;

  @Index()
  @Column('text', { nullable: true })
  sceneCode!: string | null;

  /** JSON-encoded Generation.Cost | null */
  @Column('text', { nullable: true })
  costJson!: string | null;

  @Column('text', { nullable: true })
  providerJobId!: string | null;

  @Column('text', { nullable: true })
  errorMessage!: string | null;

  /** JSON-encoded full request snapshot (no binaries). */
  @Column('text', { default: '{}' })
  rawRequestJson!: string;

  /** JSON-encoded provider response metadata (no binaries). */
  @Column('text', { nullable: true })
  rawResponseMetaJson!: string | null;
}
