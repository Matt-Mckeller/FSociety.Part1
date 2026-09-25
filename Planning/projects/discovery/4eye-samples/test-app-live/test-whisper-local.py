#!/usr/bin/env python3
"""
Test local Whisper transcription (no API key needed)
Uses OpenAI's open-source Whisper model
"""

import os
import sys

print("🔍 Checking for local Whisper installation...")

try:
    import whisper
    print("✅ Whisper is installed")
except ImportError:
    print("❌ Whisper not installed")
    print("\n💡 To install, run:")
    print("   pip3 install openai-whisper")
    print("\n⚠️  Note: This will download ~500MB of dependencies")
    sys.exit(1)

# Path to the audio file
audio_file_path = "test-app-noisy/audio-1761500083170.webm"

print(f"\n🎵 Testing local Whisper on: {audio_file_path}")

if not os.path.exists(audio_file_path):
    print(f"❌ Error: Audio file not found at {audio_file_path}")
    sys.exit(1)

file_size_kb = os.path.getsize(audio_file_path) / 1024
print(f"📊 File size: {file_size_kb:.2f} KB")
print("\n" + "="*60)

try:
    # Load the model (starts with tiny, which is fastest)
    print("\n🔄 Loading Whisper 'base' model...")
    print("   (This will download ~150MB on first run)")
    model = whisper.load_model("base")
    
    print("\n🔄 Transcribing audio...")
    result = model.transcribe(audio_file_path)
    
    print("\n✅ Transcription successful!")
    print("="*60)
    print("\n📝 TRANSCRIBED TEXT:")
    print("-"*60)
    print(result["text"])
    print("-"*60)
    
    print("\n📊 ADDITIONAL INFO:")
    print(f"Language: {result['language']}")
    
    if 'segments' in result and result['segments']:
        print(f"\nNumber of segments: {len(result['segments'])}")
        print("\n🎯 SEGMENTS:")
        for i, segment in enumerate(result['segments'], 1):
            print(f"\nSegment {i}:")
            print(f"  Time: {segment['start']:.2f}s - {segment['end']:.2f}s")
            print(f"  Text: {segment['text']}")
            
except Exception as e:
    print(f"\n❌ Error: {str(e)}")
    print(f"Error type: {type(e).__name__}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)
print("✅ Test complete!")
