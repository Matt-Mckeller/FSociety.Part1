# 4wings Brand Design Tool

Interactive design tool for creating and customizing the 4wings logo and companion robot character for the Counsellor Support product.

## Features

### Character Designer
- **Body Customization**: Adjust width, height, and roundness
- **Eyes & Expression**: Customize eye size, spacing, and choose expressions (happy, calm, curious, excited)
- **Features**: Toggle wings, ears, status light, eye glow, and animations
- **Color Presets**: 8 pre-configured color schemes

### Logo Designer
- **Layout Options**: Horizontal, vertical, or icon-only
- **Text Settings**: Customize size, weight, and tagline
- **Background**: Optional with adjustable padding and radius

### Variations Gallery
- Pre-built character variations
- Color scheme gallery
- Logo layout previews

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3005](http://localhost:3005) to view the design tool.

## Design System

### Brand Colors
- **Primary Purple**: `#7C3AED` (light: `#A78BFA`, dark: `#5B21B6`)
- **Secondary Pink**: `#EC4899`
- **Info Blue**: `#3B82F6`
- **Success Green**: `#10B981`

### Character Design Philosophy
The 4wings character is designed to be:
- **Friendly & Approachable**: Rounded shapes, soft expressions
- **Non-threatening**: Gentle features, warm colors
- **Memorable**: Unique owl-like design with wings (ties to "4wings" name)
- **Professional**: Suitable for healthcare/counseling context

### Character Features
- **Wings**: Represents the "4wings" company name and growth/transformation
- **Ears/Antenna**: Adds personality and suggests listening capabilities
- **Status Light**: Shows device state (recording, processing, etc.)
- **Expressions**: Multiple moods for different contexts

## Tech Stack
- Next.js 16
- React 19
- MUI 7
- TypeScript

## Project Structure
```
brand-design/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles & animations
│   │   ├── layout.tsx       # App layout
│   │   └── page.tsx         # Main design tool page
│   ├── components/
│   │   ├── Character.tsx    # SVG character component
│   │   ├── Logo.tsx         # Logo with text component
│   │   └── ThemeProvider.tsx
│   └── theme.ts             # MUI theme configuration
└── public/
```

## Usage Tips

1. **Start with variations**: Check the gallery first to find a base design
2. **Customize colors**: Use presets or fine-tune with sliders
3. **Adjust expression**: Match the mood to your use case
4. **Try different layouts**: Test horizontal/vertical for different contexts
5. **Export**: Use browser screenshot tools or implement export feature

## Related Projects
- [Product Website](../product-website) - Main marketing site
- [Pitch Deck](../pitch-deck) - Investor presentation
- [Documentation](../documentation-website) - Technical docs
