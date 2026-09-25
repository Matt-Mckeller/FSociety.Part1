/**
 * Gallery CLI — operate the seed/generation system without an HTTP client.
 *
 * Boots NestJS in standalone mode then dispatches to per-domain command modules.
 *
 * Usage:
 *   pnpm cli seed:list
 *   pnpm cli seed:show <id>
 *   pnpm cli seed:run <id> [--dry-run] [--variations N] [--replace] [--model NAME] [--verbose]
 *   pnpm cli gen:log [--kind X] [--status X] [--scene X] [--seed X] [--limit N]
 *   pnpm cli gen:show <logId>
 *   pnpm cli gen:replay <logId> [--variations N] [--model NAME]
 *   pnpm cli asset:import <path> [--to <folder>] [--star] [--scene-code CODE]
 *   pnpm cli asset:test <assetId> [--verbose]
 *   pnpm cli asset:promote <id> --to <folder> [--star] [--scene-code CODE]
 *   pnpm cli asset:demote  <id> --to <folder> [--unstar]
 *   pnpm cli model:list [--kind image|text|video] [--refresh] [--filter SUBSTR]
 *   pnpm cli seq:list
 *   pnpm cli seq:show <slug|id>
 *   pnpm cli seq:insert <slug> <assetId> [--at N]
 *   pnpm cli seq:replace <slug> <oldId> <newId>
 *   pnpm cli seq:rename <oldSlug> <newSlug> [--name "New Name"]
 *   pnpm cli seq:set-auto-star <slug> --on|--off
 *   pnpm cli scene:coverage <slug>
 *   pnpm cli vid:run --seed <id> | --start <assetId> --prompt "..." [options]
 *   pnpm cli vid:extract-frame --video <assetId> [--at last|first|<N>]
 *   pnpm cli doctor
 */

import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import type { LogLevel } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AppModule } from '../app.module.js';
import { parseArgs, boolFlag } from './args.util.js';
import { cmdSeedList, cmdSeedShow, cmdSeedRun } from './commands/seed.commands.js';
import { cmdGenLog, cmdGenShow, cmdGenReplay } from './commands/gen.commands.js';
import { cmdAssetTest, cmdAssetImport, cmdAssetPromote, cmdAssetDemote } from './commands/asset.commands.js';
import { cmdModelList } from './commands/model.commands.js';
import { cmdSeqList, cmdSeqShow, cmdSeqInsert, cmdSeqReplace, cmdSeqRename, cmdSeqSetAutoStar, cmdSceneCoverage } from './commands/seq.commands.js';
import { cmdVidRun, cmdVidExtractFrame } from './commands/vid.commands.js';
import { cmdDoctor } from './commands/health.commands.js';

async function main(): Promise<void> {
  const [, , cmd, ...rest] = process.argv;
  if (!cmd || cmd === '--help' || cmd === '-h') {
    printHelp();
    process.exit(0);
  }

  const args = parseArgs(rest);
  const verbose = boolFlag(args.flags, 'verbose');
  const logLevel: LogLevel[] = verbose ? ['log', 'error', 'warn'] : ['error', 'warn'];

  console.log(`[cli] Booting NestJS...`);
  Logger.overrideLogger(logLevel);
  const app = await NestFactory.createApplicationContext(AppModule, { logger: logLevel });
  console.log(`[cli] Ready. Running ${cmd}`);

  try {
    switch (cmd) {
      case 'seed:list':        await cmdSeedList(app); break;
      case 'seed:show':        await cmdSeedShow(app, args); break;
      case 'seed:run':         await cmdSeedRun(app, args); break;
      case 'gen:log':          await cmdGenLog(app, args); break;
      case 'gen:show':         await cmdGenShow(app, args); break;
      case 'gen:replay':       await cmdGenReplay(app, args); break;
      case 'asset:import':    await cmdAssetImport(app, args); break;
      case 'asset:test':       await cmdAssetTest(app, args); break;
      case 'asset:promote':    await cmdAssetPromote(app, args); break;
      case 'asset:demote':     await cmdAssetDemote(app, args); break;
      case 'model:list':       await cmdModelList(args); break;
      case 'seq:list':         await cmdSeqList(app); break;
      case 'seq:show':         await cmdSeqShow(app, args); break;
      case 'seq:insert':       await cmdSeqInsert(app, args); break;
      case 'seq:replace':      await cmdSeqReplace(app, args); break;
      case 'seq:rename':       await cmdSeqRename(app, args); break;
      case 'seq:set-auto-star': await cmdSeqSetAutoStar(app, args); break;
      case 'scene:coverage':   await cmdSceneCoverage(app, args); break;
      case 'vid:run':          await cmdVidRun(app, args); break;
      case 'vid:extract-frame': await cmdVidExtractFrame(app, args); break;
      case 'doctor':           await cmdDoctor(app); break;
      default:
        console.error(`Unknown command: ${cmd}\n`);
        printHelp();
        process.exitCode = 1;
    }
  } finally {
    await app.close();
  }
}

function printHelp(): void {
  console.log(`gallery CLI

Commands:
  seed:list                                List all seeds
  seed:show <id>                           Print one seed as JSON
  seed:run <id> [--dry-run] [--variations N] [--replace] [--model NAME] [--verbose]
  gen:log [--kind X] [--status X] [--scene X] [--seed X] [--limit N]
  gen:show <logId>                         Print a log row as JSON
  gen:replay <logId> [--variations N] [--model NAME] [--verbose]
  asset:test <assetId> [--verbose]         AI-grade an asset against the 4eye spec
  model:list [--kind image|text|video] [--refresh] [--filter SUBSTR]

Sequence:
  seq:list
  seq:show <slug|id>
  seq:insert <slug> <assetId> [--at N]
  seq:replace <slug> <oldId> <newId>
  seq:rename <oldSlug> <newSlug> [--name "New Name"]
  seq:set-auto-star <slug> --on|--off
  scene:coverage <slug>

Asset:
  asset:import <path> [--to <folder>] [--star] [--scene-code CODE] [--title "..."]
  asset:promote <id> --to <folder> [--star] [--scene-code CODE]
  asset:demote  <id> --to <folder> [--unstar]

Video:
  vid:run --seed <id> | --start <assetId> --prompt "..." [--duration N]
          [--provider veo|runway|fake] [--model NAME] [--dry-run]
  vid:extract-frame --video <assetId> [--at last|first|<N>]

Health:
  doctor
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
