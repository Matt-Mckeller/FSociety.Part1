import { Injectable, Logger } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { GoogleGenAI } from '@google/genai';
import { loadConfig } from '../config/config.service.js';
import { LibraryService } from '../library/library.service.js';

// ── Result types ────────────────────────────────────────────────────────────

export type TestResult = 'pass' | 'fail' | 'unclear';

export interface CriterionResult {
  id: string;
  description: string;
  result: TestResult;
  note: string;
}

export interface AssetTestReport {
  assetId: string;
  filename: string;
  overall: TestResult;
  summary: string;
  criteria: CriterionResult[];
}

// ── 4eye spec criteria ───────────────────────────────────────────────────────

const CRITERIA_SPEC = [
  { id: 'spherical_body',   description: 'Body is spherical/rounded, not humanoid or flat' },
  { id: 'cyan_eye',         description: 'Single large glowing cyan/blue eye clearly visible' },
  { id: 'visor',            description: 'Horizontal visor or strap across the eye present' },
  { id: 'antenna',          description: 'Small dorsal antenna visible on top of the body' },
  { id: 'no_humans',        description: 'No human or humanoid characters present' },
  { id: 'no_text',          description: 'No text, labels, callouts, or storyboard annotations' },
  { id: 'neutral_bg',       description: 'Background is plain neutral/gray — no scene, environment, or props' },
  { id: 'multiple_poses',   description: 'At least two distinct poses or views of the character shown' },
  { id: 'no_panel_borders', description: 'No storyboard panel borders, panel numbers, or composite grid labels' },
] as const;

const VALIDATION_PROMPT = `You are a quality-control agent for an animated character design pipeline.

The character you are evaluating is "4eye":
- A small, friendly spherical/rounded mascot robot or drone
- Has ONE single large glowing cyan/blue eye
- Has a horizontal visor or strap across that eye
- Has a small dorsal antenna on top of the body
- Has a smooth matte body with subtle cyan rim/glow
- Floats/hovers — no legs, minimal or no arms
- Is NOT humanoid, NOT an anime human, NOT a teacher or student

Evaluate the provided image against the following criteria and respond with ONLY valid JSON.
No markdown fences, no explanation outside the JSON object.

Respond with exactly this shape:
{
  "overall": "pass" | "fail",
  "summary": "one sentence overall assessment",
  "criteria": [
    {
      "id": "<criterion id>",
      "description": "<criterion description>",
      "result": "pass" | "fail" | "unclear",
      "note": "brief observation"
    }
  ]
}

Overall is "pass" only if EVERY criterion result is "pass" or "unclear" AND at least spherical_body, cyan_eye, and no_humans are "pass".
Overall is "fail" if any required criterion (spherical_body, cyan_eye, no_humans, no_text) is "fail".

Criteria to evaluate:
${CRITERIA_SPEC.map((c) => `- id="${c.id}": ${c.description}`).join('\n')}
`;

// ── Service ──────────────────────────────────────────────────────────────────

@Injectable()
export class ValidateService {
  private readonly log = new Logger(ValidateService.name);
  private client: GoogleGenAI | null = null;

  constructor(private readonly library: LibraryService) {}

  private get ai(): GoogleGenAI {
    if (this.client) return this.client;
    const cfg = loadConfig();
    if (!cfg.google.apiKey) throw new Error('GOOGLE_API_KEY is not set');
    this.client = new GoogleGenAI({ apiKey: cfg.google.apiKey });
    return this.client;
  }

  async testAsset(assetId: string): Promise<AssetTestReport> {
    const cfg = loadConfig();
    const asset = await this.library.getAsset(assetId);
    const absPath = join(cfg.galleryRoot, asset.file.folder, asset.file.filename);

    this.log.log(`Validating asset ${assetId} (${asset.file.filename})`);

    const bytes = await readFile(absPath);
    const base64 = bytes.toString('base64');

    // The image-generation model also supports text-only output when responseModalities is ['TEXT'].
    // Use the same model family so the key/API version always matches.
    const textModel = process.env.GEMINI_TEXT_MODEL ?? cfg.google.imageModel;

    const response = await this.ai.models.generateContent({
      model: textModel,
      contents: [
        {
          role: 'user',
          parts: [
            { text: VALIDATION_PROMPT },
            { inlineData: { mimeType: asset.file.mimeType, data: base64 } },
          ],
        },
      ],
      config: { responseModalities: ['TEXT'] },
    } as never);

    const text = response.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? '')
      .join('')
      .trim() ?? '';

    if (!text) throw new Error('Gemini returned no text for validation');

    // Strip any accidental markdown fences
    const jsonText = text.replace(/^```[a-z]*\n?/i, '').replace(/\n?```$/i, '').trim();

    let parsed: { overall: string; summary: string; criteria: CriterionResult[] };
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      throw new Error(`Gemini returned non-JSON: ${text.slice(0, 200)}`);
    }

    return {
      assetId,
      filename: asset.file.filename,
      overall: (parsed.overall as TestResult) ?? 'unclear',
      summary: parsed.summary ?? '',
      criteria: parsed.criteria ?? [],
    };
  }
}
