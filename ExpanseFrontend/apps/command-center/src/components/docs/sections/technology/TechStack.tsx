/**
 * Tech Stack Section
 *
 * Technology stack organized by category.
 * Migrated from DocsView.tsx renderTechStack()
 */

import { Typography, Card, CardContent, Box, Chip, Grid } from "@mui/material"
import { DocSection } from "../../common"
import { technology } from "../../../../data/docs"
import type { TechStackItem } from "../../../../types/docs"

const stackCategories = [
  { key: "languages", label: "💻 Languages" },
  { key: "frameworks", label: "🏗️ Frameworks" },
  { key: "database", label: "🗄️ Database" },
  { key: "apis", label: "🔌 APIs" },
  { key: "infrastructure", label: "☁️ Infrastructure" },
  { key: "ui", label: "🎨 UI Libraries" },
  { key: "testing", label: "🧪 Testing" },
  { key: "tools", label: "🛠️ Tools" },
  { key: "ai", label: "🤖 AI / LLMs" },
  { key: "communications", label: "📱 Communications" },
] as const

export default function TechStack() {
  return (
    <DocSection title="Tech Stack" icon="💻">
      <Grid container spacing={3}>
        {stackCategories.map(({ key, label }) => (
          <Grid item xs={12} md={6} key={key}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  {label}
                </Typography>
                {(
                  technology.stack[key as keyof typeof technology.stack] as
                    | TechStackItem[]
                    | undefined
                )?.map((item) => (
                  <Box
                    key={item.name}
                    sx={{
                      mb: 2,
                      pl: 2,
                      borderLeft: 2,
                      borderColor: "primary.main",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.name}
                      </Typography>
                      {item.primary && (
                        <Chip label="Primary" size="small" color="success" />
                      )}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {item.category}
                    </Typography>
                    {item.note && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        Note: {item.note}
                      </Typography>
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DocSection>
  )
}
