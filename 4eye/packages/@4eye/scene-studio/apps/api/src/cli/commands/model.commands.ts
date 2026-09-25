import { listLiveModels, KNOWN_MODELS, isKnownModel, type ModelKind } from '../../common/providers/model-registry.js';
import { boolFlag, strFlag, pad, type ParsedArgs } from '../args.util.js';

export async function cmdModelList(args: ParsedArgs): Promise<void> {
  const kindFlag = strFlag(args.flags, 'kind');
  const kind = (kindFlag === 'image' || kindFlag === 'text' || kindFlag === 'video') ? (kindFlag as ModelKind) : undefined;
  const filter = strFlag(args.flags, 'filter')?.toLowerCase();
  const refresh = boolFlag(args.flags, 'refresh');

  let models;
  try {
    models = await listLiveModels({ refresh });
  } catch (err) {
    console.error(`[model:list] live fetch failed: ${(err as Error).message}`);
    console.log('Falling back to KNOWN_MODELS only.');
    models = KNOWN_MODELS.map((m) => ({ name: m.name, displayName: undefined, supportedActions: undefined }));
  }

  let rows = models;
  if (filter) rows = rows.filter((m) => m.name.toLowerCase().includes(filter));
  if (kind) rows = rows.filter((m) => isKnownModel(m.name, kind));

  if (rows.length === 0) { console.log('(no models matched)'); return; }

  console.log(pad('KNOWN', 6), pad('NAME', 48), 'DISPLAY NAME');
  console.log('-'.repeat(100));
  for (const m of rows) {
    const known = isKnownModel(m.name) ? '\x1b[32m  \u2713  \x1b[0m' : '  \u00b7  ';
    console.log(known, pad(m.name, 48), m.displayName ?? '');
  }
  console.log(`\n${rows.length} model(s).`);
}
