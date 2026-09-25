import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import type { CreatePromptDto, SavedPrompt, UpdatePromptDto } from '@4eye/scene-studio-shared';
import { PromptEntity } from '../entities/prompt.entity.js';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(PromptEntity)
    private readonly repo: Repository<PromptEntity>,
  ) {}

  async list(): Promise<SavedPrompt[]> {
    const all = await this.repo.find({ order: { usageCount: 'DESC', updatedAt: 'DESC' } });
    return all.map(toDto);
  }

  async create(dto: CreatePromptDto): Promise<SavedPrompt> {
    const e = new PromptEntity();
    e.id = randomUUID();
    e.name = dto.name;
    e.body = dto.body;
    e.kind = dto.kind;
    e.tags = dto.tags;
    e.usageCount = 0;
    const saved = await this.repo.save(e);
    return toDto(saved);
  }

  async update(id: string, dto: UpdatePromptDto): Promise<SavedPrompt> {
    const e = await this.repo.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`Prompt not found: ${id}`);
    if (dto.name !== undefined) e.name = dto.name;
    if (dto.body !== undefined) e.body = dto.body;
    if (dto.kind !== undefined) e.kind = dto.kind;
    if (dto.tags !== undefined) e.tags = dto.tags;
    const saved = await this.repo.save(e);
    return toDto(saved);
  }

  async incrementUsage(id: string): Promise<void> {
    await this.repo.increment({ id }, 'usageCount', 1);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}

function toDto(e: PromptEntity): SavedPrompt {
  return {
    id: e.id,
    name: e.name,
    body: e.body,
    kind: e.kind,
    tags: e.tags,
    usageCount: e.usageCount,
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
  };
}
