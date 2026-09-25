# AI Model Execution Scripts

This directory contains scripts to test educational content analysis prompts using OpenAI GPT-4, Anthropic Claude, and Google Gemini models.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Keys

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Then edit `.env` and add your API keys:

- **OpenAI**: Get from https://platform.openai.com/api-keys
- **Anthropic**: Get from https://console.anthropic.com/settings/keys
- **Google**: Get from https://aistudio.google.com/app/apikey

## Usage

Each script can be run with the following options:

```bash
tsx script/execute-<provider>.ts [options]
```

### Options

- `--prompt <version>` - Prompt version: `minimal` or `extra` (default: `minimal`)
- `--samples <category>` - Sample category to process:
  - `goodQuality` - Clear audio samples (3 samples)
  - `noisyEnvironment` - Samples with background noise
  - `overlappingSpeech` - Multiple speakers
  - `unfinishedSpeech` - Incomplete transcriptions
- `--index <number>` - Process a specific sample by index (0-based)
- `--model <name>` - Override the default model

### Examples

**Run OpenAI with minimal prompt on all samples:**
```bash
tsx script/execute-openai.ts --prompt minimal
```

**Run Claude with extra prompt on good quality samples:**
```bash
tsx script/execute-claude.ts --prompt extra --samples goodQuality
```

**Run Gemini on a specific sample:**
```bash
tsx script/execute-gemini.ts --prompt minimal --samples goodQuality --index 0
```

**Use a specific model:**
```bash
tsx script/execute-openai.ts --model gpt-4
```

## Output

Results are saved to the `output/` directory, organized by provider:

```
output/
├── openai/
│   ├── minimal-goodQuality-0.json
│   ├── minimal-goodQuality-1.json
│   └── ...
├── claude/
│   └── ...
└── gemini/
    └── ...
```

Each output file contains:
- The original sample data
- The AI model's response
- Metadata (model name, timestamp, latency, token usage)

## Sample Data

The scripts use classroom transcription samples from `seed-data/v1/v1.ts`:

### Good Quality Samples (3)
1. **Math - 5th Grade** - Fractions lesson (45s)
2. **History - 10th Grade** - American Revolution discussion (180s)
3. **Science - 7th Grade** - Photosynthesis explanation (25s)

### Noisy Environment Samples
Samples with background noise and lower confidence scores

### Overlapping Speech Samples
Multiple speakers talking simultaneously

### Unfinished Speech Samples
Incomplete transcriptions and partial sentences

## Prompts

Two prompt versions are available:

### v1_minimal
- Quick real-time analysis
- Essential classification and summarization
- Basic visualization suggestions
- Optimized for speed

### v1_extra
- Comprehensive educational analysis
- Multiple summarization formats
- Detailed learning modality suggestions
- Rich visualization recommendations
- Teacher insights and recommendations

## Models

### Default Models
- **OpenAI**: `gpt-4-turbo-preview`
- **Claude**: `claude-3-5-sonnet-20241022`
- **Gemini**: `gemini-1.5-pro`

You can override these with the `--model` option.

## Rate Limits

The scripts include a 1-second delay between requests to avoid hitting rate limits. When processing many samples, this may take some time.

## Troubleshooting

### API Key Errors
If you see "API key not set" errors, ensure:
1. You've created a `.env` file (not `.env.example`)
2. Your API keys are valid and have sufficient credits
3. The `.env` file is in the correct directory

### JSON Parsing Errors
Some models may wrap JSON in markdown code blocks. The scripts attempt to handle this automatically, but if you encounter parsing errors, check the output files to see the raw response.

### TypeScript Errors
Make sure you have TypeScript and required dependencies installed:
```bash
npm install
```

## Architecture

### File Structure
- `script/execute-openai.ts` - OpenAI GPT-4 execution
- `script/execute-claude.ts` - Anthropic Claude execution
- `script/execute-gemini.ts` - Google Gemini execution
- `script/utils.ts` - Shared utilities
- `prompts/v1_minimal.ts` - Minimal and extra prompts
- `seed-data/v1/v1.ts` - Sample classroom transcriptions
- `types/` - TypeScript type definitions

### Shared Utilities

The `utils.ts` file provides:
- `loadSamples()` - Load all sample data
- `formatInputForPrompt()` - Format samples for API input
- `saveResult()` - Save results to JSON
- `parseArgs()` - Command-line argument parsing
- `validateResponse()` - Basic response validation
- `printResultSummary()` - Console output formatting

## Next Steps

After running the scripts, you can:
1. Compare results across different models
2. Analyze response quality and accuracy
3. Measure latency and token usage
4. Test prompt variations
5. Build a comparison/analysis script to visualize differences
