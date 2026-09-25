import type { Meta, StoryObj } from "@storybook/react"
import { Box, Typography, Paper, Grid } from "@mui/material"

/**
 * Gallery of static assets available from the `expanse.staticAssets` package.
 * These assets are served at `/assets/*` paths in Storybook.
 */
const meta: Meta = {
  title: "Assets/Static Assets",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
}

export default meta

interface AssetCardProps {
  src: string
  label: string
  maxWidth?: number
}

const AssetCard = ({ src, label, maxWidth = 200 }: AssetCardProps) => (
  <Paper
    elevation={2}
    sx={{
      p: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Box
      sx={{
        width: maxWidth,
        height: maxWidth,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.100",
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={label}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </Box>
    <Typography
      variant="caption"
      component="code"
      sx={{
        bgcolor: "grey.200",
        px: 1,
        py: 0.5,
        borderRadius: 0.5,
        wordBreak: "break-all",
        textAlign: "center",
      }}
    >
      {src}
    </Typography>
  </Paper>
)

/**
 * Profile photos and general images from the images directory.
 */
export const Images: StoryObj = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item>
        <AssetCard
          src="/assets/images/Profile50_50_subtle_lines.png"
          label="Profile Subtle Lines (Primary)"
        />
      </Grid>
      <Grid item>
        <AssetCard
          src="/assets/images/Profile50_50_darker_lines.png"
          label="Profile Darker Lines (Variant)"
        />
      </Grid>
    </Grid>
  ),
}

/**
 * SVG vector graphics including logos.
 */
export const Vectors: StoryObj = {
  render: () => (
    <Grid container spacing={3}>
      <Grid item>
        <AssetCard
          src="/assets/vectors/logoBlack.svg"
          label="Logo Black"
          maxWidth={300}
        />
      </Grid>
    </Grid>
  ),
}

/**
 * Favicon assets in various sizes and formats for different platforms.
 */
export const Favicons: StoryObj = {
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        App Icons
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <img
              src="/assets/favicon/android-chrome-512x512.png"
              alt="Chrome 512"
              style={{ width: 128 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              android-chrome-512x512.png
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <img
              src="/assets/favicon/android-chrome-192x192.png"
              alt="Chrome 192"
              style={{ width: 96 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              android-chrome-192x192.png
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <img
              src="/assets/favicon/apple-touch-icon.png"
              alt="Apple Touch"
              style={{ width: 90 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              apple-touch-icon.png
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Favicons
      </Typography>
      <Grid container spacing={3} alignItems="flex-end">
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <img
              src="/assets/favicon/favicon-32x32.png"
              alt="Favicon 32"
              style={{ width: 32 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              favicon-32x32.png
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <img
              src="/assets/favicon/favicon-16x16.png"
              alt="Favicon 16"
              style={{ width: 16 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              favicon-16x16.png
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <img
              src="/assets/favicon/mstile-150x150.png"
              alt="MS Tile"
              style={{ width: 75 }}
            />
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              mstile-150x150.png
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Other Favicon Files
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <code>/assets/favicon/favicon.ico</code> - Main favicon
        <br />
        <code>/assets/favicon/safari-pinned-tab.svg</code> - Safari pinned tab
        icon
        <br />
        <code>/assets/favicon/site.webmanifest</code> - Web app manifest
        <br />
        <code>/assets/favicon/browserconfig.xml</code> - Microsoft browser
        config
      </Typography>
    </Box>
  ),
}

/**
 * Open Graph images for social media sharing.
 */
export const OpenGraph: StoryObj = {
  render: () => (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Open Graph images are used when sharing links on social media platforms.
        Recommended size: 1200x630px.
      </Typography>
      <Paper elevation={2} sx={{ p: 2, display: "inline-block" }}>
        <img
          src="/assets/openGraph/ogImageSimple.jpg"
          alt="OG Image"
          style={{ maxWidth: 600, width: "100%" }}
        />
        <Typography
          variant="caption"
          display="block"
          sx={{ mt: 1, textAlign: "center" }}
        >
          <code>/assets/openGraph/ogImageSimple.jpg</code>
        </Typography>
      </Paper>
    </Box>
  ),
}

/**
 * Quick reference for all available asset paths.
 */
export const PathReference: StoryObj = {
  render: () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Asset Path Reference
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Copy these paths to use in your components. All paths are relative to
        the Storybook root.
      </Typography>

      <Paper sx={{ p: 2, bgcolor: "grey.900", color: "grey.100" }}>
        <pre style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          {`// Images
/assets/images/Profile50_50_subtle_lines.png
/assets/images/Profile50_50_darker_lines.png

// Vectors
/assets/vectors/logoBlack.svg

// Favicons
/assets/favicon/favicon.ico
/assets/favicon/favicon-16x16.png
/assets/favicon/favicon-32x32.png
/assets/favicon/apple-touch-icon.png
/assets/favicon/android-chrome-192x192.png
/assets/favicon/android-chrome-512x512.png
/assets/favicon/mstile-150x150.png
/assets/favicon/safari-pinned-tab.svg
/assets/favicon/site.webmanifest
/assets/favicon/browserconfig.xml

// Open Graph
/assets/openGraph/ogImageSimple.jpg`}
        </pre>
      </Paper>
    </Box>
  ),
}
