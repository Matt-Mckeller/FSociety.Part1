#!/usr/bin/env python3
"""
Test Whisper transcription on the recorded audio file
"""

import os
from openai import OpenAI

# Initialize OpenAI client
api_key = "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"
if not api_key:
    print("❌ Error: OPENAI_API_KEY environment variable not set")
    print("\n💡 To set it, run:")
    print('   export OPENAI_API_KEY="your-api-key-here"')
    print("\nOr get an API key from: https://platform.openai.com/api-keys")
    exit(1)

client = OpenAI(api_key=api_key)

# Path to the audio file
# audio_file_path = "test-app-noisy/ambient-recording-1761500780135.webm"
audio_file_path = "test-app-noisy/ambient-recording-1761500963503.webm"

print(f"🎵 Testing Whisper transcription on: {audio_file_path}")
print(f"📊 File size: {os.path.getsize(audio_file_path) / 1024:.2f} KB")
print("\n" + "="*60)

try:
    # Open and transcribe the audio file
    with open(audio_file_path, "rb") as audio_file:
        print("\n🔄 Sending to OpenAI Whisper API...")
        
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="verbose_json"
        )
        
        print("\n✅ Transcription successful!")
        print("="*60)
        print("\n📝 TRANSCRIBED TEXT:")
        print("-"*60)
        print(transcription.text)
        print("-"*60)
        
        print("\n📊 ADDITIONAL INFO:")
        print(f"Language: {transcription.language}")
        print(f"Duration: {transcription.duration} seconds")
        
        if hasattr(transcription, 'segments') and transcription.segments:
            print(f"\nNumber of segments: {len(transcription.segments)}")
            print("\n🎯 SEGMENTS:")
            for i, segment in enumerate(transcription.segments, 1):
                print(f"\nSegment {i}:")
                print(f"  Time: {segment.start:.2f}s - {segment.end:.2f}s")
                print(f"  Text: {segment.text}")
                
except FileNotFoundError:
    print(f"❌ Error: Audio file not found at {audio_file_path}")
except Exception as e:
    print(f"❌ Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
