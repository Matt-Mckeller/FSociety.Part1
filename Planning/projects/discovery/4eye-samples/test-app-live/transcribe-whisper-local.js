#!/usr/bin/env node
/**
 * Local Whisper Transcription - Node.js Version
 * Uses whisper.cpp locally (no API needed)
 */

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const WHISPER_CPP_PATH = process.env.WHISPER_CPP_PATH || '/usr/local/bin/whisper-cpp';
const MODEL_PATH = process.env.WHISPER_MODEL_PATH || path.join(__dirname, 'models', 'ggml-base.en.bin');

// Path to the audio file (can be passed as argument or hardcoded)
const audioFilePath = process.argv[2] || "test-app-noisy/ambient-recording-1761500780135.webm";

function checkWhisperInstalled() {
    return new Promise((resolve) => {
        const check = spawn('which', ['whisper-cli']);
        let output = '';
        
        check.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        check.on('close', (code) => {
            resolve(code === 0 && output.trim().length > 0);
        });
    });
}

async function downloadModel(modelName = 'base.en') {
    console.log(`\n📥 Downloading ${modelName} model...`);
    console.log("This will take a few minutes on first run.\n");

    const modelsDir = path.join(__dirname, 'models');
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
    }

    const modelFile = `ggml-${modelName}.bin`;
    const modelPath = path.join(modelsDir, modelFile);

    if (fs.existsSync(modelPath)) {
        console.log(`✅ Model already exists at: ${modelPath}\n`);
        return modelPath;
    }

    const downloadUrl = `https://huggingface.co/ggerganov/whisper.cpp/resolve/main/${modelFile}`;
    
    return new Promise((resolve, reject) => {
        const curl = spawn('curl', [
            '-L',
            '--progress-bar',
            '-o',
            modelPath,
            downloadUrl
        ]);

        curl.stderr.pipe(process.stderr);
        
        curl.on('close', (code) => {
            if (code === 0) {
                console.log(`\n✅ Model downloaded to: ${modelPath}\n`);
                resolve(modelPath);
            } else {
                reject(new Error(`Failed to download model (exit code: ${code})`));
            }
        });
    });
}

async function convertToWav(inputPath) {
    console.log(`\n🔄 Converting ${path.basename(inputPath)} to WAV format...`);
    
    const outputPath = inputPath.replace(/\.(webm|mp3|m4a)$/, '.wav');
    
    if (fs.existsSync(outputPath)) {
        console.log(`✅ WAV file already exists: ${outputPath}\n`);
        return outputPath;
    }

    return new Promise((resolve, reject) => {
        // Check if ffmpeg is installed
        const checkFfmpeg = spawn('which', ['ffmpeg']);
        
        checkFfmpeg.on('close', (code) => {
            if (code !== 0) {
                reject(new Error('ffmpeg not found. Install it with: brew install ffmpeg'));
                return;
            }

            // Convert to 16kHz mono WAV (required by whisper.cpp)
            const ffmpeg = spawn('ffmpeg', [
                '-i', inputPath,
                '-ar', '16000',      // Sample rate: 16kHz
                '-ac', '1',          // Channels: mono
                '-c:a', 'pcm_s16le', // Codec: 16-bit PCM
                '-y',                // Overwrite output
                outputPath
            ]);

            ffmpeg.stderr.pipe(process.stderr);

            ffmpeg.on('close', (code) => {
                if (code === 0) {
                    console.log(`✅ Converted to WAV: ${outputPath}\n`);
                    resolve(outputPath);
                } else {
                    reject(new Error(`FFmpeg conversion failed (exit code: ${code})`));
                }
            });
        });
    });
}

async function transcribeWithWhisperCpp(audioPath, modelPath) {
    console.log(`\n🔄 Transcribing with whisper.cpp...\n`);
    
    return new Promise((resolve, reject) => {
        const whisper = spawn('whisper-cli', [
            '-m', modelPath,
            '-f', audioPath,
            '--output-txt',
            '--output-json',
            '--output-srt',
            '--print-progress'
        ]);

        let stdout = '';
        let stderr = '';

        whisper.stdout.on('data', (data) => {
            const output = data.toString();
            stdout += output;
            process.stdout.write(output);
        });

        whisper.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        whisper.on('close', (code) => {
            if (code === 0) {
                console.log(`\n✅ Transcription complete!\n`);
                resolve({ stdout, stderr });
            } else {
                reject(new Error(`whisper.cpp failed (exit code: ${code})\n${stderr}`));
            }
        });
    });
}

async function transcribeLocally(filePath) {
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`Audio file not found at: ${filePath}`);
        }

        const stats = fs.statSync(filePath);
        const fileSizeKB = (stats.size / 1024).toFixed(2);

        console.log(`🎵 Local Whisper Transcription`);
        console.log(`📁 File: ${filePath}`);
        console.log(`📊 Size: ${fileSizeKB} KB`);
        console.log("=".repeat(60));

        // Check if whisper.cpp is installed
        const whisperInstalled = await checkWhisperInstalled();
        
        if (!whisperInstalled) {
            console.log("\n❌ whisper.cpp not found!\n");
            console.log("💡 To install whisper.cpp:");
            console.log("   1. Install Homebrew (if needed): https://brew.sh");
            console.log("   2. Run: brew install whisper-cpp\n");
            console.log("Or build from source:");
            console.log("   git clone https://github.com/ggerganov/whisper.cpp");
            console.log("   cd whisper.cpp");
            console.log("   make");
            console.log("   make install\n");
            process.exit(1);
        }

        // Download model if needed
        const modelPath = await downloadModel('base.en');

        // Convert to WAV if not already
        const wavPath = await convertToWav(filePath);

        // Transcribe
        await transcribeWithWhisperCpp(wavPath, modelPath);

        // Read output files
        const baseName = wavPath.replace('.wav', '');
        const txtPath = `${baseName}.txt`;
        const jsonPath = `${baseName}.json`;
        const srtPath = `${baseName}.srt`;

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

        if (fs.existsSync(srtPath)) {
            console.log(`✅ SRT subtitles: ${srtPath}`);
        }

        console.log("\n" + "=".repeat(60));
        console.log("✅ Transcription complete!\n");

    } catch (error) {
        console.error("\n❌ Error occurred:");
        console.error(`Message: ${error.message}\n`);
        process.exit(1);
    }
}

// Run the transcription
console.log("🚀 Starting Local Whisper Transcription\n");
transcribeLocally(audioFilePath);
