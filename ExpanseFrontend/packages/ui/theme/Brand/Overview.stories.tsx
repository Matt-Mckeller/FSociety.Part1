import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Divider, useTheme, Chip } from "@mui/material"

/**
 * # Expanse Brand Design System
 *
 * The Expanse design system is built around themes of **progress**, **expansion**,
 * and **leveling up**. Our visual language draws from gaming, technology, and
 * psychology to create engaging, meaningful interfaces.
 *
 * ## Brand Pillars
 *
 * - **Progress**: Up and to the right motion, growth metaphors
 * - **Geometric**: Squares, circles, triangles - clean, precise
 * - **Minimalist**: Flat/vector art, focused design
 * - **Interactive**: Gamification, rewards, engagement
 *
 * ## The Signature Color
 *
 * **Purple (HSL 277)** is our signature brand color, representing:
 * - Creativity and innovation
 * - Wisdom and depth
 * - Premium quality
 *
 * Use the theme selector in the toolbar to explore all color variants.
 */
const meta: Meta = {
  title: "Brand/Overview",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
The Expanse Brand Design System provides consistent visual language across all applications.

**Key Characteristics:**
- Vector/flat art aesthetic
- Geometric shapes and clean lines
- Gamification elements (coins, progress, achievements)
- Purple as signature brand color
- Xpens custom typography
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

/**
 * Brand overview component showing core identity elements
 */
function BrandOverview() {
  const theme = useTheme()
  const isDark = theme.palette.mode === "dark"

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          color: theme.palette.primary.contrastText,
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
          Expanse Design System
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, mb: 3 }}>
          Progress. Expansion. Leveling Up.
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label="Geometric" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }} />
          <Chip label="Minimalist" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }} />
          <Chip label="Gamified" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }} />
          <Chip label="Accessible" sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "inherit" }} />
        </Box>
      </Paper>

      {/* Brand Pillars */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Brand Pillars
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 3, mb: 4 }}>
        <PillarCard
          title="Progress"
          description="Movement up and to the right. Growth, achievement, and continuous improvement."
          icon="📈"
        />
        <PillarCard
          title="Geometric"
          description="Clean shapes - squares, circles, triangles. Mathematical precision and clarity."
          icon="◆"
        />
        <PillarCard
          title="Minimalist"
          description="Flat vector art, focused design. Remove the unnecessary, keep the essential."
          icon="○"
        />
        <PillarCard
          title="Interactive"
          description="Gamification, rewards, engagement. Make every interaction meaningful."
          icon="🎮"
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Signature Color */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Signature Color: Purple
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", alignItems: "center" }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: 2,
              bgcolor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ color: theme.palette.primary.contrastText }}>
              HSL 277
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Why Purple?
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Purple has historically been associated with royalty, wisdom, and creativity.
              In the Expanse brand, it represents:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2 }}>
              <Typography component="li" variant="body2" color="text.secondary">
                <strong>Innovation</strong> - Pushing boundaries, exploring new ideas
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                <strong>Depth</strong> - Thoughtful, meaningful experiences
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                <strong>Premium</strong> - Quality and attention to detail
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Color Variants */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        Primary Color Scale
      </Typography>
      <Box sx={{ display: "flex", gap: 1, mb: 4, flexWrap: "wrap" }}>
        {[
          { name: "Dark", color: theme.palette.primary.dark },
          { name: "Main", color: theme.palette.primary.main },
          { name: "Light", color: theme.palette.primary.light },
        ].map(({ name, color }) => (
          <Box key={name} sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 80,
                height: 60,
                bgcolor: color,
                borderRadius: 1,
                mb: 0.5,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {name}
            </Typography>
            <Typography variant="caption" display="block" sx={{ fontFamily: "monospace", fontSize: "0.65rem" }}>
              {color}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Typography */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Typography: Xpens
      </Typography>
      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The Xpens font family represents clarity and precision. Fallback: Roboto, sans-serif.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h1" sx={{ fontSize: "2.5rem" }}>
            Aa Bb Cc Dd Ee Ff Gg
          </Typography>
          <Typography variant="h3">
            0123456789
          </Typography>
          <Typography variant="body1">
            The quick brown fox jumps over the lazy dog.
          </Typography>
        </Box>
      </Paper>

      {/* Design Symbols */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Brand Symbols
      </Typography>
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
        {[
          { symbol: "◼", name: "Square" },
          { symbol: "●", name: "Circle" },
          { symbol: "▲", name: "Triangle" },
          { symbol: "🪙", name: "Coin" },
          { symbol: "👑", name: "Crown" },
          { symbol: "🛡️", name: "Shield" },
          { symbol: "🎮", name: "Controller" },
          { symbol: "🏆", name: "Trophy" },
        ].map(({ symbol, name }) => (
          <Paper
            key={name}
            variant="outlined"
            sx={{
              p: 2,
              textAlign: "center",
              minWidth: 80,
            }}
          >
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {symbol}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {name}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Theme Modes */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Theme Modes
      </Typography>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Currently viewing: <strong>{isDark ? "Dark" : "Light"} Mode</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Use the <strong>Mode</strong> toggle in the Storybook toolbar to switch between light and dark themes.
          Use the <strong>Color Theme</strong> selector to explore all 6 color variants.
        </Typography>
      </Paper>
    </Box>
  )
}

/**
 * Pillar card component
 */
function PillarCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 3, height: "100%" }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        {icon}
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  )
}

/**
 * Main brand overview story
 */
export const Overview: StoryObj = {
  name: "Brand Overview",
  render: () => <BrandOverview />,
}

/**
 * Quick reference card
 */
export const QuickReference: StoryObj = {
  name: "Quick Reference",
  render: () => {
    const theme = useTheme()
    return (
      <Paper variant="outlined" sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Quick Reference
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">Primary Color</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
              {theme.palette.primary.main}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Background</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
              {theme.palette.background.default}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Text Primary</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
              {theme.palette.text.primary}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Font Family</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }}>
              Xpens, Roboto
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Base Spacing</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
              {theme.spacing(1)} (3px × 1)
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">Theme Mode</Typography>
            <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
              {theme.palette.mode}
            </Typography>
          </Box>
        </Box>
      </Paper>
    )
  },
}
