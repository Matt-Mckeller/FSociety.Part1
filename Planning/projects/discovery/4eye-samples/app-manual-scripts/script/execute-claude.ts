#!/usr/bin/env tsx
/**
 * Execute educational content analysis using Anthropic Claude
 * 
 * This script runs classroom transcription samples through Anthropic's Claude model
 * using either the minimal or extra output prompts.
 * 
 * Usage:
 *   tsx script/execute-claude.ts --prompt minimal
 *   tsx script/execute-claude.ts --prompt extra --samples goodQuality --index 0
 */

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
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

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Execute Claude API call with the given prompt and input
 */
async function executeClaude(
  prompt: string,
  input: string,
  model: string = 'claude-3-5-sonnet'
): Promise<{
  response: any;
  metadata: {
    model: string;
    timestamp: string;
    latencyMs: number;
    tokenUsage: {
      input: number;
      output: number;
      total: number;
    };
  };
}> {
  const startTime = Date.now();

  const message = await anthropic.messages.create({
    model,
    max_tokens: 4096,
    temperature: 0.5,
    system: prompt,
    messages: [
      {
        role: 'user',
        content: input + '\n\nPlease provide your response as valid JSON matching the specified interface.',
      },
    ],
  });

  const endTime = Date.now();
  const latencyMs = endTime - startTime;

  // Extract text content from response
  const textContent = message.content.find((block) => block.type === 'text');
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text content in Claude response');
  }

  const responseText = textContent.text;

  // Try to extract JSON from response (Claude sometimes wraps it in markdown)
  let parsedResponse;
  try {
    // Try direct parse first
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
      console.error('Failed to parse Claude response as JSON:', responseText);
      throw error;
    }
  }

  return {
    response: parsedResponse,
    metadata: {
      model: message.model,
      timestamp: new Date().toISOString(),
      latencyMs,
      tokenUsage: {
        input: message.usage.input_tokens,
        output: message.usage.output_tokens,
        total: message.usage.input_tokens + message.usage.output_tokens,
      },
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
    const { response, metadata } = await executeClaude(prompt, input, model);

    // Validate response
    if (!validateResponse(response, promptVersion)) {
      console.error('⚠️  Response validation failed, but saving anyway...');
    }

    // Save result
    const filepath = saveResult('claude', promptVersion, category, index, {
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
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Error: ANTHROPIC_API_KEY environment variable not set');
    console.error('Please create a .env file with your Anthropic API key:');
    console.error('  ANTHROPIC_API_KEY=sk-ant-...');
    process.exit(1);
  }

  console.log('🚀 Anthropic Claude Execution Script');
  console.log(`Model: ${args.model || 'claude-3-5-sonnet-20241022'}`);
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
