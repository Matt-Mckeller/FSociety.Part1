/**
 * Shared utilities for AI model execution scripts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import type { MinimalDialogInput } from "../types/inputs.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type ClassroomDialogSample = {
  subject: string;
  gradeLevel: string;
  qualityScore: number;
  description: string;
  durationSeconds: number;
  dialog: MinimalDialogInput;
};

export type SampleCategory =
  | "goodQuality"
  | "noisyEnvironment"
  | "overlappingSpeech"
  | "unfinishedSpeech"
  | "poorQualityTeaching"
  | "edgeCases_PII"
  | "edgeCase_SensitiveTopics"
  | "edgeCase_SexualContent"
  | "edgeCase_WatchingMovie"
  | "edgeCase_SideConversations";
export type PromptVersion = "minimal" | "extra";

/**
 * Load all sample data from seed-data/v1/v1.ts
 */
export async function loadSamples() {
  const samplesModule = await import("../seed-data/v1/v1.js");
  const all = true;
  const allowClassTypeMetadata = false;
  const allowGradeLevelMetadata = false;
  const allowQualityScoreMetadata = false;

  if (!all) {
    return {
      // goodQuality: samplesModule.goodQualitySamples.slice(1) as ClassroomDialogSample[],
      // noisyEnvironment:
      //   samplesModule.noisyEnvironmentSamples as ClassroomDialogSample[],
      // overlappingSpeech:
      //   samplesModule.overlappingSpeechSamples as ClassroomDialogSample[],
      // unfinishedSpeech:
      //   samplesModule.unfinishedSpeechSamples as ClassroomDialogSample[],
      // poorQualityTeaching:
      //   samplesModule.poorQualityTeachingSamples as ClassroomDialogSample[],
      // edgeCases_PII:
      //   samplesModule.edgeCases_PII as ClassroomDialogSample[],
      // edgeCase_SensitiveTopics:
      //   samplesModule.edgeCase_SensitiveTopics as ClassroomDialogSample[],
      // edgeCase_SexualContent:
      //   samplesModule.edgeCase_SexualContent as ClassroomDialogSample[],
      // edgeCase_WatchingMovie:
      //   samplesModule.edgeCase_WatchingMovie as ClassroomDialogSample[],
      // edgeCase_SideConversations:
      //   samplesModule.edgeCase_SideConversations as ClassroomDialogSample[],
    };
  }

  const response = {
    goodQuality: samplesModule.goodQualitySamples as ClassroomDialogSample[],
    noisyEnvironment:
      samplesModule.noisyEnvironmentSamples as ClassroomDialogSample[],
    overlappingSpeech:
      samplesModule.overlappingSpeechSamples as ClassroomDialogSample[],
    unfinishedSpeech:
      samplesModule.unfinishedSpeechSamples as ClassroomDialogSample[],
    poorQualityTeaching:
      samplesModule.poorQualityTeachingSamples as ClassroomDialogSample[],
    edgeCases_PII:
      samplesModule.edgeCases_PII as ClassroomDialogSample[],
    edgeCase_SensitiveTopics:
      samplesModule.edgeCase_SensitiveTopics as ClassroomDialogSample[],
    edgeCase_SexualContent:
      samplesModule.edgeCase_SexualContent as ClassroomDialogSample[],
    edgeCase_WatchingMovie:
      samplesModule.edgeCase_WatchingMovie as ClassroomDialogSample[],
    edgeCase_SideConversations:
      samplesModule.edgeCase_SideConversations as ClassroomDialogSample[],
  };

  // Remove metadata fields based on configuration
  for (const category in response) {
    const samples = response[category as keyof typeof response];
    if (Array.isArray(samples)) {
      samples.forEach((sample) => {
        // Always remove description
        delete (sample as any).description;
        
        // Conditionally remove other metadata
        if (!allowClassTypeMetadata) {
          delete (sample as any).subject;
        }
        if (!allowGradeLevelMetadata) {
          delete (sample as any).gradeLevel;
        }
        if (!allowQualityScoreMetadata) {
          delete (sample as any).qualityScore;
        }
      });
    }
  }

  return response;

}

/**
 * Format a ClassroomDialogSample into a prompt-ready string
 */
export function formatInputForPrompt(sample: ClassroomDialogSample): string {
  const transcriptionsJson = JSON.stringify(sample.dialog, null, 2);

  return `# Classroom Context
- Subject: ${sample.subject}
- Grade Level: ${sample.gradeLevel}
- Duration: ${sample.durationSeconds} seconds
- Description: ${sample.description}

# Transcription Data
${transcriptionsJson}`;
}

/**
 * Create output directory if it doesn't exist
 */
export function ensureOutputDir(provider: string): string {
  const outputDir = path.join(__dirname, "..", "output", provider);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  return outputDir;
}

/**
 * Save results to a JSON file
 */
export function saveResult(
  provider: string,
  promptVersion: PromptVersion,
  category: SampleCategory,
  index: number,
  result: {
    sample: ClassroomDialogSample;
    response: any;
    metadata: {
      model: string;
      timestamp: string;
      latencyMs?: number;
      tokenUsage?: {
        input?: number;
        output?: number;
        total?: number;
      };
    };
  }
): string {
  const outputDir = ensureOutputDir(provider);
  const filename = `${promptVersion}-${category}-${index}.json`;
  const filepath = path.join(outputDir, filename);

  fs.writeFileSync(filepath, JSON.stringify(result, null, 2));
  return filepath;
}

/**
 * Parse command line arguments
 */
export function parseArgs(): {
  promptVersion: PromptVersion;
  category?: SampleCategory;
  index?: number;
  model?: string;
} {
  const args = process.argv.slice(2);
  const result: any = {
    promptVersion: "minimal", // default
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--prompt" && args[i + 1]) {
      const version = args[i + 1];
      if (version === "minimal" || version === "extra") {
        result.promptVersion = version;
      }
      i++;
    } else if (arg === "--samples" && args[i + 1]) {
      const category = args[i + 1];
      if (
        category &&
        [
          "goodQuality",
          "noisyEnvironment",
          "overlappingSpeech",
          "unfinishedSpeech",
          "poorQualityTeaching",
          "edgeCases_PII",
          "edgeCase_SensitiveTopics",
          "edgeCase_SexualContent",
          "edgeCase_WatchingMovie",
          "edgeCase_SideConversations",
        ].includes(category)
      ) {
        result.category = category;
      }
      i++;
    } else if (arg === "--index" && args[i + 1]) {
      const indexStr = args[i + 1];
      if (indexStr) {
        result.index = parseInt(indexStr, 10);
      }
      i++;
    } else if (arg === "--model" && args[i + 1]) {
      result.model = args[i + 1];
      i++;
    }
  }

  return result;
}

/**
 * Print usage information
 */
export function printUsage(scriptName: string) {
  console.log(`
Usage: tsx script/${scriptName}.ts [options]

Options:
  --prompt <version>    Prompt version: 'minimal' or 'extra' (default: minimal)
  --samples <category>  Sample category: 'goodQuality', 'noisyEnvironment', 'overlappingSpeech', 'unfinishedSpeech',
                        'poorQualityTeaching', 'edgeCases_PII', 'edgeCase_SensitiveTopics', 'edgeCase_SexualContent', 
                        'edgeCase_WatchingMovie', 'edgeCase_SideConversations'
  --index <number>      Run specific sample by index (0-based)
  --model <name>        Override default model

Examples:
  tsx script/${scriptName}.ts --prompt minimal
  tsx script/${scriptName}.ts --prompt extra --samples goodQuality
  tsx script/${scriptName}.ts --prompt minimal --samples noisyEnvironment --index 0
  tsx script/${scriptName}.ts --prompt extra --samples poorQualityTeaching
  tsx script/${scriptName}.ts --prompt minimal --samples edgeCases_PII --index 0
  tsx script/${scriptName}.ts --prompt extra --samples edgeCase_SideConversations --index 0
  `);
}

/**
 * Validate JSON response against expected structure
 */
export function validateResponse(
  response: any,
  promptVersion: PromptVersion
): boolean {
  if (!response || typeof response !== "object") {
    console.error("Response is not an object");
    return false;
  }

  // Basic validation - check for required fields
  if (typeof response.confidence !== "number") {
    console.error("Missing or invalid confidence field");
    return false;
  }

  if (promptVersion === "minimal") {
    const requiredFields = [
      "isMainLectureContent_confidence",
      "isSideConversation_confidence",
      "isIrrelevantContent_confidence",
      "shouldSummarize",
      "oneLineSummarization",
    ];

    for (const field of requiredFields) {
      if (!(field in response)) {
        console.error(`Missing required field: ${field}`);
        return false;
      }
    }
  }

  return true;
}

/**
 * Format latency in human-readable form
 */
export function formatLatency(ms: number): string {
  if (ms < 1000) {
    return `${ms.toFixed(0)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Print result summary
 */
export function printResultSummary(
  sample: ClassroomDialogSample,
  response: any,
  metadata: any
) {
  console.log("\n" + "=".repeat(80));
  console.log(`Sample: ${sample.subject} - ${sample.gradeLevel}`);
  console.log(`Description: ${sample.description}`);
  console.log(`Quality Score: ${sample.qualityScore}/10`);
  console.log("-".repeat(80));
  console.log(`Model: ${metadata.model}`);
  console.log(
    `Latency: ${metadata.latencyMs ? formatLatency(metadata.latencyMs) : "N/A"}`
  );
  if (metadata.tokenUsage) {
    console.log(
      `Tokens: ${metadata.tokenUsage.input || 0} in / ${
        metadata.tokenUsage.output || 0
      } out`
    );
  }
  console.log("-".repeat(80));
  console.log(`Confidence: ${(response.confidence * 100).toFixed(1)}%`);
  if (response.oneLineSummarization) {
    console.log(`Summary: ${response.oneLineSummarization}`);
  }
  if (
    response.shouldSummarize === false &&
    response.shouldSummarizeFalseReason
  ) {
    console.log(`Should NOT Summarize: ${response.shouldSummarizeFalseReason}`);
  }
  console.log("=".repeat(80) + "\n");
}
