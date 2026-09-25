import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import { HudDesktopDefault } from "./desktop-default";
import { HudMobileMoba } from "./mobile-moba";
import { HudPresentation } from "./presentation";
import { HudLearningFocus } from "./learning-focus";
import { HudSocialCollab } from "./social-collab";
import { HudWorkDashboard } from "./work-dashboard";
import { HudMediaPlayer } from "./media-player";
import { HudGamingRpg } from "./gaming-rpg";
import { HudCreativeCanvas } from "./creative-canvas";
import { HudDataDashboard } from "./data-dashboard";
import { HudEReader } from "./e-reader";
import { HudStreaming } from "./streaming";
import { HudMusicProduction } from "./music-production";
import { HudFitnessTracker } from "./fitness-tracker";
import { HudMapNavigation } from "./map-navigation";
import { HudPhotoGallery } from "./photo-gallery";
import { HudSmartHome } from "./smart-home";
import { HudKioskPos } from "./kiosk-pos";
import { HudTerminalDev } from "./terminal-dev";
import { Hud3dViewer } from "./3d-viewer";
import type { LearningGoal } from "./learning-focus";
import type { Participant, ChatMessage } from "./social-collab";
import type { Task, CalendarEvent, Notification } from "./work-dashboard";
import type { Chapter } from "./media-player";
import type { QuestObjective, HotbarSlot, Quest } from "./gaming-rpg";
import type { Layer } from "./creative-canvas";
import type { LegendItem } from "./data-dashboard";

// =============================================================================
// Meta
// =============================================================================

const meta: Meta = {
  title: "Layout Systems/HUD Templates",
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0f0f14" },
        { name: "light", value: "#f0f0f5" },
      ],
    },
    docs: {
      description: {
        component: `
# HUD Templates

Complete, self-contained layout examples for different applications.
**Copy these templates into your app and modify as needed.**

## Available Templates

| Template | Use Case |
|----------|----------|
| Desktop Default | Full-featured desktop HUD with all components |
| Mobile MOBA | Gaming-style mobile with thumb-reachable orbs |
| Presentation | Clean, minimal for slideshows and demos |
| Learning Focus | Study sessions with goals and XP tracking |
| Social Collab | Chat, video presence, collaboration |
| Work Dashboard | Tasks, calendar, notifications, focus timer |
| Media Player | Video/audio player with timeline and chapters |
| Gaming RPG | RPG layout with health/mana bars, minimap, hotbar |
| Creative Canvas | Drawing/design app with tools and layers |
| Data Dashboard | Analytics dashboard with filters and charts |
| E-Reader | Book reading with TOC, bookmarks, themes |
| Streaming/Broadcast | OBS-style with scenes, chat, mixer, alerts |
| Music Production | DAW with transport, tracks, mixer |
| Fitness Tracker | Workout with heart rate, exercises, stats |
| Map/Navigation | GPS with turn-by-turn, speed, POIs |
| Photo Gallery | Lightbox with thumbnails, EXIF, zoom |
| Smart Home | IoT control with rooms, devices, climate |
| Kiosk/POS | Point of sale with cart, products, payment |
| Terminal/Dev | IDE-style with file tree, terminal, status |
| 3D Viewer | CAD viewer with layers, lighting, measurements |

## Usage

1. View the template in Storybook
2. Copy the template file into your project
3. Modify the components and configuration for your needs
4. The template shows you which hud-components to import

These are **example files**, not reusable components. They demonstrate
how to assemble the hud-components for different use cases.
        `,
      },
    },
  },
};

export default meta;

// =============================================================================
// Desktop Default
// =============================================================================

export const DesktopDefault: StoryObj = {
  name: "Desktop Default",
  render: () => <HudDesktopDefault />,
  parameters: {
    docs: {
      description: {
        story: `
Full-featured desktop HUD layout.

**Features:**
- Top bar with navigation buttons
- Left bar with tools (collapsible)
- Right dock with quick actions
- Bottom bar with settings (collapsible)
- AI orbs in bottom-right
- Undo/redo dock in bottom-left
- Dark/light mode toggle

**File:** \`templates/hud/desktop-default/HudDesktopDefault.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Mobile MOBA
// =============================================================================

export const MobileMoba: StoryObj = {
  name: "Mobile MOBA",
  render: () => <HudMobileMoba notificationCount={5} />,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
    docs: {
      description: {
        story: `
Gaming-style mobile layout with thumb-reachable controls.

**Features:**
- Minimal top bar (menu, home, notifications)
- Left thumb zone - AI/communication orbs
- Right thumb zone - Navigation/inventory orbs
- Center action orb
- Safe area inset support
- No side bars (maximize content)

**File:** \`templates/hud/mobile-moba/HudMobileMoba.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Presentation
// =============================================================================

export const Presentation: StoryObj = {
  name: "Presentation",
  render: function PresentationDemo() {
    const [slide, setSlide] = useState(1);
    const totalSlides = 10;

    return (
      <HudPresentation
        currentSlide={slide}
        totalSlides={totalSlides}
        onNextSlide={() => setSlide((s) => Math.min(s + 1, totalSlides))}
        onPrevSlide={() => setSlide((s) => Math.max(s - 1, 1))}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h1" sx={{ mb: 2 }}>
            Slide {slide}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.6 }}>
            Your presentation content here
          </Typography>
        </Box>
      </HudPresentation>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Clean, minimal layout for presentations and demos.

**Features:**
- Session timer with play/pause/reset
- Slide counter
- Navigation arrows (keyboard: ← → Space)
- Fullscreen toggle (F key)
- Auto-hide controls
- Progress bar
- Black background (projector friendly)

**File:** \`templates/hud/presentation/HudPresentation.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Learning Focus
// =============================================================================

export const LearningFocus: StoryObj = {
  name: "Learning Focus",
  render: function LearningDemo() {
    const [goals, setGoals] = useState<LearningGoal[]>([
      { id: "1", label: "Complete lesson", completed: false },
      { id: "2", label: "Practice 5 problems", completed: true },
      { id: "3", label: "Review notes", completed: false },
    ]);

    const handleGoalToggle = (goalId: string) => {
      setGoals((prev) =>
        prev.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g))
      );
    };

    return (
      <HudLearningFocus
        subject="Mathematics - Calculus"
        xp={1250}
        xpMax={2000}
        level={12}
        goals={goals}
        streakDays={7}
        onGoalToggle={handleGoalToggle}
        onAiHelp={() => alert("AI Help requested!")}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            maxWidth: 600,
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Derivatives
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
            The derivative of a function represents the rate of change of the
            function with respect to its input variable. It's a fundamental
            concept in calculus...
          </Typography>
        </Box>
      </HudLearningFocus>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Study session layout with goals, progress, and focus features.

**Features:**
- Subject display with streak badge
- Level and XP progress bar
- Session timer (auto-starts)
- Goals panel with completion tracking
- Focus mode (hide HUD for concentration)
- AI help orb
- Hint button

**File:** \`templates/hud/learning-focus/HudLearningFocus.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Social Collab
// =============================================================================

export const SocialCollab: StoryObj = {
  name: "Social Collab",
  render: function SocialDemo() {
    const participants: Participant[] = [
      { id: "1", name: "Alice", isOnline: true, isSpeaking: true },
      { id: "2", name: "Bob", isOnline: true },
      { id: "3", name: "Carol", isOnline: true },
      { id: "4", name: "Dan", isOnline: false },
    ];

    const messages: ChatMessage[] = [
      { id: "1", senderId: "1", senderName: "Alice", text: "Hey team, let's review the designs", timestamp: new Date() },
      { id: "2", senderId: "2", senderName: "Bob", text: "Sounds good! Ready when you are", timestamp: new Date() },
      { id: "3", senderId: "me", senderName: "You", text: "I'll share my screen", timestamp: new Date() },
    ];

    return (
      <HudSocialCollab
        participants={participants}
        messages={messages}
        onSendMessage={(text) => console.log("Send:", text)}
        onReaction={(type) => console.log("Reaction:", type)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, opacity: 0.2 }}>
            Shared Canvas
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.4 }}>
            Collaborative workspace content here
          </Typography>
        </Box>
      </HudSocialCollab>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Collaboration-focused layout for team environments.

**Features:**
- Participant avatars with presence/speaking indicators
- Voice/video/screen share controls
- Quick reactions (thumbs up, heart, emoji)
- Collapsible chat panel
- Unread message badges

**File:** \`templates/hud/social-collab/HudSocialCollab.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Work Dashboard
// =============================================================================

export const WorkDashboard: StoryObj = {
  name: "Work Dashboard",
  render: function WorkDemo() {
    const [tasks, setTasks] = useState<Task[]>([
      { id: "1", title: "Review PR #234", completed: false, priority: "high", dueTime: "10:00 AM" },
      { id: "2", title: "Update documentation", completed: true, priority: "medium" },
      { id: "3", title: "Team standup", completed: false, priority: "low", dueTime: "11:00 AM" },
      { id: "4", title: "Deploy staging build", completed: false, priority: "high", dueTime: "2:00 PM" },
    ]);

    const events: CalendarEvent[] = [
      { id: "1", title: "Design Review", time: "9:00 AM", color: "#8b5cf6" },
      { id: "2", title: "Team Standup", time: "11:00 AM", color: "#3b82f6" },
      { id: "3", title: "Client Call", time: "3:00 PM", color: "#22c55e" },
    ];

    const notifications: Notification[] = [
      { id: "1", title: "PR Approved", message: "Your pull request was approved by Alice", time: "5m ago", read: false },
      { id: "2", title: "New Comment", message: "Bob commented on your document", time: "1h ago", read: false },
      { id: "3", title: "Build Complete", message: "Staging deployment finished", time: "2h ago", read: true },
    ];

    return (
      <HudWorkDashboard
        tasks={tasks}
        events={events}
        notifications={notifications}
        onTaskToggle={(id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
        onAddTask={() => console.log("Add task")}
        onNotificationClick={(id) => console.log("Notification clicked:", id)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, opacity: 0.2 }}>
            Main Content
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.4 }}>
            Your app content goes here
          </Typography>
        </Box>
      </HudWorkDashboard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Productivity-focused layout for work environments.

**Features:**
- Top quick actions bar (search, notifications, etc.)
- Task list with priorities and due times
- Calendar mini-view with today's events
- Notifications panel
- Focus/Pomodoro timer
- Quick add task orb

**File:** \`templates/hud/work-dashboard/HudWorkDashboard.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Media Player
// =============================================================================

export const MediaPlayer: StoryObj = {
  name: "Media Player",
  render: function MediaDemo() {
    const [currentTime, setCurrentTime] = useState(125);
    const [isPlaying, setIsPlaying] = useState(false);
    const duration = 600;

    const chapters: Chapter[] = [
      { id: "1", title: "Introduction", startTime: 0 },
      { id: "2", title: "Main Content", startTime: 120 },
      { id: "3", title: "Deep Dive", startTime: 300 },
      { id: "4", title: "Summary", startTime: 500 },
    ];

    return (
      <HudMediaPlayer
        currentTime={currentTime}
        duration={duration}
        isPlaying={isPlaying}
        chapters={chapters}
        onSeek={(time) => setCurrentTime(time)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onChapterSelect={(chapter) => setCurrentTime(chapter.startTime)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h2" sx={{ opacity: 0.2 }}>
            Video Content
          </Typography>
        </Box>
      </HudMediaPlayer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Video/audio player layout with timeline and chapter navigation.

**Features:**
- Timeline scrubber with progress
- Chapter markers and navigation
- Playback controls (play/pause, skip ±10s, ±5min)
- Volume slider with mute
- Captions toggle
- Fullscreen toggle
- Auto-hide controls
- Keyboard shortcuts (Space, K, ←→, M, F, C)

**File:** \`templates/hud/media-player/HudMediaPlayer.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Gaming RPG
// =============================================================================

export const GamingRpg: StoryObj = {
  name: "Gaming RPG",
  render: function RpgDemo() {
    const objectives: QuestObjective[] = [
      { id: "1", text: "Defeat the Forest Guardian", completed: false },
      { id: "2", text: "Collect 5 Ancient Crystals", completed: true, current: 5, target: 5 },
      { id: "3", text: "Return to Elder Sage", completed: false },
    ];

    const activeQuest: Quest = {
      id: "quest-1",
      title: "The Ancient Forest",
      objectives,
    };

    const hotbar: HotbarSlot[] = [
      { id: "1", label: "Fireball", icon: "🔥", hotkey: "1", cooldown: 30 },
      { id: "2", label: "Shield", icon: "🛡️", hotkey: "2", cooldown: 0 },
      { id: "3", label: "Heal", icon: "💚", hotkey: "3", cooldown: 80 },
      { id: "4", label: "Dash", icon: "💨", hotkey: "4", cooldown: 0 },
    ];

    return (
      <HudGamingRpg
        health={85}
        healthMax={100}
        mana={40}
        manaMax={80}
        stamina={60}
        staminaMax={100}
        xp={3500}
        xpMax={5000}
        level={15}
        gold={2450}
        activeQuest={activeQuest}
        hotbarSlots={hotbar}
        onHotbarUse={(slotId) => console.log("Hotbar:", slotId)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h2" sx={{ opacity: 0.2 }}>
            Game World
          </Typography>
        </Box>
      </HudGamingRpg>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
RPG-style gaming layout with stats, quests, and action hotbar.

**Features:**
- Health/Mana/Stamina stat bars
- Minimap with toggle
- Quest tracker with objectives and progress
- Action hotbar with cooldown overlays
- XP progress bar with level display
- Gold counter
- Utility orbs (inventory, map, quests)

**File:** \`templates/hud/gaming-rpg/HudGamingRpg.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Creative Canvas
// =============================================================================

export const CreativeCanvas: StoryObj = {
  name: "Creative Canvas",
  render: function CanvasDemo() {
    const [activeTool, setActiveTool] = useState("brush");
    const [brushSize, setBrushSize] = useState(10);
    const [brushOpacity, setBrushOpacity] = useState(100);
    const [selectedLayer, setSelectedLayer] = useState("2");

    const layers: Layer[] = [
      { id: "1", name: "Background", visible: true, locked: true, opacity: 100 },
      { id: "2", name: "Sketch Layer", visible: true, locked: false, opacity: 100 },
      { id: "3", name: "Color Layer", visible: true, locked: false, opacity: 80 },
      { id: "4", name: "Effects", visible: false, locked: false, opacity: 50 },
    ];

    return (
      <HudCreativeCanvas
        activeTool={activeTool}
        brushSize={brushSize}
        brushOpacity={brushOpacity}
        layers={layers}
        selectedLayerId={selectedLayer}
        primaryColor="#3b82f6"
        secondaryColor="#ffffff"
        zoom={100}
        canvasWidth={1920}
        canvasHeight={1080}
        canvasName="My Artwork.psd"
        onToolSelect={setActiveTool}
        onBrushSizeChange={setBrushSize}
        onBrushOpacityChange={setBrushOpacity}
        onLayerSelect={setSelectedLayer}
        onUndo={() => console.log("Undo")}
        onRedo={() => console.log("Redo")}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Digital art / design application layout.

**Features:**
- Tools panel (brush, pencil, eraser, shapes, text, hand, eyedropper)
- Brush size and opacity sliders
- Color swatches (primary/secondary)
- Layers panel with visibility/lock toggles
- Layer opacity control
- Zoom controls
- Undo/Redo buttons
- Canvas info (name, dimensions, zoom)

**File:** \`templates/hud/creative-canvas/HudCreativeCanvas.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Data Dashboard
// =============================================================================

export const DataDashboard: StoryObj = {
  name: "Data Dashboard",
  render: function DashboardDemo() {
    const [timeRange, setTimeRange] = useState("1m");
    const [chartType, setChartType] = useState<"line" | "bar" | "pie" | "table">("line");

    const legends: LegendItem[] = [
      { id: "revenue", label: "Revenue", color: "#3b82f6", visible: true },
      { id: "users", label: "Active Users", color: "#22c55e", visible: true },
      { id: "conversion", label: "Conversion Rate", color: "#f59e0b", visible: true },
      { id: "churn", label: "Churn Rate", color: "#ef4444", visible: false },
    ];

    return (
      <HudDataDashboard
        title="Sales Analytics"
        timeRange={timeRange}
        chartType={chartType}
        legends={legends}
        lastUpdated="2 minutes ago"
        dataPointsCount={12847}
        onTimeRangeChange={setTimeRange}
        onChartTypeChange={(type) => setChartType(type as typeof chartType)}
        onLegendToggle={(id) => console.log("Toggle legend:", id)}
        onRefresh={() => console.log("Refresh")}
        onExport={(format) => console.log("Export as:", format)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="h2" sx={{ opacity: 0.15 }}>
            📊 Chart Area
          </Typography>
        </Box>
      </HudDataDashboard>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
Analytics / data visualization dashboard layout.

**Features:**
- Collapsible filters panel (select, checkbox, date range)
- Time range chips (1D, 1W, 1M, 3M, 1Y, All)
- Chart type switcher (line, bar, pie, table)
- Interactive legend with show/hide
- Data info (last updated, data points count)
- Zoom controls
- Export menu (CSV, Excel, PNG, PDF)
- Settings menu (auto-refresh, grid lines, animations)

**File:** \`templates/hud/data-dashboard/HudDataDashboard.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// E-Reader
// =============================================================================

export const EReader: StoryObj = {
  name: "E-Reader",
  render: () => <HudEReader />,
  parameters: {
    docs: {
      description: {
        story: `
Book/e-reader layout for reading applications.

**Features:**
- Page flip navigation
- Table of contents drawer
- Bookmarks panel
- Font size slider
- Theme toggle (light/dark/sepia)
- Reading progress
- Highlights/notes toolbar

**File:** \`templates/hud/e-reader/HudEReader.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Streaming
// =============================================================================

export const Streaming: StoryObj = {
  name: "Streaming/Broadcast",
  render: () => <HudStreaming />,
  parameters: {
    docs: {
      description: {
        story: `
OBS-style live streaming layout.

**Features:**
- Go live / end stream buttons
- Scene switcher
- Audio mixer with volume sliders
- Chat panel with input
- Alerts display
- Viewer count & bitrate stats

**File:** \`templates/hud/streaming/HudStreaming.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Music Production
// =============================================================================

export const MusicProduction: StoryObj = {
  name: "Music Production",
  render: () => <HudMusicProduction />,
  parameters: {
    docs: {
      description: {
        story: `
DAW-style music production layout.

**Features:**
- Transport controls (play/pause/stop/record)
- BPM & time signature display
- Track list with Mute/Solo/Record
- Bottom mixer with vertical faders
- Master channel
- Loop/metronome toggles

**File:** \`templates/hud/music-production/HudMusicProduction.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Fitness Tracker
// =============================================================================

export const FitnessTracker: StoryObj = {
  name: "Fitness Tracker",
  render: () => <HudFitnessTracker />,
  parameters: {
    docs: {
      description: {
        story: `
Workout/fitness application layout.

**Features:**
- Heart rate display with zone indicator
- Workout timer
- Exercise list with completion
- Rest countdown with circular progress
- Stats panel (calories, max/avg HR)
- Progress bar

**File:** \`templates/hud/fitness-tracker/HudFitnessTracker.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Map/Navigation
// =============================================================================

export const MapNavigation: StoryObj = {
  name: "Map/Navigation",
  render: () => <HudMapNavigation />,
  parameters: {
    docs: {
      description: {
        story: `
GPS navigation layout.

**Features:**
- Next turn card with maneuver icon
- Directions list
- Route info bar (ETA, distance)
- Speed display with limit sign
- Zoom/layers/recenter controls
- POI chips

**File:** \`templates/hud/map-navigation/HudMapNavigation.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Photo Gallery
// =============================================================================

export const PhotoGallery: StoryObj = {
  name: "Photo Gallery",
  render: () => <HudPhotoGallery />,
  parameters: {
    docs: {
      description: {
        story: `
Photo viewer/lightbox layout.

**Features:**
- Thumbnail strip
- Prev/next navigation
- EXIF info panel
- Zoom controls with slider
- Slideshow toggle
- Edit tools (rotate, crop)
- Favorite/share/download actions

**File:** \`templates/hud/photo-gallery/HudPhotoGallery.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Smart Home
// =============================================================================

export const SmartHome: StoryObj = {
  name: "Smart Home",
  render: () => <HudSmartHome />,
  parameters: {
    docs: {
      description: {
        story: `
IoT/Smart home control layout.

**Features:**
- Room selector
- Device toggles with sliders
- Scene presets
- Climate control
- Energy stats display
- Security status

**File:** \`templates/hud/smart-home/HudSmartHome.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Kiosk/POS
// =============================================================================

export const KioskPos: StoryObj = {
  name: "Kiosk/POS",
  render: () => <HudKioskPos />,
  parameters: {
    docs: {
      description: {
        story: `
Point of sale / kiosk application layout.

**Features:**
- Large touch-friendly product buttons
- Cart summary with quantity controls
- Category selector
- Price/tax/total calculation
- Payment method buttons (card/cash/QR)
- Promo code support

**File:** \`templates/hud/kiosk-pos/HudKioskPos.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// Terminal/Dev
// =============================================================================

export const TerminalDev: StoryObj = {
  name: "Terminal/Dev",
  render: () => <HudTerminalDev />,
  parameters: {
    docs: {
      description: {
        story: `
Developer terminal/IDE layout.

**Features:**
- File tree explorer
- Editor tabs
- Terminal output panel
- Command input
- Status bar with git & CPU info
- Run/Stop controls

**File:** \`templates/hud/terminal-dev/HudTerminalDev.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// 3D Viewer
// =============================================================================

export const ThreeDViewer: StoryObj = {
  name: "3D Viewer",
  render: () => <Hud3dViewer />,
  parameters: {
    docs: {
      description: {
        story: `
3D model viewing application layout.

**Features:**
- View preset buttons (perspective, front, top, etc.)
- Layer toggles with visibility
- Lighting controls
- Zoom slider
- Measurement mode
- Model info panel
- Axes indicator

**File:** \`templates/hud/3d-viewer/Hud3dViewer.tsx\`
        `,
      },
    },
  },
};

// =============================================================================
// All Templates Overview
// =============================================================================

export const AllTemplates: StoryObj = {
  name: "Overview",
  render: () => (
    <Box sx={{ p: 4, bgcolor: "#0f0f14", minHeight: "100vh" }}>
      <Typography variant="h3" sx={{ color: "white", mb: 2 }}>
        HUD Templates
      </Typography>
      <Typography variant="body1" sx={{ color: "white", opacity: 0.6, mb: 4, maxWidth: 600 }}>
        These are complete, self-contained layout examples. Copy the template file
        into your project and modify as needed.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 3,
        }}
      >
        {[
          {
            name: "Desktop Default",
            description: "Full-featured desktop HUD with all components",
            file: "desktop-default/HudDesktopDefault.tsx",
          },
          {
            name: "Mobile MOBA",
            description: "Gaming-style mobile with thumb-reachable orbs",
            file: "mobile-moba/HudMobileMoba.tsx",
          },
          {
            name: "Presentation",
            description: "Clean, minimal for slideshows and demos",
            file: "presentation/HudPresentation.tsx",
          },
          {
            name: "Learning Focus",
            description: "Study sessions with goals and XP tracking",
            file: "learning-focus/HudLearningFocus.tsx",
          },
          {
            name: "Social Collab",
            description: "Chat, video presence, collaboration indicators",
            file: "social-collab/HudSocialCollab.tsx",
          },
          {
            name: "Work Dashboard",
            description: "Tasks, calendar, notifications, focus timer",
            file: "work-dashboard/HudWorkDashboard.tsx",
          },
          {
            name: "Media Player",
            description: "Video/audio player with timeline and chapters",
            file: "media-player/HudMediaPlayer.tsx",
          },
          {
            name: "Gaming RPG",
            description: "RPG layout with health/mana bars, minimap, hotbar",
            file: "gaming-rpg/HudGamingRpg.tsx",
          },
          {
            name: "Creative Canvas",
            description: "Drawing/design app with tools and layers",
            file: "creative-canvas/HudCreativeCanvas.tsx",
          },
          {
            name: "Data Dashboard",
            description: "Analytics dashboard with filters and charts",
            file: "data-dashboard/HudDataDashboard.tsx",
          },
          {
            name: "E-Reader",
            description: "Book reading with TOC, bookmarks, themes",
            file: "e-reader/HudEReader.tsx",
          },
          {
            name: "Streaming/Broadcast",
            description: "OBS-style with scenes, chat, mixer, alerts",
            file: "streaming/HudStreaming.tsx",
          },
          {
            name: "Music Production",
            description: "DAW with transport, tracks, mixer",
            file: "music-production/HudMusicProduction.tsx",
          },
          {
            name: "Fitness Tracker",
            description: "Workout with heart rate, exercises, stats",
            file: "fitness-tracker/HudFitnessTracker.tsx",
          },
          {
            name: "Map/Navigation",
            description: "GPS with turn-by-turn, speed, POIs",
            file: "map-navigation/HudMapNavigation.tsx",
          },
          {
            name: "Photo Gallery",
            description: "Lightbox with thumbnails, EXIF, zoom",
            file: "photo-gallery/HudPhotoGallery.tsx",
          },
          {
            name: "Smart Home",
            description: "IoT control with rooms, devices, climate",
            file: "smart-home/HudSmartHome.tsx",
          },
          {
            name: "Kiosk/POS",
            description: "Point of sale with cart, products, payment",
            file: "kiosk-pos/HudKioskPos.tsx",
          },
          {
            name: "Terminal/Dev",
            description: "IDE-style with file tree, terminal, status",
            file: "terminal-dev/HudTerminalDev.tsx",
          },
          {
            name: "3D Viewer",
            description: "CAD viewer with layers, lighting, measurements",
            file: "3d-viewer/Hud3dViewer.tsx",
          },
        ].map((template) => (
          <Box
            key={template.name}
            sx={{
              p: 3,
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 2,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
              {template.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "white", opacity: 0.6, mb: 2 }}>
              {template.description}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "primary.main",
                fontFamily: "monospace",
                display: "block",
              }}
            >
              {template.file}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  ),
};
