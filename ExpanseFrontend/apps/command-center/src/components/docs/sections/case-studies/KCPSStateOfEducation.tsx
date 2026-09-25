/**
 * KCPS State of Education Section
 *
 * The systemic thesis behind the whole KCPS case study - deliberately the
 * one loud, angry, hard-edged section on this page. Everywhere else on the
 * KCPS pages uses a muted, "sad" palette (see kcpsPalette.ts); this section
 * intentionally breaks from that with near-black/blood-red colors and
 * squared-off corners instead of the soft rounded cards used elsewhere.
 *
 * Does not reuse RewardHero - its rounded corners and soft blurred blobs are
 * shared with every other doc page, so this hero is hand-rolled instead.
 */
import { Typography, Box } from "@mui/material"
import { alpha } from "@mui/material/styles"
import WhatshotRounded from "@mui/icons-material/WhatshotRounded"
import { DocSection } from "../../common"
import { caseStudies } from "../../../../data/docs"
import { ANGRY_BLACK, ANGRY_RED, ANGRY_RED_BRIGHT } from "./kcpsPalette"

export default function KCPSStateOfEducation() {
  const { headline, subtitle, statements, closingStatement } =
    caseStudies.stateOfEducation

  return (
    <DocSection title="State of Education" icon="🔥">
      {/* Hero - hard corners, no soft blobs, near-black into blood red */}
      <Box
        sx={{
          borderRadius: 0,
          border: "2px solid",
          borderColor: ANGRY_RED_BRIGHT,
          px: { xs: 3, sm: 4 },
          py: { xs: 3, sm: 4 },
          mb: 3,
          background: `linear-gradient(135deg, ${ANGRY_BLACK} 0%, ${ANGRY_RED} 100%)`,
          boxShadow: `0 0 0 1px ${alpha(ANGRY_RED_BRIGHT, 0.35)}`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha(ANGRY_RED_BRIGHT, 0.2),
              border: "1px solid",
              borderColor: alpha(ANGRY_RED_BRIGHT, 0.6),
              color: "#FFFFFF",
              flexShrink: 0,
              "& .MuiSvgIcon-root": { fontSize: "2rem" },
            }}
          >
            <WhatshotRounded />
          </Box>
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                lineHeight: 1.2,
              }}
            >
              {headline}
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.82)", mt: 0.5 }}>
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Statements - stacked, squared-off blocks */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
        {statements.map((statement, i) => (
          <Box
            key={i}
            sx={{
              borderRadius: 0,
              borderLeft: "4px solid",
              borderColor: ANGRY_RED_BRIGHT,
              bgcolor: "#141414",
              px: 2.5,
              py: 1.75,
            }}
          >
            <Typography
              variant="body1"
              fontWeight={600}
              sx={{ color: "#F4F4F5" }}
            >
              {statement}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Closing statement - full-bleed banner */}
      <Box
        sx={{
          borderRadius: 0,
          px: { xs: 2.5, sm: 3.5 },
          py: 2.5,
          bgcolor: ANGRY_RED,
          border: "1px solid",
          borderColor: ANGRY_RED_BRIGHT,
        }}
      >
        <Typography
          variant="body1"
          fontWeight={700}
          sx={{ color: "#FFFFFF", lineHeight: 1.6 }}
        >
          {closingStatement}
        </Typography>
      </Box>
    </DocSection>
  )
}
