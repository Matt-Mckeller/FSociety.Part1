import type { NestFactory } from '@nestjs/core';
import { LibraryService } from '../../library/library.service.js';
import { SequencesService } from '../../sequences/sequences.service.js';
import { loadConfig } from '../../config/config.service.js';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

type App = Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;

export async function cmdDoctor(app: App): Promise<void> {
  const lib = app.get(LibraryService);
  const seqSvc = app.get(SequencesService);
  const { galleryRoot } = loadConfig();

  const library = await lib.getLibrary();
  const sequences = await seqSvc.list();

  let issues = 0;
  const warn = (msg: string) => { console.log(`  \x1b[31m✗\x1b[0m ${msg}`); issues++; };
  const ok = (msg: string) => console.log(`  \x1b[32m✓\x1b[0m ${msg}`);

  console.log('\n── Assets ──────────────────────────────────────────────────────────────');

  let missingFiles = 0;
  for (const a of library.assets) {
    const p = join(galleryRoot, a.file.folder, a.file.filename);
    if (!existsSync(p)) { warn(`Missing file  ${a.id.slice(0, 16)}… → ${a.file.folder}/${a.file.filename}`); missingFiles++; }
  }
  if (!missingFiles) ok(`All ${library.assets.length} asset files exist on disk`);

  const starredInGenerated = library.assets.filter((a) => a.catalog.starred && a.file.folder.includes('07_generated'));
  if (starredInGenerated.length) {
    for (const a of starredInGenerated) warn(`Starred asset in 07_generated: ${a.id.slice(0, 16)}… (${a.file.filename})`);
  } else {
    ok('No starred assets stranded in 07_generated');
  }

  const starredByScene: Record<string, string[]> = {};
  for (const a of library.assets) {
    if (a.catalog.starred && a.display.sceneCode) {
      (starredByScene[a.display.sceneCode] ??= []).push(a.id);
    }
  }
  const dupScenes = Object.entries(starredByScene).filter(([, ids]) => ids.length > 1);
  if (dupScenes.length) {
    for (const [sc, ids] of dupScenes) warn(`Multiple starred for sceneCode ${sc}: ${ids.map((i) => i.slice(0, 12)).join(', ')}`);
  } else {
    ok('No duplicate starred per sceneCode');
  }

  console.log('\n── Sequences ────────────────────────────────────────────────────────────');
  const assetIndex = new Set(library.assets.map((a) => a.id));
  if (!sequences.length) {
    ok('(no sequences)');
  } else {
    for (const seq of sequences) {
      let seqOk = true;
      for (const fid of seq.frameIds) {
        if (!assetIndex.has(fid)) { warn(`Sequence "${seq.slug}" references unknown assetId: ${fid.slice(0, 16)}…`); seqOk = false; }
      }
      if (seqOk) ok(`"${seq.slug}" — ${seq.frameIds.length} frames all resolve`);
    }
  }

  console.log();
  if (issues === 0) {
    console.log('\x1b[32mAll checks passed.\x1b[0m\n');
  } else {
    console.log(`\x1b[31m${issues} issue(s) found.\x1b[0m\n`);
    process.exitCode = 1;
  }
}
