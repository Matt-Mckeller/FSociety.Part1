#!/usr/bin/env node
/**
 * Simplified Local Whisper Transcription
 * Works with WAV files directly (no ffmpeg needed)
 * For WebM files, convert manually first with: ffmpeg -i input.webm -ar 16000 -ac 1 output.wav
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the audio file (must be WAV format)
const audioFilePath = process.argv[2] || "test-app-noisy/ambient-recording-1761500780135.wav";

async function transcribeLocally(filePath) {
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log(`\n❌ Audio file not found: ${filePath}`);
            console.log("\n💡 This script works with WAV files.");
            console.log("To convert WebM to WAV, run:");
            console.log(`   ffmpeg -i ${filePath.replace('.wav', '.webm')} -ar 16000 -ac 1 ${filePath}`);
            process.exit(1);
        }

        const stats = fs.statSync(filePath);
        const fileSizeKB = (stats.size / 1024).toFixed(2);

        console.log(`🎵 Local Whisper Transcription`);
        console.log(`📁 File: ${filePath}`);
        console.log(`📊 Size: ${fileSizeKB} KB`);
        console.log("=".repeat(60));

        // Check for model
        const modelsDir = path.join(__dirname, 'models');
        const modelPath = path.join(modelsDir, 'ggml-base.en.bin');
        
        if (!fs.existsSync(modelPath)) {
            console.log("\n❌ Model not found!");
            console.log(`Expected at: ${modelPath}`);
            console.log("\nDownload the model:");
            console.log("  curl -L -o models/ggml-base.en.bin https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin");
            process.exit(1);
        }

        console.log(`\n🔄 Transcribing with whisper.cpp...\n`);
        
        const whisper = spawn('whisper-cli', [
            '-m', modelPath,
            '-f', filePath,
            '--output-txt',
            '--output-json',
            '--print-progress'
        ]);

        whisper.stdout.on('data', (data) => {
            process.stdout.write(data.toString());
        });

        whisper.stderr.on('data', (data) => {
            process.stderr.write(data.toString());
        });

        whisper.on('close', (code) => {
            if (code === 0) {
                console.log(`\n\n✅ Transcription complete!`);
                
                // Read output files
                const baseName = filePath.replace('.wav', '');
                const txtPath = `${baseName}.txt`;
                const jsonPath = `${baseName}.json`;

                console.log("\n📄 OUTPUT FILES:");
                console.log("=".repeat(60));

                if (fs.existsSync(txtPath)) {
                    const transcription = fs.readFileSync(txtPath, 'utf-8');
                    console.log("\n📝 TRANSCRIPTION:");
                    console.log("-".repeat(60));
                    console.log(transcription.trim());
                    console.log("-".repeat(60));
                }

                if (fs.existsSync(jsonPath)) {
                    console.log(`\n✅ JSON output: ${jsonPath}`);
                }

                console.log("\n" + "=".repeat(60));
            } else {
                console.error(`\n❌ whisper-cli failed with code ${code}`);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error("\n❌ Error occurred:");
        console.error(`Message: ${error.message}\n`);
        process.exit(1);
    }
}

// Run the transcription
console.log("🚀 Starting Local Whisper Transcription\n");
transcribeLocally(audioFilePath);
