#!/usr/bin/env node
/**
 * Whisper API Transcription - Node.js Version
 * Transcribes WebM audio files using OpenAI's Whisper API
 */

import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Initialize OpenAI client
const apiKey = process.env.OPENAI_API_KEY || "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";

if (!apiKey) {
    console.error("❌ Error: OPENAI_API_KEY environment variable not set");
    console.log("\n💡 To set it, run:");
    console.log('   export OPENAI_API_KEY="your-api-key-here"');
    console.log("\nOr get an API key from: https://platform.openai.com/api-keys");
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

// Path to the audio file (can be passed as argument or hardcoded)
// const audioFilePath = process.argv[2] || "test-app-noisy/ambient-recording-1761500780135.webm";
// const audioFilePath = process.argv[2] || "test-app-noisy/recording-3-no-suppression.webm";
const audioFilePath = process.argv[2] || "test-app-noisy/recording-4-ambient.webm";

async function transcribeAudio(filePath) {
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`Audio file not found at: ${filePath}`);
        }

        const stats = fs.statSync(filePath);
        const fileSizeKB = (stats.size / 1024).toFixed(2);

        console.log(`🎵 Testing Whisper transcription on: ${filePath}`);
        console.log(`📊 File size: ${fileSizeKB} KB`);
        console.log("\n" + "=".repeat(60));

        console.log("\n🔄 Sending to OpenAI Whisper API...");

        // Create a read stream and transcribe
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
            response_format: "verbose_json",
            language: "en" // Optional: specify language for better accuracy
        });

        console.log("\n✅ Transcription successful!");
        console.log("=".repeat(60));
        console.log("\n📝 TRANSCRIBED TEXT:");
        console.log("-".repeat(60));
        console.log(transcription.text);
        console.log("-".repeat(60));

        console.log("\n📊 ADDITIONAL INFO:");
        console.log(`Language: ${transcription.language}`);
        console.log(`Duration: ${transcription.duration} seconds`);

        if (transcription.segments && transcription.segments.length > 0) {
            console.log(`\nNumber of segments: ${transcription.segments.length}`);
            console.log("\n🎯 SEGMENTS:");
            
            transcription.segments.forEach((segment, index) => {
                console.log(`\nSegment ${index + 1}:`);
                console.log(`  Time: ${segment.start.toFixed(2)}s - ${segment.end.toFixed(2)}s`);
                console.log(`  Text: ${segment.text}`);
                if (segment.avg_logprob) {
                    console.log(`  Confidence: ${(Math.exp(segment.avg_logprob) * 100).toFixed(1)}%`);
                }
            });
        }

        // Save transcription to file
        const outputPath = filePath.replace(/\.(webm|mp3|wav|m4a)$/, '_transcription.txt');
        fs.writeFileSync(outputPath, transcription.text);
        console.log(`\n💾 Transcription saved to: ${outputPath}`);

        // Save full JSON response
        const jsonOutputPath = filePath.replace(/\.(webm|mp3|wav|m4a)$/, '_transcription.json');
        fs.writeFileSync(jsonOutputPath, JSON.stringify(transcription, null, 2));
        console.log(`📄 Full JSON saved to: ${jsonOutputPath}`);

        return transcription;

    } catch (error) {
        console.error("\n❌ Error occurred:");
        console.error(`Type: ${error.constructor.name}`);
        console.error(`Message: ${error.message}`);
        
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error(`Data:`, error.response.data);
        }
        
        process.exit(1);
    }
}

// Run the transcription
console.log("🚀 Starting Whisper Transcription Service\n");
transcribeAudio(audioFilePath);
