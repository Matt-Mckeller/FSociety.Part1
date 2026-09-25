import type { NestFactory } from '@nestjs/core';
import { SequencesService } from '../../sequences/sequences.service.js';
import { LibraryService } from '../../library/library.service.js';
import { boolFlag, numFlag, strFlag, pad, type ParsedArgs } from '../args.util.js';

type App = Awaited<ReturnType<typeof NestFactory.createApplicationContext>>;

export async function cmdSeqList(app: App): Promise<void> {
  const svc = app.get(SequencesService);
  const seqs = await svc.list();
  if (!seqs.length) { console.log('(no sequences)'); return; }
  console.log(pad('SLUG', 28), pad('FRAMES', 7), pad('AUTO★', 6), pad('SCENE', 10), 'NAME');
  console.log('-'.repeat(96));
  for (const s of seqs) {
    console.log(pad(s.slug, 28), pad(String(s.frameIds.length), 7), pad(s.autoStar ? 'on' : 'off', 6), pad(s.sceneCode ?? '-', 10), s.name);
  }
}

export async function cmdSeqShow(app: App, args: ParsedArgs): Promise<void> {
  const idOrSlug = args.positional[0];
  if (!idOrSlug) { console.error('Usage: seq:show <slug|id>'); process.exitCode = 1; return; }
  const svc = app.get(SequencesService);
  const lib = app.get(LibraryService);
  let seq: Awaited<ReturnType<typeof svc.getBySlug>>;
  try {
    seq = await svc.getBySlug(idOrSlug);
  } catch {
    seq = await svc.get(idOrSlug);
  }
  console.log(`\nSequence : ${seq.name}`);
  console.log(`Slug     : ${seq.slug}`);
  console.log(`Scene    : ${seq.sceneCode ?? '-'}`);
  console.log(`Frames   : ${seq.frameIds.length}`);
  console.log(`Auto★    : ${seq.autoStar ? 'on' : 'off'}`);
  if (seq.description) console.log(`Desc     : ${seq.description}`);
  console.log('\n' + '─'.repeat(80));
  console.log(pad('#', 4), pad('ASSET ID (16)', 18), 'TITLE');
  console.log('─'.repeat(80));
  for (let i = 0; i < seq.frameIds.length; i++) {
    const id = seq.frameIds[i]!;
    let title = '(asset not found)';
    try { const a = await lib.getAsset(id); title = a.display.title; } catch { /* missing */ }
    console.log(pad(String(i), 4), pad(id.slice(0, 16), 18), title);
  }
  console.log();
}

export async function cmdSeqInsert(app: App, args: ParsedArgs): Promise<void> {
  const [slug, assetId] = args.positional;
  if (!slug || !assetId) { console.error('Usage: seq:insert <slug> <assetId> [--at N]'); process.exitCode = 1; return; }
  const svc = app.get(SequencesService);
  const seq = await svc.getBySlug(slug);
  const at = numFlag(args.flags, 'at');
  const updated = await svc.addFrame(seq.id, assetId, at);
  const idx = updated.frameIds.indexOf(assetId);
  console.log(`Inserted ${assetId.slice(0, 16)}… at position ${idx} in "${slug}" (${updated.frameIds.length} frames total)`);
}

export async function cmdSeqReplace(app: App, args: ParsedArgs): Promise<void> {
  const [slug, oldId, newId] = args.positional;
  if (!slug || !oldId || !newId) { console.error('Usage: seq:replace <slug> <oldId> <newId>'); process.exitCode = 1; return; }
  const svc = app.get(SequencesService);
  const seq = await svc.getBySlug(slug);
  const oldIdx = seq.frameIds.indexOf(oldId);
  if (oldIdx === -1) { console.error(`Asset ${oldId} is not in sequence "${slug}"`); process.exitCode = 1; return; }
  const newFrameIds = [...seq.frameIds];
  newFrameIds[oldIdx] = newId;
  await svc.update(seq.id, { frameIds: newFrameIds });
  console.log(`Replaced ${oldId.slice(0, 16)}… → ${newId.slice(0, 16)}… at position ${oldIdx} in "${slug}"`);
}

export async function cmdSeqRename(app: App, args: ParsedArgs): Promise<void> {
  const [oldSlug, newSlug] = args.positional;
  if (!oldSlug || !newSlug) { console.error('Usage: seq:rename <oldSlug> <newSlug> [--name "New Name"]'); process.exitCode = 1; return; }
  const svc = app.get(SequencesService);
  const seq = await svc.getBySlug(oldSlug);
  const name = strFlag(args.flags, 'name');
  await svc.update(seq.id, { slug: newSlug, ...(name ? { name } : {}) });
  console.log(`Renamed "${oldSlug}" → "${newSlug}"${name ? ` (name: "${name}")` : ''}`);
}

export async function cmdSeqSetAutoStar(app: App, args: ParsedArgs): Promise<void> {
  const slug = args.positional[0];
  if (!slug) { console.error('Usage: seq:set-auto-star <slug> --on|--off'); process.exitCode = 1; return; }
  const on = boolFlag(args.flags, 'on');
  const off = boolFlag(args.flags, 'off');
  if (on === off) { console.error('Specify exactly one of --on or --off'); process.exitCode = 1; return; }
  const svc = app.get(SequencesService);
  const seq = await svc.getBySlug(slug);
  const updated = await svc.update(seq.id, { autoStar: on });
  console.log(
    `Sequence "${slug}" auto-star → ${updated.autoStar ? 'ON' : 'OFF'}` +
    (on ? ` (retro-starred ${updated.frameIds.length} frame(s))` : ''),
  );
}

export async function cmdSceneCoverage(app: App, args: ParsedArgs): Promise<void> {
  const slug = args.positional[0];
  if (!slug) { console.error('Usage: scene:coverage <slug>'); process.exitCode = 1; return; }
  const seqSvc = app.get(SequencesService);
  const libSvc = app.get(LibraryService);
  const seq = await seqSvc.getBySlug(slug);
  const lib = await libSvc.getLibrary();
  const assetById = new Map(lib.assets.map((a) => [a.id, a]));

  const inSeq = new Map<string, { positions: number[]; starred: number }>();
  const unresolved: string[] = [];
  seq.frameIds.forEach((id, pos) => {
    const a = assetById.get(id);
    if (!a) { unresolved.push(id); return; }
    const code = a.display.sceneCode ?? '(no sceneCode)';
    const slot = inSeq.get(code) ?? { positions: [], starred: 0 };
    slot.positions.push(pos);
    if (a.catalog.starred) slot.starred++;
    inSeq.set(code, slot);
  });

  const libByCode = new Map<string, { total: number; starred: number }>();
  for (const a of lib.assets) {
    if (!a.display.sceneCode) continue;
    const slot = libByCode.get(a.display.sceneCode) ?? { total: 0, starred: 0 };
    slot.total++;
    if (a.catalog.starred) slot.starred++;
    libByCode.set(a.display.sceneCode, slot);
  }

  console.log(`\nSequence : ${seq.name}`);
  console.log(`Slug     : ${seq.slug}`);
  console.log(`Frames   : ${seq.frameIds.length}  (distinct sceneCodes: ${inSeq.size})`);
  console.log(`Auto★    : ${seq.autoStar ? 'on' : 'off'}`);

  console.log('\n── In sequence (grouped by sceneCode) ──');
  console.log(pad('SCENE', 14), pad('FRAMES', 7), pad('★', 4), 'POSITIONS');
  console.log('-'.repeat(70));
  const inSeqSorted = [...inSeq.entries()].sort((a, b) => a[1].positions[0]! - b[1].positions[0]!);
  for (const [code, slot] of inSeqSorted) {
    console.log(pad(code, 14), pad(String(slot.positions.length), 7), pad(`${slot.starred}/${slot.positions.length}`, 4), slot.positions.join(','));
  }

  const missing = [...libByCode.entries()].filter(([code]) => !inSeq.has(code));
  if (missing.length > 0) {
    console.log('\n── Library sceneCodes NOT in this sequence ──');
    console.log(pad('SCENE', 14), pad('TOTAL', 6), pad('★', 4));
    console.log('-'.repeat(40));
    for (const [code, slot] of missing.sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(pad(code, 14), pad(String(slot.total), 6), pad(`${slot.starred}/${slot.total}`, 4));
    }
  } else {
    console.log('\n✓ No library sceneCodes missing from this sequence.');
  }

  if (unresolved.length > 0) {
    console.log(`\n⚠  ${unresolved.length} frame(s) reference assets not in library:`);
    for (const id of unresolved) console.log('  ' + id);
  }
}
