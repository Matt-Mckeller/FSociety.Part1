
webkitSpeechRecognition -> doesnt work in firefox, but can record mic

## Real-World Testing Notes

**Recording Modes:**
- Browser supports two distinct recording modes:
  - **Noise suppression mode**: Optimized for laptop owner's voice
  - **Non-suppressed mode**: Captures environmental audio better
- Potential to record both streams simultaneously for comparison

**Transcription Quality Findings:**
- **Whisper (OpenAI hosted)**: Accurately transcribes human-audible speech
- **Whisper (local)**: Currently testing - performance/quality TBD
- **Transformers.js**: Testing feasibility for production use
- **Web Speech API**: Only works reliably in Chrome

**Audio Format Quality Hierarchy:**
1. **WAV** - Highest quality
2. **MP4** - Better than WebM
3. **WebM** - Lower quality

**Local Transcription Concerns:**
- Compute power requirements may be prohibitive for Whisper locally
- Need to validate if client-side processing is practical
- May need fallback to cloud APIs for production




3. Speaker Identification (Diarization)
- Not returned from browser or whisper, is a separate tool ?


Use Transformers.js if:
✅ You want easiest integration (just npm install)
✅ You don't need word-level timestamps
✅ You don't need confidence scores
✅ You want fastest time-to-MVP

Use Whisper.cpp WASM if:
✅ You need word-level timestamps
✅ You need confidence scores per word/segment
✅ You need language detection
✅ You want to detect poor audio quality automatically
✅ You want faster processing (2-3x speed)
✅ You're okay with more complex setup


# Whisper Via Transformers.js
- Works best
- May not work directly on native mobile, may need webview

```typescript
import { pipeline } from '@xenova/transformers';

const transcriber = await pipeline(
  'automatic-speech-recognition',
  'Xenova/whisper-base.en'
);

const result = await transcriber(audioBlob);

// Result structure:
interface WhisperTransformersJsResult {
  text: string;              // Full transcript
  chunks: ChunkTimestamp[];  // Time-segmented transcript
}

interface ChunkTimestamp {
  text: string;      // Text for this chunk
  timestamp: [number, number | null];  // [start, end] in seconds
}

// Input: 3-minute classroom audio about fractions

const result = await transcriber(audioBlob);

console.log(result);
// Output:
{
  text: "Alright class, today we're going to learn about fractions. Who can tell me what a fraction is? It's like when you cut something into pieces? Yes, exactly. A fraction shows us parts of a whole.",
  
  chunks: [
    {
      text: " Alright class, today we're going to learn about fractions.",
      timestamp: [0, 4.5]
    },
    {
      text: " Who can tell me what a fraction is?",
      timestamp: [4.5, 7.2]
    },
    {
      text: " It's like when you cut something into pieces?",
      timestamp: [7.2, 10.8]
    },
    {
      text: " Yes, exactly.",
      timestamp: [10.8, 12.1]
    },
    {
      text: " A fraction shows us parts of a whole.",
      timestamp: [12.1, 15.6]
    }
  ]
}
```



# Enhancements
| Feature | Available in Transformers.js? | How to Get It |
|---------|-------------------------------|---------------|
| Confidence scores | ❌ No | • Use whisper.cpp<br>• Estimate from text patterns<br>• Use cloud API |
| Speaker identification | ❌ No | • Pyannote (backend)<br>• AssemblyAI API<br>• Azure Speech API |
| Language detection | ❌ No | • Use franc library on transcript<br>• Use multilingual Whisper (whisper.cpp)<br>• Use cloud API |
| Audio quality metrics | ❌ No | • Calculate from raw audio (Web Audio API)<br>• Analyze before transcription |

```typescript
// ============================================================================
// COMPLETE PIPELINE: Whisper + Quality + Diarization
// ============================================================================

interface EnrichedTranscriptionResult {
  // From Transformers.js Whisper
  text: string;
  chunks: Array<{
    text: string;
    timestamp: [number, number | null];
    
    // Added by you:
    estimatedConfidence?: number;  // Hacky, but better than nothing
    speaker?: string;              // From Pyannote/AssemblyAI
  }>;
  
  // Audio quality (calculated)
  audioQuality: {
    averageLevel: number;
    clippingDetected: boolean;
    noiseLevel: 'low' | 'medium' | 'high';
    snr: number;
    estimatedQuality: 'poor' | 'fair' | 'good' | 'excellent';
  };
  
  // Language detection (from franc or cloud API)
  language?: string;
  languageProb?: number;
}

async function enrichedTranscription(
  audioBlob: Blob,
  options: { includeSpeakers?: boolean } = {}
): Promise<EnrichedTranscriptionResult> {
  
  // Step 1: Analyze audio quality
  const quality = await analyzeAudioQuality(audioBlob);
  
  // Step 2: Transcribe with Whisper
  const transcriber = await pipeline(
    'automatic-speech-recognition',
    'Xenova/whisper-base.en'
  );
  const whisperResult = await transcriber(audioBlob);
  
  // Step 3: Estimate confidence (hacky)
  const chunksWithConfidence = whisperResult.chunks.map(chunk => ({
    ...chunk,
    estimatedConfidence: estimateConfidence(chunk.text)
  }));
  
  // Step 4: Add speakers (optional, requires backend)
  let finalChunks = chunksWithConfidence;
  if (options.includeSpeakers) {
    const speakers = await diarize(audioBlob); // Backend call
    finalChunks = matchSpeakersToChunks(chunksWithConfidence, speakers);
  }
  
  // Step 5: Detect language (from transcript)
  const language = franc(whisperResult.text);
  
  return {
    text: whisperResult.text,
    chunks: finalChunks,
    audioQuality: quality,
    language: language === 'und' ? 'en' : language,
    languageProb: 0.85 // franc doesn't provide this
  };
}

// Usage:
const result = await enrichedTranscription(audioBlob, {
  includeSpeakers: true // Set false for MVP
});

console.log(result);
// {
//   text: "Full transcript...",
//   chunks: [
//     {
//       text: "Hello class",
//       timestamp: [0, 2.5],
//       estimatedConfidence: 0.9,
//       speaker: "SPEAKER_00"
//     }
//   ],
//   audioQuality: { estimatedQuality: 'good', ... },
//   language: 'eng',
//   languageProb: 0.85
// }

```