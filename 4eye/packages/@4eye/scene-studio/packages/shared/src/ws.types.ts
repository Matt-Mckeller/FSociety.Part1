import type { Asset } from './asset.types.js';
import type { Library } from './library.types.js';
import type { Animate, Edit, Generate } from './actions.types.js';
import type { Sequence } from './sequence.types.js';
import type { GenerationLog } from './generation.types.js';

export type WSEvent =
  | { type: 'library:updated'; library: Library; changedIds: string[] }
  | { type: 'asset:added'; asset: Asset }
  | { type: 'asset:removed'; id: string }
  | { type: 'edit:progress'; progress: Edit.Progress }
  | { type: 'animate:progress'; progress: Animate.Progress }
  | { type: 'generate:progress'; progress: Generate.Progress }
  | { type: 'sequence:changed'; sequence: Sequence }
  | { type: 'sequence:removed'; id: string }
  | { type: 'generation:logged'; log: GenerationLog };
