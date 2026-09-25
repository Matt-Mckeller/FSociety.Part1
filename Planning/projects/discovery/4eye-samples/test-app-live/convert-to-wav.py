#!/usr/bin/env python3
"""Convert WebM audio file to WAV format"""

import sys
from pydub import AudioSegment

if len(sys.argv) != 3:
    print("Usage: python convert-to-wav.py <input.webm> <output.wav>")
    sys.exit(1)

input_file = sys.argv[1]
output_file = sys.argv[2]

print(f"Converting {input_file} to {output_file}...")

# Load the WebM file
audio = AudioSegment.from_file(input_file, format="webm")

# Convert to mono and set sample rate to 16kHz (required by whisper)
audio = audio.set_channels(1)  # Mono
audio = audio.set_frame_rate(16000)  # 16kHz

# Export as WAV
audio.export(output_file, format="wav")

print(f"✓ Conversion complete!")
print(f"  Channels: 1 (mono)")
print(f"  Sample rate: 16000 Hz")
print(f"  Duration: {len(audio) / 1000:.2f} seconds")
