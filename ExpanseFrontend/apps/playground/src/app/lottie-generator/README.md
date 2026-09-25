# Lottie Animation Generator

Generate custom Lottie animations using AI (Claude).

## Features

- 🎨 **AI-Powered Generation**: Describe your animation and let Claude generate the Lottie JSON
- 🎯 **Semantic Naming**: All layers and shapes follow the `[Purpose][Location][Detail]` pattern
- ⚙️ **Customizable Options**: Control dimensions, duration, style, and complexity
- 👀 **Live Preview**: See your animation play in real-time
- 📦 **Download**: Export the generated Lottie JSON file
- 🔄 **Streaming**: Watch the generation happen in real-time

## Quick Start

1. Navigate to `/lottie-generator` in your app
2. Enter a description or pick an example
3. Configure options (dimensions, style, complexity)
4. Click "Generate Animation"
5. Preview and download your animation

## Example Prompts

- **Cat**: "A cute cat sitting and waving its paw, with blinking eyes and a swishing tail"
- **Loading**: "A modern loading spinner with smooth rotation and pulsing effect in purple"
- **Success**: "A checkmark that draws in with a bouncy celebration effect and confetti"
- **Notification**: "A bell that rings with sound wave ripples expanding outward in blue"
- **Rocket**: "A cartoon rocket launching upward with flame trail and star particles"

## Options

### Dimensions

- **Width/Height**: Set the canvas size (default: 512x512)
- **Duration**: Animation length in seconds (default: 3s)
- **Frame Rate**: FPS for smooth playback (default: 60fps)

### Style

- **Flat**: Solid colors, modern flat design
- **Gradient**: Rich gradients for depth
- **Outlined**: Stroke-focused, minimal fills
- **Illustrated**: Full illustrative style with detail

### Complexity

- **Simple**: Under 30 shapes, minimal detail
- **Medium**: Balanced detail and performance
- **Complex**: Up to 100 shapes, highly detailed

## How It Works

1. **Prompt Engineering**: Your description is formatted with technical requirements
2. **AI Generation**: Claude creates valid Lottie JSON with semantic naming
3. **Validation**: Output is parsed and validated for Lottie compatibility
4. **Metadata**: Layer count, shape count, duration, and file size are calculated
5. **Preview**: Animation is loaded with lottie-web for instant playback

## File Structure

```
lottie-generator/
├── page.tsx                      # Main page component
├── components/
│   ├── GeneratorForm.tsx         # Input form and generation UI
│   └── AnimationPreview.tsx      # Lottie playback preview
├── utils/
│   └── claudeGenerator.ts        # Claude API client for generation
└── types/
    └── index.ts                  # TypeScript types
```

## Integration

### In Your Code

```typescript
import { generateLottieAnimation } from "./utils/claudeGenerator"

const result = await generateLottieAnimation("A bouncing ball with a shadow", {
  width: 400,
  height: 400,
  duration: 2,
  style: "flat",
  complexity: "simple",
})

if (result.success) {
  console.log("Generated animation:", result.animation)
  console.log("Metadata:", result.metadata)
}
```

### With Streaming

```typescript
const result = await generateLottieAnimation(
  description,
  options,
  (streamedText) => {
    console.log("Generating...", streamedText.length, "chars")
  },
)
```

## Requirements

- Anthropic API key in `NEXT_PUBLIC_ANTHROPIC_API_KEY`
- `lottie-web` package for preview
- Next.js 13+ with App Router

## Notes

- Generation typically takes 10-30 seconds depending on complexity
- Claude model: `claude-sonnet-4-5-20250929`
- Max tokens: 16,000 (allows for detailed animations)
- Browser-based API calls (development only - move to server in production)

## Related Tools

- **Lottie Naming Tool**: Analyze and rename existing Lottie animations
- **Lottie Gallery**: Browse and preview Lottie animations

## Future Enhancements

- [ ] Animation style templates
- [ ] Color palette selection
- [ ] Timeline editing
- [ ] Batch generation
- [ ] Server-side API routes
- [ ] Animation variations
- [ ] Export to different formats
