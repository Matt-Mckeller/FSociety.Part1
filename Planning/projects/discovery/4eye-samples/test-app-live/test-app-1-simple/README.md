# Audio Transcription Test App

This React application demonstrates and compares two audio transcription technologies:
1. **Web Speech Recognition API** - Browser-native speech recognition
2. **Transformers.js** - Client-side ML using Whisper model

## Features

- Side-by-side comparison of both technologies
- Real-time transcription with Web Speech Recognition
- Batch transcription with Transformers.js
- Detailed logging and event tracking
- Comparison table highlighting pros/cons of each approach
- Material-UI interface for clean UX

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   The app will automatically open at [http://localhost:3000](http://localhost:3000)

## Usage

### Web Speech Recognition (Left Panel)
1. Click "Start Listening"
2. Speak into your microphone
3. See real-time transcription appear
4. Click "Stop" when done

### Transformers.js (Right Panel)
1. Wait for the model to load (first time only, ~30-60 seconds)
2. Click "Start Recording"
3. Speak into your microphone
4. Click "Stop & Transcribe"
5. Wait a moment for processing
6. See the transcription appear

### Comparison Panel (Bottom)
- View detailed logs for each technology
- See event timing and confidence scores
- Review feature comparison table
- Understand which technology fits your use case

## Key Differences

| Feature | Web Speech Recognition | Transformers.js |
|---------|----------------------|-----------------|
| Real-time | ✅ Yes | ❌ No |
| Offline | ❌ No | ✅ Yes |
| Setup Time | ✅ Instant | ⚠️ ~30-60s |
| Accuracy | ⚠️ Good | ✅ Excellent |
| Privacy | ⚠️ Cloud | ✅ Local |

## Browser Compatibility

- **Web Speech Recognition**: Chrome, Edge, Safari (desktop)
- **Transformers.js**: All modern browsers with WebAssembly support

## Technical Notes

- Web Speech Recognition uses the browser's native API (Google's servers on Chrome)
- Transformers.js downloads the Whisper tiny.en model (~75MB) on first load
- The model is cached in the browser after first download
- Transformers.js processes audio locally using WebAssembly/WebGPU

## Troubleshooting

**Web Speech Recognition not working:**
- Ensure you're using Chrome, Edge, or Safari
- Check microphone permissions
- Verify internet connection

**Transformers.js slow to load:**
- First load downloads ~75MB model
- Subsequent loads use cached model
- Check browser console for loading progress

**No audio detected:**
- Check microphone permissions in browser settings
- Ensure microphone is not muted
- Try using headphones to reduce feedback

## License

MIT
