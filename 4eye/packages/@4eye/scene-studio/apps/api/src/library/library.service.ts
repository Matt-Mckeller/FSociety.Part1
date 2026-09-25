import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import type { Asset, Library } from '@4eye/scene-studio-shared';
import { LIBRARY_SCHEMA_VERSION } from '@4eye/scene-studio-shared';
import { AssetEntity } from '../entities/asset.entity.js';
import { toAsset } from '../common/asset.mapper.js';
import { loadConfig } from '../config/config.service.js';
import { WsGateway } from '../ws/ws.gateway.js';
import { LibraryExporter } from './library.exporter.js';

@Injectable()
export class LibraryService {
  private readonly log = new Logger(LibraryService.name);

  constructor(
    @InjectRepository(AssetEntity)
    private readonly assets: Repository<AssetEntity>,
    private readonly ws: WsGateway,
    private readonly exporter: LibraryExporter,
  ) {}

  // ── reads ──────────────────────────────────────────────────
  async getLibrary(): Promise<Library> {
    const all = await this.assets.find({ order: { order: 'ASC' } });
    const cfg = loadConfig();
    return {
      schemaVersion: LIBRARY_SCHEMA_VERSION,
      rootDir: cfg.galleryRoot,
      assets: all.map(toAsset),
      createdAt: (all[0]?.createdAt ?? new Date()).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async getAsset(id: string): Promise<Asset> {
    const e = await this.assets.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`Asset not found: ${id}`);
    return toAsset(e);
  }

  async getAssetEntity(id: string): Promise<AssetEntity> {
    const e = await this.assets.findOne({ where: { id } });
    if (!e) throw new NotFoundException(`Asset not found: ${id}`);
    return e;
  }

  // ── writes (the only path that touches the DB for mutations) ──
  async upsert(entity: AssetEntity): Promise<Asset> {
    const saved = await this.assets.save(entity);
    await this.notifyChange([saved.id]);
    return toAsset(saved);
  }

  async upsertMany(entities: AssetEntity[]): Promise<Asset[]> {
    const saved = await this.assets.save(entities);
    await this.notifyChange(saved.map((s) => s.id));
    return saved.map(toAsset);
  }

  async patch(id: string, mutator: (e: AssetEntity) => void): Promise<Asset> {
    const e = await this.getAssetEntity(id);
    mutator(e);
    const saved = await this.assets.save(e);
    await this.notifyChange([saved.id]);
    return toAsset(saved);
  }

  async patchMany(ids: string[], mutator: (e: AssetEntity) => void): Promise<Asset[]> {
    if (ids.length === 0) return [];
    const entities = await this.assets.find({ where: { id: In(ids) } });
    for (const e of entities) mutator(e);
    const saved = await this.assets.save(entities);
    await this.notifyChange(saved.map((s) => s.id));
    return saved.map(toAsset);
  }

  async remove(id: string): Promise<void> {
    await this.assets.delete(id);
    await this.notifyChange([id]);
  }

  // ── post-write side effects ────────────────────────────────
  private async notifyChange(changedIds: string[]): Promise<void> {
    const library = await this.getLibrary();
    this.ws.broadcast({ type: 'library:updated', library, changedIds });
    this.exporter.scheduleExport(library);
  }
}
