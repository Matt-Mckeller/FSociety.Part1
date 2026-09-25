"use client";

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  IconButton,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import SelfImprovementRoundedIcon from "@mui/icons-material/SelfImprovementRounded";
import AutoModeRoundedIcon from "@mui/icons-material/AutoModeRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";

import {
  PERMISSION_LEVEL_COLORS,
  PERMISSION_LEVEL_INK,
  PERMISSION_LEVEL_LABELS,
  getCategoryOrder,
  getSections,
  type AiPermission,
  type AiPermissionsData,
  type PermissionLevel,
} from "../model/ai-permissions";
import { buildCovenant } from "./covenant";
import { FourEyeMark } from "./FourEyeMark";

const LEVEL_ICONS: Record<PermissionLevel, React.ReactElement> = {
  0: <AutoModeRoundedIcon sx={{ fontSize: 12 }} />,
  1: <HelpOutlineRoundedIcon sx={{ fontSize: 12 }} />,
  2: <PowerSettingsNewRoundedIcon sx={{ fontSize: 12 }} />,
};

const ACTIONS = [
  "Sit as the seated 4eye — spine long, hands resting, jaw unhooked.",
  "Breathe four counts in, four hold, four out. Four rounds, with the mark.",
  "Close the outer lids. Hold the four-eye diamond until it is the only image.",
  "Speak the highlighted covenant aloud. Mean every setting you enter with.",
  "Open the inner eye through the center of the mark. Enter 4eye.",
];

export function LoginScreen({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Pick<AiPermissionsData, "permissions" | "categoryOrder">;
}) {
  const theme = useTheme();
  const [entered, setEntered] = React.useState(false);
  const covenant = React.useMemo(() => buildCovenant(data), [data]);
  const categories = React.useMemo(
    () => getCategoryOrder({ version: 1, ...data }),
    [data],
  );
  const eye = theme.palette.info?.main ?? "#22d3ee";

  React.useEffect(() => {
    if (!open) setEntered(false);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      slotProps={{
        paper: {
          sx: {
            bgcolor: "background.default",
            backgroundImage: `
              radial-gradient(ellipse at 50% 18%, ${alpha(eye, 0.16)} 0%, transparent 46%),
              radial-gradient(ellipse at 50% 100%, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 42%)
            `,
            color: "text.primary",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { zero: 2, tablet: 3 },
            py: 1.5,
            flexShrink: 0,
          }}
        >
          <Stack spacing={0.15}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 1.6, fontWeight: 800, color: alpha(eye, 0.9), lineHeight: 1.2 }}
            >
              Log in to 4eye
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Meditate the covenant. Enter with the settings you selected.
            </Typography>
          </Stack>
          <IconButton aria-label="Close login" onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            px: { zero: 2, tablet: 3 },
            pb: 3,
          }}
        >
          <Stack
            spacing={3}
            sx={{ maxWidth: 880, mx: "auto", alignItems: "center", pt: 1 }}
          >
            <Stack spacing={1} sx={{ alignItems: "center", textAlign: "center" }}>
              <FourEyeMark size={entered ? 188 : 220} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, letterSpacing: 0.2, mt: 0.5 }}
              >
                {entered ? "You are in 4eye." : "Visualize this mark"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", maxWidth: 420, lineHeight: 1.45 }}
              >
                {entered
                  ? "The four eyes are open. Your selected settings are the terms of this session."
                  : "Four eyes in a diamond, a portal at the crossing. Close the outer lids and hold this until it is the only image."}
              </Typography>
            </Stack>

            {!entered && (
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  gap: 1.5,
                  gridTemplateColumns: { zero: "1fr", tablet: "1fr 1fr" },
                }}
              >
                <GuideCard
                  icon={<RecordVoiceOverRoundedIcon sx={{ fontSize: 18, color: eye }} />}
                  label="Words to say"
                  accent={eye}
                >
                  <Stack spacing={1.25}>
                    <Stack spacing={0.35}>
                      {covenant.mantra.map((line) => (
                        <Typography
                          key={line}
                          variant="body2"
                          sx={{ fontWeight: 700, fontStyle: "italic", lineHeight: 1.45 }}
                        >
                          “{line}”
                        </Typography>
                      ))}
                    </Stack>
                    {covenant.stanzas.map((stanza) => (
                      <Box key={stanza.category}>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 800,
                            letterSpacing: 0.7,
                            textTransform: "uppercase",
                            color: "text.secondary",
                            display: "block",
                            mb: 0.4,
                          }}
                        >
                          {stanza.category}
                        </Typography>
                        <Stack spacing={0.45}>
                          {stanza.lines.map((line) => (
                            <Typography
                              key={line.text}
                              variant="body2"
                              sx={{
                                color: PERMISSION_LEVEL_COLORS[line.level],
                                fontWeight: line.level === 2 ? 700 : 600,
                                lineHeight: 1.45,
                                opacity: line.level === 0 ? 0.7 : 1,
                              }}
                            >
                              “{line.text}”
                            </Typography>
                          ))}
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </GuideCard>

                <GuideCard
                  icon={<SelfImprovementRoundedIcon sx={{ fontSize: 18, color: eye }} />}
                  label="Actions to take"
                  accent={eye}
                >
                  <Stack spacing={1.1} component="ol" sx={{ m: 0, pl: 0, listStyle: "none" }}>
                    {ACTIONS.map((step, i) => (
                      <Box
                        key={step}
                        component="li"
                        sx={{ display: "flex", gap: 1.1, alignItems: "flex-start" }}
                      >
                        <Box
                          sx={{
                            flexShrink: 0,
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "0.68rem",
                            fontWeight: 800,
                            color: eye,
                            border: "1px solid",
                            borderColor: alpha(eye, 0.45),
                            bgcolor: alpha(eye, 0.08),
                            mt: 0.1,
                          }}
                        >
                          {i + 1}
                        </Box>
                        <Typography variant="body2" sx={{ lineHeight: 1.45 }}>
                          {step}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </GuideCard>
              </Box>
            )}

            <Box sx={{ width: "100%" }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", justifyContent: "space-between", mb: 1.25, flexWrap: "wrap", gap: 1 }}
              >
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                  <VisibilityRoundedIcon sx={{ fontSize: 16, color: eye }} />
                  <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: 0.6, textTransform: "uppercase" }}>
                    Settings you enter with
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ flexWrap: "wrap" }}>
                  {([2, 1, 0] as PermissionLevel[]).map((lvl) => (
                    <Chip
                      key={lvl}
                      size="small"
                      icon={LEVEL_ICONS[lvl]}
                      label={`${covenant.counts[lvl]} ${PERMISSION_LEVEL_LABELS[lvl]}`}
                      sx={{
                        height: 24,
                        fontWeight: 800,
                        fontSize: "0.68rem",
                        color: PERMISSION_LEVEL_INK[lvl],
                        bgcolor: PERMISSION_LEVEL_COLORS[lvl],
                        border: "1px solid",
                        borderColor: PERMISSION_LEVEL_COLORS[lvl],
                        "& .MuiChip-icon": { color: PERMISSION_LEVEL_INK[lvl], ml: 0.6 },
                      }}
                    />
                  ))}
                  {covenant.unset > 0 && (
                    <Chip
                      size="small"
                      label={`${covenant.unset} unset`}
                      sx={{
                        height: 22,
                        fontWeight: 700,
                        fontSize: "0.68rem",
                        color: "text.secondary",
                        bgcolor: alpha("#64748b", 0.12),
                        border: "1px solid",
                        borderColor: alpha("#64748b", 0.3),
                      }}
                    />
                  )}
                </Stack>
              </Stack>

              <Stack spacing={1.5}>
                {categories.map((category) => {
                  const group = data.permissions.filter((p) => p.category === category);
                  const sections = getSections(data.permissions, category);
                  if (group.length === 0) return null;
                  return (
                    <Box key={category}>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 800,
                          letterSpacing: 0.7,
                          textTransform: "uppercase",
                          color: "text.secondary",
                          display: "block",
                          mb: 0.75,
                        }}
                      >
                        {category}
                      </Typography>
                      <Stack spacing={0.85}>
                        {sections.map((section) => (
                          <Box
                            key={section}
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.65, alignItems: "center" }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: "text.disabled", fontWeight: 700, mr: 0.4, minWidth: 72 }}
                            >
                              {section}
                            </Typography>
                            {group
                              .filter((p) => p.section === section)
                              .map((p) => (
                                <SettingChip key={p.id} permission={p} />
                              ))}
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </Box>

            <Button
              size="large"
              variant="contained"
              onClick={entered ? onClose : () => setEntered(true)}
              startIcon={entered ? undefined : <LoginRoundedIcon />}
              sx={{
                px: 3.5,
                py: 1.15,
                fontWeight: 800,
                letterSpacing: 0.4,
                bgcolor: eye,
                color: "#041016",
                boxShadow: `0 0 28px ${alpha(eye, 0.35)}`,
                "&:hover": { bgcolor: eye, filter: "brightness(1.08)" },
              }}
            >
              {entered ? "Close" : "Enter 4eye"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
}

function GuideCard({
  icon,
  label,
  accent,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: alpha(accent, 0.22),
        bgcolor: alpha(accent, 0.04),
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", mb: 1.25 }}>
        {icon}
        <Typography
          variant="caption"
          sx={{ fontWeight: 800, letterSpacing: 0.8, textTransform: "uppercase" }}
        >
          {label}
        </Typography>
      </Stack>
      {children}
    </Box>
  );
}

function SettingChip({ permission }: { permission: AiPermission }) {
  const level = permission.level;
  const color = level === undefined ? "#64748b" : PERMISSION_LEVEL_COLORS[level];
  const ink = level === undefined ? "#e2e8f0" : PERMISSION_LEVEL_INK[level];
  const solid = level !== undefined;
  const label = permission.label.trim() || "Untitled";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        px: 0.9,
        py: 0.35,
        borderRadius: 1.25,
        border: "1px solid",
        borderColor: solid ? color : alpha(color, 0.4),
        bgcolor: solid ? color : alpha(color, 0.1),
        color: solid ? ink : color,
        opacity: level === undefined ? 0.45 : 1,
      }}
      title={permission.description || label}
    >
      {level !== undefined && (
        <Box sx={{ display: "flex", color: "inherit", opacity: 0.9 }}>
          {LEVEL_ICONS[level]}
        </Box>
      )}
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, color: "inherit", lineHeight: 1.2 }}
      >
        {label}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          fontWeight: 800,
          fontSize: "0.58rem",
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: "inherit",
          opacity: solid ? 0.85 : 0.9,
        }}
      >
        {level === undefined ? "—" : PERMISSION_LEVEL_LABELS[level]}
      </Typography>
    </Box>
  );
}
