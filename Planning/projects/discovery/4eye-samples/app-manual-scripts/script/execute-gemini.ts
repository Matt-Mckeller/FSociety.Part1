#!/usr/bin/env tsx
/**
 * Execute educational content analysis using Google Gemini
 * 
 * This script runs classroom transcription samples through Google's Gemini model
 * using either the minimal or extra output prompts.
 * 
 * Usage:
 *   tsx script/execute-gemini.ts --prompt minimal
 *   tsx script/execute-gemini.ts --prompt extra --samples goodQuality --index 0
 */

import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { v1MinimalPrompt, v1ExtraPrompt } from '../prompts/v1_minimal.js';
import {
  loadSamples,
  formatInputForPrompt,
  saveResult,
  parseArgs,
  printUsage,
  validateResponse,
  printResultSummary,
  type ClassroomDialogSample,
  type SampleCategory,
  type PromptVersion,
} from './utils.js';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

/**
 * Execute Gemini API call with the given prompt and input
 */
async function executeGemini(
  prompt: string,
  input: string,
  modelName: string = 'gemini-2.5-pro'
): Promise<{
  response: any;
  metadata: {
    model: string;
    timestamp: string;
    latencyMs: number;
    tokenUsage?: {
      input?: number;
      output?: number;
      total?: number;
    };
  };
}> {
  const startTime = Date.now();

  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.5,
      maxOutputTokens: 64000,
      responseMimeType: 'application/json',
    },
  });

  const fullPrompt = `${prompt}\n\n---\n\n${input}\n\nPlease provide your response as valid JSON matching the specified interface.`;

  const result = await model.generateContent(fullPrompt);
  const response = result.response;

  const endTime = Date.now();
  const latencyMs = endTime - startTime;

  const responseText = response.text();
  if (!responseText) {
    throw new Error('No response text from Gemini');
  }

  let parsedResponse;
  try {
    parsedResponse = JSON.parse(responseText);
  } catch (error) {
    // Try extracting from markdown code block
    const jsonMatch = responseText.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      try {
        parsedResponse = JSON.parse(jsonMatch[1]!);
      } catch (e) {
        console.error('Failed to parse JSON from code block:', jsonMatch[1]);
        throw e;
      }
    } else {
      console.error('Failed to parse Gemini response as JSON:', responseText);
      throw error;
    }
  }

  // Extract token usage if available
  const usageMetadata = response.usageMetadata;

  return {
    response: parsedResponse,
    metadata: {
      model: modelName,
      timestamp: new Date().toISOString(),
      latencyMs,
      ...(usageMetadata && {
        tokenUsage: {
          input: usageMetadata.promptTokenCount || 0,
          output: usageMetadata.candidatesTokenCount || 0,
          total: usageMetadata.totalTokenCount || 0,
        },
      }),
    },
  };
}

/**
 * Process a single sample
 */
async function processSample(
  sample: ClassroomDialogSample,
  promptVersion: PromptVersion,
  category: SampleCategory,
  index: number,
  model?: string
): Promise<void> {
  console.log(`\nProcessing ${category}[${index}]: ${sample.subject} - ${sample.gradeLevel}`);
  console.log(`Using prompt version: ${promptVersion}`);

  const prompt = promptVersion === 'minimal' ? v1MinimalPrompt : v1ExtraPrompt;
  const input = formatInputForPrompt(sample);

  try {
    const { response, metadata } = await executeGemini(prompt, input, model);

    // Validate response
    if (!validateResponse(response, promptVersion)) {
      console.error('⚠️  Response validation failed, but saving anyway...');
    }

    // Save result
    const filepath = saveResult('gemini', promptVersion, category, index, {
      sample,
      response,
      metadata,
    });

    console.log(`✅ Saved result to: ${filepath}`);

    // Print summary
    printResultSummary(sample, response, metadata);
  } catch (error) {
    console.error(`❌ Error processing sample:`, error);
    throw error;
  }
}

/**
 * Main execution function
 */
async function main() {
  const args = parseArgs();

  // Check for API key
  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ Error: GOOGLE_API_KEY environment variable not set');
    console.error('Please create a .env file with your Google API key:');
    console.error('  GOOGLE_API_KEY=...');
    process.exit(1);
  }

  console.log('🚀 Google Gemini Execution Script');
  console.log(`Model: ${args.model || 'gemini-2.5-pro'}`);
  console.log(`Prompt: ${args.promptVersion}`);

  // Load samples
  const allSamples = await loadSamples();

  // Determine which samples to process
  let samplesToProcess: Array<{
    sample: ClassroomDialogSample;
    category: SampleCategory;
    index: number;
  }> = [];

  if (args.category) {
    // Process specific category
    const categoryName = args.category;
    const samples = allSamples[categoryName];

    if (args.index !== undefined) {
      // Process specific index
      if (args.index < 0 || args.index >= samples.length) {
        console.error(`❌ Error: Index ${args.index} out of range for category ${categoryName}`);
        console.error(`Available indices: 0-${samples.length - 1}`);
        process.exit(1);
      }
      samplesToProcess.push({
        sample: samples[args.index]!,
        category: categoryName,
        index: args.index,
      });
    } else {
      // Process all samples in category
      samples.forEach((sample, idx) => {
        samplesToProcess.push({
          sample,
          category: categoryName,
          index: idx,
        });
      });
    }
  } else {
    // Process all samples from all categories
    (Object.keys(allSamples) as SampleCategory[]).forEach((category) => {
      allSamples[category].forEach((sample, idx) => {
        samplesToProcess.push({
          sample,
          category,
          index: idx,
        });
      });
    });
  }

  console.log(`\n📊 Processing ${samplesToProcess.length} sample(s)...\n`);

  // Process each sample sequentially to avoid rate limits
  for (const { sample, category, index } of samplesToProcess) {
    await processSample(sample, args.promptVersion, category, index, args.model);

    // Small delay between requests to be respectful of rate limits
    if (samplesToProcess.length > 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log('\n✅ All samples processed successfully!');
}

// Run main function
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
