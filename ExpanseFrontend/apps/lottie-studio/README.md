# Lottie Studio

AI-powered Lottie animation theming and management tool. Transform your Lottie animations with intelligent naming, metadata generation, and theme creation.

## Features

- **AI Metadata Generation**: Automatically analyze animations and generate descriptive metadata
- **Smart Element Naming**: Generate semantic, descriptive names for all themeable elements
- **Theme Generation**: Create beautiful color themes with AI-optimized color mappings
- **Export System**: Generate ready-to-use React components, schemas, and theme files

## Architecture

```
lottie-studio/
├── backend/          # NestJS + GraphQL API
│   ├── src/
│   │   ├── ai/       # AI services (Gemini integration)
│   │   ├── lottie/   # Animation processing
│   │   ├── export/   # File generation
│   │   └── common/   # Shared utilities
│   └── ...
├── frontend/         # Next.js + MUI React App
│   ├── src/
│   │   ├── app/      # Next.js app router
│   │   ├── components/
│   │   ├── lib/      # Apollo client, utilities
│   │   ├── store/    # Zustand state management
│   │   └── theme/    # MUI theme configuration
│   └── ...
└── shared/           # Shared TypeScript types
    └── types/
```

## Prerequisites

- Node.js 18+
- npm or yarn
- Google AI (Gemini) API key

## Getting Started

### 1. Install Dependencies

```bash
# From the monorepo root
cd apps/lottie-studio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env.local
# Edit .env.local and add your GOOGLE_API_KEY

# Frontend
cd ../frontend
cp .env.example .env.local
```

### 3. Start Development Servers

```bash
# Terminal 1: Start backend
cd apps/lottie-studio/backend
npm run dev

# Terminal 2: Start frontend
cd apps/lottie-studio/frontend
npm run dev
```

### 4. Open the App

Navigate to [http://localhost:3020](http://localhost:3020)

## Usage

### Step 1: Upload Animation
- Drop or select a Lottie JSON file
- Optionally provide hints for better AI analysis

### Step 2: Generate Metadata
- AI analyzes the animation structure
- Generates name, description, tags, and recommendations

### Step 3: Name Elements
- AI identifies all themeable elements
- Generates semantic names following [Purpose][Location][Detail] pattern

### Step 4: Generate Themes
- Select color palettes (light/dark variants)
- AI generates optimized color mappings for each theme

### Step 5: Export
- Download schema file (.expanse-lottie.ts)
- Download React component (.tsx)
- Download theme configuration files
- Download as ZIP for easy integration

## API

### GraphQL Endpoint

- **HTTP**: `http://localhost:4000/graphql`
- **WebSocket**: `ws://localhost:4000/graphql`

### Key Operations

```graphql
# Upload animation
mutation UploadAnimation($input: UploadAnimationInput!) {
  uploadAnimation(input: $input) {
    id
    name
    status
  }
}

# Generate metadata
mutation GenerateMetadata($animationId: ID!) {
  generateMetadata(animationId: $animationId) {
    id
    metadata {
      animationName
      description
      tags
    }
  }
}

# Generate element names
mutation GenerateElements($animationId: ID!) {
  generateElements(animationId: $animationId) {
    id
    elements {
      name
      path
      description
    }
  }
}

# Generate themes
mutation GenerateThemes($animationId: ID!, $input: GenerateThemesInput!) {
  generateThemes(animationId: $animationId, input: $input) {
    id
    themes {
      themeId
      name
      colors
    }
  }
}

# Subscribe to progress
subscription ProcessingProgress($animationId: ID!) {
  processingProgress(animationId: $animationId) {
    phase
    progress
    message
  }
}
```

## Tech Stack

### Backend
- **NestJS** - Node.js framework
- **Apollo Server** - GraphQL server
- **GraphQL Subscriptions** - Real-time updates
- **Google Generative AI** - Gemini 2.5 Pro

### Frontend
- **Next.js 14** - React framework
- **MUI v5** - Material UI components
- **Apollo Client** - GraphQL client
- **Zustand** - State management
- **lottie-react** - Lottie animation rendering

## AI Prompts

All AI prompts include the instruction: **"Spend time thinking, and get it perfect"**

Theme generation uses 1 theme per API call for maximum quality.

## License

See root LICENSE.md
