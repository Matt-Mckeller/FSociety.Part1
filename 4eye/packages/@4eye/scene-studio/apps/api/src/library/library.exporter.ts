import { Injectable, Logger } from '@nestjs/common';
import { writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { Library } from '@4eye/scene-studio-shared';
import { loadConfig } from '../config/config.service.js';

/**
 * Debounced JSON export of the library to `library.export.json`.
 * Atomic-write (tmp + rename) so partial files are never observed.
 */
@Injectable()
export class LibraryExporter {
  private readonly log = new Logger(LibraryExporter.name);
  private pending: Library | null = null;
  private timer: NodeJS.Timeout | null = null;

  scheduleExport(library: Library): void {
    this.pending = library;
    if (this.timer) return;
    this.timer = setTimeout(() => void this.flush(), 250);
  }

  private async flush(): Promise<void> {
    const library = this.pending;
    this.pending = null;
    this.timer = null;
    if (!library) return;
    try {
      const cfg = loadConfig();
      await mkdir(dirname(cfg.exportPath), { recursive: true });
      const tmp = cfg.exportPath + '.tmp';
      await writeFile(tmp, JSON.stringify(library, null, 2), 'utf8');
      await rename(tmp, cfg.exportPath);
    } catch (err) {
      this.log.error(`Failed to export library: ${(err as Error).message}`);
    }
  }
}
