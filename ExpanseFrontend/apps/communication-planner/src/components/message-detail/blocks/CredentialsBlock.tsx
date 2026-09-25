"use client"

import { Box, Typography, Paper, alpha, useTheme, Grid } from "@mui/material"
import { EmojiEvents, SportsEsports, Star } from "@mui/icons-material"
import { ContentBlock } from "@/types"
import { BlockWrapper } from "./BlockWrapper"

interface CredentialsBlockProps {
  block: ContentBlock
}

interface ParsedCredential {
  game: string
  rank: string
  role?: string
}

export function CredentialsBlock({ block }: CredentialsBlockProps) {
  const theme = useTheme()
  const accentColor = theme.palette.primary.light

  // Parse credentials from content
  const parseCredentials = (content: string): ParsedCredential[] => {
    const credentials: ParsedCredential[] = []

    // Look for WoW mention
    const wowMatch = content.match(/top (\d+%)[^\d]*WoW[^,]*(?:as a ([^,]+))?/i)
    if (wowMatch) {
      credentials.push({
        game: "World of Warcraft",
        rank: `Top ${wowMatch[1]}`,
        role: wowMatch[2]?.trim(),
      })
    }

    // Look for LoL mention
    const lolMatch = content.match(
      /top ([\d.]+%)[^\d]*(?:league of legends|LoL)/i
    )
    if (lolMatch) {
      const roleMatch = content.match(/best with (\w+)/i)
      credentials.push({
        game: "League of Legends",
        rank: `Top ${lolMatch[1]}`,
        role: roleMatch?.[1],
      })
    }

    return credentials
  }

  const credentials = parseCredentials(block.content)

  return (
    <BlockWrapper
      block={block}
      icon={<EmojiEvents fontSize="small" />}
      typeLabel="Credentials"
      accentColor={accentColor}
      variant="warm"
    >
      {credentials.length > 0 ? (
        <Grid container spacing={2}>
          {credentials.map((cred, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  textAlign: "center",
                  bgcolor: alpha(accentColor, 0.05),
                  border: "1px solid",
                  borderColor: alpha(accentColor, 0.2),
                  borderRadius: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Badge ribbon effect */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${accentColor}, ${alpha(accentColor, 0.5)})`,
                  }}
                />

                <SportsEsports
                  sx={{
                    fontSize: 28,
                    color: accentColor,
                    mb: 0.5,
                  }}
                />

                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "text.secondary",
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  {cred.game}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    mb: 0.5,
                  }}
                >
                  <Star sx={{ fontSize: 14, color: accentColor }} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      color: accentColor,
                      fontSize: "1rem",
                    }}
                  >
                    {cred.rank}
                  </Typography>
                </Box>

                {cred.role && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      textTransform: "capitalize",
                    }}
                  >
                    {cred.role}
                  </Typography>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        // Fallback to plain text if parsing fails
        <Typography
          variant="body2"
          sx={{
            lineHeight: 1.7,
            color: "text.primary",
          }}
          dangerouslySetInnerHTML={{
            __html: block.content
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br />"),
          }}
        />
      )}
    </BlockWrapper>
  )
}
