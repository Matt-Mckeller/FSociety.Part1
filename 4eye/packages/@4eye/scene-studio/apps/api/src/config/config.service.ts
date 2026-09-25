import { config as loadDotenv } from 'dotenv';
import { resolve, join, dirname } from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';

// Walk up from cwd looking for the nearest .env (so running from apps/api or
// from the monorepo root both work).
(function bootDotenv() {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = join(dir, '.env');
    if (existsSync(candidate)) {
      loadDotenv({ path: candidate });
      return;
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  loadDotenv(); // fallback to default behaviour
})();

export interface AppConfig {
  apiPort: number;
  galleryRoot: string;
  /** Root of the marketing-video plan (parent of gallery + asset folders). Used to resolve `file:` references. */
  plansRoot: string;
  dbPath: string;
  exportPath: string;
  editsDir: string;
  videosDir: string;
  thumbsDir: string;
  generatedDir: string;
  openai: { apiKey: string; chatModel: string; imageModel: string };
  runway: { apiKey: string; videoModel: string };
  google: { apiKey: string; imageModel: string; videoModel: string };
  providers: {
    /** 'gemini' | 'openai' | 'fake' | 'auto'. 'auto' = gemini if key, else openai if key, else fake. */
    imageGenerate: 'gemini' | 'openai' | 'fake' | 'auto';
    /** 'gemini' | 'openai' | 'fake' | 'auto'. 'auto' = gemini if key, else openai if key, else fake. */
    imageEdit: 'gemini' | 'openai' | 'fake' | 'auto';
    /** 'veo' | 'runway' | 'fake' | 'auto'. 'auto' = veo if key, else runway if key, else fake. */
    animate: 'veo' | 'runway' | 'fake' | 'auto';
  };
}

let cached: AppConfig | null = null;

export function loadConfig(): AppConfig {
  if (cached) return cached;

  const galleryRoot = process.env.GALLERY_ROOT;
  if (!galleryRoot) {
    throw new Error('GALLERY_ROOT is not set. Copy .env.example to .env.');
  }
  const root = resolve(galleryRoot);
  if (!existsSync(root)) {
    throw new Error(`GALLERY_ROOT does not exist: ${root}`);
  }

  const editsDir = join(root, '06_edits');
  const videosDir = join(root, '05_videos');
  const thumbsDir = join(root, '.thumbs');
  const generatedDir = join(root, '07_generated');
  for (const d of [editsDir, videosDir, thumbsDir, generatedDir]) {
    if (!existsSync(d)) mkdirSync(d, { recursive: true });
  }

  const plansRoot = resolve(process.env.PLANS_ROOT ?? dirname(root));

  cached = {
    apiPort: Number(process.env.API_PORT ?? 4000),
    galleryRoot: root,
    plansRoot,
    dbPath: join(root, 'library.db'),
    exportPath: join(root, 'library.export.json'),
    editsDir,
    videosDir,
    thumbsDir,
    generatedDir,
    openai: {
      apiKey: process.env.OPENAI_API_KEY ?? '',
      chatModel: process.env.OPENAI_CHAT_MODEL ?? 'gpt-5.5-pro',
      imageModel: process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-2',
    },
    runway: {
      apiKey: process.env.RUNWAY_API_KEY ?? '',
      videoModel: process.env.RUNWAY_VIDEO_MODEL ?? 'gen4_turbo',
    },
    google: {
      apiKey: process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY ?? '',
      imageModel: process.env.GEMINI_IMAGE_MODEL ?? 'gemini-3.1-flash-image-preview',
      videoModel: process.env.VEO_MODEL ?? 'veo-3.1-generate-preview',
    },
    providers: {
      imageGenerate: (process.env.IMAGE_GENERATE_PROVIDER as AppConfig['providers']['imageGenerate']) ?? 'auto',
      imageEdit: (process.env.IMAGE_EDIT_PROVIDER as AppConfig['providers']['imageEdit']) ?? 'auto',
      animate: (process.env.ANIMATE_PROVIDER as AppConfig['providers']['animate']) ?? 'auto',
    },
  };
  return cached;
}
