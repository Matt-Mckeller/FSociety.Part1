import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import type {
  CreateSequenceDto,
  Sequence,
  UpdateSequenceDto,
} from '@4eye/scene-studio-shared';
import { SequenceEntity } from '../entities/sequence.entity.js';
import { LibraryService } from '../library/library.service.js';
import { WsGateway } from '../ws/ws.gateway.js';

@Injectable()
export class SequencesService {
  constructor(
    @InjectRepository(SequenceEntity)
    private readonly repo: Repository<SequenceEntity>,
    private readonly library: LibraryService,
    private readonly ws: WsGateway,
  ) {}

  async list(): Promise<Sequence[]> {
    const all = await this.repo.find({ order: { createdAt: 'ASC' } });
    return all.map(toDto);
  }

  async get(id: string): Promise<Sequence> {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`Sequence not found: ${id}`);
    return toDto(e);
  }

  async getBySlug(slug: string): Promise<Sequence> {
    const e = await this.repo.findOne({ where: { slug } });
    if (!e) throw new NotFoundException(`Sequence not found: ${slug}`);
    return toDto(e);
  }

  async create(dto: CreateSequenceDto): Promise<Sequence> {
    const dup = await this.repo.findOne({ where: { slug: dto.slug } });
    if (dup) throw new ConflictException(`Slug already in use: ${dto.slug}`);
    await this.validateFrameIds(dto.frameIds);
    const e = new SequenceEntity();
    e.id = randomUUID();
    e.name = dto.name;
    e.slug = dto.slug;
    e.sceneCode = dto.sceneCode;
    e.description = dto.description;
    e.frameIds = dto.frameIds;
    e.autoStar = dto.autoStar ?? false;
    const saved = await this.repo.save(e);
    if (e.autoStar && dto.frameIds.length > 0) {
      await this.library.patchMany(dto.frameIds, (a) => { a.starred = true; });
    }
    const dtoOut = toDto(saved);
    this.ws.broadcast({ type: 'sequence:changed', sequence: dtoOut });
    return dtoOut;
  }

  async update(id: string, dto: UpdateSequenceDto): Promise<Sequence> {
    const e = await this.findOrThrow(id);
    if (dto.slug && dto.slug !== e.slug) {
      const dup = await this.repo.findOne({ where: { slug: dto.slug } });
      if (dup) throw new ConflictException(`Slug already in use: ${dto.slug}`);
      e.slug = dto.slug;
    }
    if (dto.name !== undefined) e.name = dto.name;
    if (dto.sceneCode !== undefined) e.sceneCode = dto.sceneCode;
    if (dto.description !== undefined) e.description = dto.description;
    const prevFrameIds = e.frameIds;
    const prevAutoStar = e.autoStar;
    if (dto.frameIds !== undefined) {
      await this.validateFrameIds(dto.frameIds);
      e.frameIds = dto.frameIds;
    }
    if (dto.autoStar !== undefined) e.autoStar = dto.autoStar;
    const saved = await this.repo.save(e);

    // Auto-star bookkeeping for frame churn under autoStar=true:
    if (e.autoStar && dto.frameIds !== undefined) {
      const prev = new Set(prevFrameIds);
      const next = new Set(dto.frameIds);
      const added = [...next].filter((x) => !prev.has(x));
      const removed = [...prev].filter((x) => !next.has(x));
      if (added.length) {
        await this.library.patchMany(added, (a) => { a.starred = true; });
      }
      for (const rid of removed) {
        if (!(await this.assetIsInOtherAutoStarSeq(rid, e.id))) {
          await this.library.patch(rid, (a) => { a.starred = false; });
        }
      }
    }
    // If autoStar was just turned ON, retro-star current frames:
    if (!prevAutoStar && e.autoStar) {
      await this.library.patchMany(e.frameIds, (a) => { a.starred = true; });
    }

    const dtoOut = toDto(saved);
    this.ws.broadcast({ type: 'sequence:changed', sequence: dtoOut });
    return dtoOut;
  }

  async reorderFrames(id: string, frameIds: string[]): Promise<Sequence> {
    const e = await this.findOrThrow(id);
    const current = new Set(e.frameIds);
    const incoming = new Set(frameIds);
    if (current.size !== incoming.size || ![...current].every((x) => incoming.has(x))) {
      throw new ConflictException('reorderFrames must contain the same ids as the current sequence');
    }
    e.frameIds = frameIds;
    const saved = await this.repo.save(e);
    const dtoOut = toDto(saved);
    this.ws.broadcast({ type: 'sequence:changed', sequence: dtoOut });
    return dtoOut;
  }

  async addFrame(id: string, assetId: string, position?: number): Promise<Sequence> {
    const e = await this.findOrThrow(id);
    await this.library.getAsset(assetId); // throws if missing
    const next = [...e.frameIds];
    // de-dup: if asset is already present, remove first, then re-insert at position
    const existingIdx = next.indexOf(assetId);
    if (existingIdx >= 0) next.splice(existingIdx, 1);
    const idx = position === undefined ? next.length : Math.min(position, next.length);
    next.splice(idx, 0, assetId);
    e.frameIds = next;
    const saved = await this.repo.save(e);
    if (e.autoStar) {
      await this.library.patch(assetId, (a) => { a.starred = true; });
    }
    const dtoOut = toDto(saved);
    this.ws.broadcast({ type: 'sequence:changed', sequence: dtoOut });
    return dtoOut;
  }

  async removeFrame(id: string, assetId: string): Promise<Sequence> {
    const e = await this.findOrThrow(id);
    e.frameIds = e.frameIds.filter((x) => x !== assetId);
    const saved = await this.repo.save(e);
    if (e.autoStar && !(await this.assetIsInOtherAutoStarSeq(assetId, e.id))) {
      await this.library.patch(assetId, (a) => { a.starred = false; });
    }
    const dtoOut = toDto(saved);
    this.ws.broadcast({ type: 'sequence:changed', sequence: dtoOut });
    return dtoOut;
  }

  async remove(id: string): Promise<void> {
    await this.findOrThrow(id);
    await this.repo.delete(id);
    this.ws.broadcast({ type: 'sequence:removed', id });
  }

  private async findOrThrow(id: string): Promise<SequenceEntity> {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`Sequence not found: ${id}`);
    return e;
  }

  private async validateFrameIds(ids: string[]): Promise<void> {
    for (const id of ids) {
      await this.library.getAsset(id); // throws NotFoundException if missing
    }
  }

  /** True if `assetId` is referenced by any autoStar=true sequence other than `excludeSeqId`. */
  private async assetIsInOtherAutoStarSeq(assetId: string, excludeSeqId: string): Promise<boolean> {
    const seqs = await this.repo.find({ where: { autoStar: true } });
    return seqs.some((s) => s.id !== excludeSeqId && s.frameIds.includes(assetId));
  }
}

function toDto(e: SequenceEntity): Sequence {
  return {
    id: e.id,
    name: e.name,
    slug: e.slug,
    sceneCode: e.sceneCode,
    description: e.description,
    frameIds: e.frameIds,
    autoStar: !!e.autoStar,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}
