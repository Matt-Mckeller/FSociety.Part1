/**
 * Sample Data for Speech Recognition and Transformers.js
 * 
 * This file contains realistic examples of:
 * 1. Web Speech Recognition API results
 * 2. Transformers.js ASR (Automatic Speech Recognition) outputs
 */

// ============================================================================
// WEB SPEECH RECOGNITION API EXAMPLES
// ============================================================================

/**
 * Web Speech Recognition returns SpeechRecognitionResult objects
 * Each result contains alternatives with transcript and confidence scores
 */

// Example 1: Simple clear speech - "Hello, how are you today?"
const webSpeechExample1 = {
  isFinal: true,
  length: 1,
  results: [
    {
      isFinal: true,
      length: 3, // number of alternatives
      // Best match (highest confidence)
      0: {
        transcript: "hello how are you today",
        confidence: 0.9234567
      },
      // Alternative interpretations
      1: {
        transcript: "hello how are you to day",
        confidence: 0.7823456
      },
      2: {
        transcript: "hello how are you today",
        confidence: 0.6234567
      }
    }
  ],
  resultIndex: 0,
  timestamp: Date.now()
};

// Example 2: Command with background noise - "Set a timer for 5 minutes"
const webSpeechExample2 = {
  isFinal: true,
  length: 1,
  results: [
    {
      isFinal: true,
      length: 4,
      0: {
        transcript: "set a timer for 5 minutes",
        confidence: 0.8567234
      },
      1: {
        transcript: "set a timer for five minutes",
        confidence: 0.8123456
      },
      2: {
        transcript: "set timer for 5 minutes",
        confidence: 0.7456789
      },
      3: {
        transcript: "said a timer for 5 minutes",
        confidence: 0.6234567
      }
    }
  ],
  resultIndex: 0,
  timestamp: Date.now()
};

// Example 3: Longer sentence with pauses - "I need to schedule a meeting with the team for next Tuesday at 3 PM"
const webSpeechExample3 = {
  isFinal: true,
  length: 1,
  results: [
    {
      isFinal: true,
      length: 3,
      0: {
        transcript: "I need to schedule a meeting with the team for next Tuesday at 3 p.m.",
        confidence: 0.8912345
      },
      1: {
        transcript: "I need to schedule a meeting with the team for next Tuesday at 3pm",
        confidence: 0.8445678
      },
      2: {
        transcript: "I need to schedule a meeting with the team for next Tuesday at three PM",
        confidence: 0.7823456
      }
    }
  ],
  resultIndex: 0,
  timestamp: Date.now()
};

// Example 4: Interim result (while still speaking)
const webSpeechInterimExample = {
  isFinal: false, // Still processing
  length: 1,
  results: [
    {
      isFinal: false,
      length: 1,
      0: {
        transcript: "can you help me find",
        confidence: 0.0 // Interim results have 0 confidence
      }
    }
  ],
  resultIndex: 0,
  timestamp: Date.now()
};

/**
 * TypeScript Interface for Web Speech Recognition
 * (Simplified for clarity)
 */
interface WebSpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  results: Array<{
    isFinal: boolean;
    length: number;
    [index: number]: {
      transcript: string;
      confidence: number; // 0-1, where 1 is highest confidence
    };
  }>;
  resultIndex: number;
  timestamp: number;
}

// ============================================================================
// TRANSFORMERS.JS ASR EXAMPLES
// ============================================================================

/**
 * Transformers.js Whisper Model Output
 * These are examples from using @xenova/transformers for speech recognition
 */

// Example 1: Simple transcription using Whisper tiny model
const transformersExample1 = {
  text: "Hello, how are you today?",
  chunks: [
    {
      timestamp: [0, 2.5],
      text: "Hello, how are you today?"
    }
  ]
};

// Example 2: Longer transcription with multiple chunks and timestamps
const transformersExample2 = {
  text: "I need to schedule a meeting with the team for next Tuesday at 3 PM. Can you check everyone's availability?",
  chunks: [
    {
      timestamp: [0, 4.2],
      text: " I need to schedule a meeting with the team for next Tuesday at 3 PM."
    },
    {
      timestamp: [4.2, 6.8],
      text: " Can you check everyone's availability?"
    }
  ]
};

// Example 3: Technical content with multiple speakers (longer form)
const transformersExample3 = {
  text: "In today's meeting, we discussed the new API endpoints. The authentication flow needs to be updated. Sarah mentioned that the response time is around 200 milliseconds, which is acceptable for our use case.",
  chunks: [
    {
      timestamp: [0, 3.5],
      text: " In today's meeting, we discussed the new API endpoints."
    },
    {
      timestamp: [3.5, 6.2],
      text: " The authentication flow needs to be updated."
    },
    {
      timestamp: [6.2, 11.8],
      text: " Sarah mentioned that the response time is around 200 milliseconds, which is acceptable for our use case."
    }
  ]
};

// Example 4: Whisper with return_timestamps="word" for word-level timestamps
const transformersWordLevelExample = {
  text: "Set a timer for five minutes",
  chunks: [
    {
      timestamp: [0, 0.5],
      text: " Set"
    },
    {
      timestamp: [0.5, 0.7],
      text: " a"
    },
    {
      timestamp: [0.7, 1.2],
      text: " timer"
    },
    {
      timestamp: [1.2, 1.5],
      text: " for"
    },
    {
      timestamp: [1.5, 1.9],
      text: " five"
    },
    {
      timestamp: [1.9, 2.5],
      text: " minutes"
    }
  ]
};

/**
 * TypeScript Interfaces for Transformers.js
 */
interface TransformersASROutput {
  text: string; // Full transcription
  chunks: TranscriptionChunk[];
}

interface TranscriptionChunk {
  timestamp: [number, number]; // [start_time, end_time] in seconds
  text: string;
}

/**
 * Transformers.js Pipeline Configuration Example
 */
interface TransformersASRConfig {
  model: string; // e.g., "Xenova/whisper-tiny.en", "Xenova/whisper-base"
  language?: string; // e.g., "en", "es", "fr"
  task?: "transcribe" | "translate"; // translate converts to English
  chunk_length_s?: number; // For long audio, chunk size in seconds (default: 30)
  stride_length_s?: number; // Overlap between chunks (default: 5)
  return_timestamps?: boolean | "word"; // true = sentence level, "word" = word level
}

// Example configuration for using Transformers.js
const transformersConfigExample: TransformersASRConfig = {
  model: "Xenova/whisper-tiny.en",
  language: "en",
  task: "transcribe",
  chunk_length_s: 30,
  stride_length_s: 5,
  return_timestamps: true
};

// ============================================================================
// COMPARISON: Web Speech API vs Transformers.js
// ============================================================================

/**
 * KEY DIFFERENCES:
 * 
 * Web Speech Recognition API:
 * - Browser-based, uses cloud services (Google, etc.)
 * - Real-time streaming results
 * - Provides multiple alternatives with confidence scores
 * - Returns interim (partial) results while speaking
 * - Requires internet connection
 * - No control over model or processing
 * 
 * Transformers.js (Whisper):
 * - Runs locally in browser with WASM
 * - Processes audio file or buffer (not streaming)
 * - Single best transcription (no alternatives)
 * - Provides timestamp information
 * - Works offline after model download
 * - More accurate for technical/specialized content
 * - Slower processing (batch vs real-time)
 */

// ============================================================================
// PRACTICAL USAGE EXAMPLES
// ============================================================================

/**
 * Example: Processing Web Speech Recognition Result
 */
function processWebSpeechResult(event: any) {
  const result = event.results[event.resultIndex];
  const transcript = result[0].transcript;
  const confidence = result[0].confidence;
  const isFinal = result.isFinal;
  
  console.log(`Transcript: ${transcript}`);
  console.log(`Confidence: ${(confidence * 100).toFixed(2)}%`);
  console.log(`Is Final: ${isFinal}`);
  
  // Get alternatives if available
  if (result.length > 1) {
    console.log('Alternatives:');
    for (let i = 1; i < result.length; i++) {
      console.log(`  ${i}. ${result[i].transcript} (${(result[i].confidence * 100).toFixed(2)}%)`);
    }
  }
  
  return {
    transcript,
    confidence,
    isFinal,
    alternatives: Array.from({ length: result.length - 1 }, (_, i) => ({
      transcript: result[i + 1].transcript,
      confidence: result[i + 1].confidence
    }))
  };
}

/**
 * Example: Processing Transformers.js Result
 */
function processTransformersResult(output: TransformersASROutput) {
  console.log(`Full Transcript: ${output.text}`);
  console.log(`Number of chunks: ${output.chunks.length}`);
  
  output.chunks.forEach((chunk, index) => {
    const [start, end] = chunk.timestamp;
    console.log(`Chunk ${index + 1}: [${start.toFixed(2)}s - ${end.toFixed(2)}s] "${chunk.text}"`);
  });
  
  return {
    fullText: output.text,
    duration: output.chunks[output.chunks.length - 1]?.timestamp[1] || 0,
    segments: output.chunks.map(chunk => ({
      text: chunk.text.trim(),
      startTime: chunk.timestamp[0],
      endTime: chunk.timestamp[1],
      duration: chunk.timestamp[1] - chunk.timestamp[0]
    }))
  };
}

// ============================================================================
// REAL-WORLD USE CASES
// ============================================================================

/**
 * Use Case 1: Voice Commands (prefer Web Speech API)
 * - Need real-time response
 * - Short utterances
 * - Multiple alternatives useful for intent matching
 */
const voiceCommandExample = {
  input: "Turn on the lights in the living room",
  webSpeechOutput: {
    isFinal: true,
    results: [{
      isFinal: true,
      length: 2,
      0: {
        transcript: "turn on the lights in the living room",
        confidence: 0.92
      },
      1: {
        transcript: "turn on the lights in the living room", 
        confidence: 0.88
      }
    }]
  }
};

/**
 * Use Case 2: Meeting Transcription (prefer Transformers.js)
 * - Longer audio files
 * - Need timestamps for editing
 * - Accuracy over speed
 * - Offline capability
 */
const meetingTranscriptionExample = {
  input: "30-minute audio file",
  transformersOutput: {
    text: "Welcome everyone to today's standup meeting. Let's go around and share what we worked on yesterday. John, would you like to start? Sure, I completed the authentication module and started working on the dashboard. Great, thanks John. Sarah, how about you?",
    chunks: [
      {
        timestamp: [0, 4.2],
        text: " Welcome everyone to today's standup meeting."
      },
      {
        timestamp: [4.2, 7.8],
        text: " Let's go around and share what we worked on yesterday."
      },
      {
        timestamp: [7.8, 9.5],
        text: " John, would you like to start?"
      },
      {
        timestamp: [9.5, 16.2],
        text: " Sure, I completed the authentication module and started working on the dashboard."
      },
      {
        timestamp: [16.2, 18.5],
        text: " Great, thanks John. Sarah, how about you?"
      }
    ]
  }
};

// Export all examples and utilities
export {
  // Web Speech Recognition Examples
  webSpeechExample1,
  webSpeechExample2,
  webSpeechExample3,
  webSpeechInterimExample,
  
  // Transformers.js Examples
  transformersExample1,
  transformersExample2,
  transformersExample3,
  transformersWordLevelExample,
  transformersConfigExample,
  
  // Processing Functions
  processWebSpeechResult,
  processTransformersResult,
  
  // Use Case Examples
  voiceCommandExample,
  meetingTranscriptionExample,
};

// Grouped exports for convenience
export const webSpeechExamples = [
  webSpeechExample1,
  webSpeechExample2,
  webSpeechExample3,
  webSpeechInterimExample
];

export const transformersExamples = [
  transformersExample1,
  transformersExample2,
  transformersExample3,
  transformersWordLevelExample
];

// Export types
export type {
  WebSpeechRecognitionResult,
  TransformersASROutput,
  TranscriptionChunk,
  TransformersASRConfig
};
