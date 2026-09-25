"use client";

/**
 * PermissionsHud — Aion Console / AI permissions on the HUD left action rail.
 *
 * Rail pill (same family as Spellbook / Pipeline) with eye mark + total badge.
 * Hover tooltip lists On / Ask / Auto counts; click opens the detail panel.
 *
 * `PermissionsHudRegistrar` registers into the left rail via
 * `useRegisterLeftRailItem` and is mounted once at the shell.
 */

import * as React from "react";
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  RAIL_PILL_BACKGROUND,
  RAIL_PILL_RADIUS,
  RAIL_PILL_SHADOW,
  RAIL_PILL_SHADOW_ACTIVE,
  RAIL_PILL_SIZE,
  useRegisterLeftRailItem,
} from "@expanse/hud";

import {
  PERMISSION_LEVEL_COLORS,
  PERMISSION_LEVEL_INK,
  PERMISSION_LEVEL_LABELS,
  categoryMatches,
  displayCategoryLabel,
  displaySectionLabel,
  getSections,
  sectionMatches,
  type AiPermission,
  type PermissionLevel,
} from "@4eye/web/Tiles/technical/model/ai-permissions";
import {
  PermissionCategoryIcon,
  PermissionLevelIcon,
  PermissionSectionIcon,
} from "@4eye/web/Tiles/technical/model/ai-permission-icons";
import { useAiPermissionsDisplay } from "@4eye/web/Tiles/technical/hooks/useAiPermissionsDisplay";
import { FourEyeMark } from "@4eye/web/Tiles/technical/login/FourEyeMark";

const ACCENT = "#c4b5fd"; // soft violet — readable on dark glass
const INK = "#f1f5f9"; // primary text
const INK_MUTED = alpha("#e2e8f0", 0.72); // descriptions / secondary
const INK_DIM = alpha("#cbd5e1", 0.48); // section labels, empty states
const AION_LABEL = "Aion Console";

function shortLabel(label: string): string {
  const t = label.trim();
  if (t.startsWith("character.")) return t.slice("character.".length);
  if (t.length > 28) return `${t.slice(0, 26)}…`;
  return t || "Untitled";
}

function isAionSection(section: string): boolean {
  return displaySectionLabel(section) === AION_LABEL;
}

function TooltipBody({
  on,
  ask,
  auto,
  locked,
}: {
  on: AiPermission[];
  ask: AiPermission[];
  auto: AiPermission[];
  locked: boolean;
}) {
  const empty = on.length === 0 && ask.length === 0 && auto.length === 0;

  if (empty) {
    return (
      <Box sx={{ maxWidth: 220, py: 0.25, color: INK }}>
        <Typography variant="caption" sx={{ fontWeight: 700, display: "block", color: ACCENT }}>
          {AION_LABEL}
        </Typography>
        <Typography variant="caption" sx={{ color: INK_MUTED, display: "block" }}>
          No Auto, Ask, or On permissions set.
        </Typography>
      </Box>
    );
  }

  const groups: { level: PermissionLevel; items: AiPermission[] }[] = [
    { level: 2, items: on },
    { level: 1, items: ask },
    { level: 0, items: auto },
  ];

  return (
    <Box sx={{ maxWidth: 260, py: 0.25, color: INK }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, letterSpacing: 0.6, display: "block", mb: 0.5, color: ACCENT }}
      >
        {AION_LABEL} · {on.length + ask.length + auto.length} set
      </Typography>
      {groups.map(({ level, items }, i) =>
        items.length > 0 ? (
          <Box key={level} sx={{ mb: i < groups.length - 1 ? 0.75 : 0 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: PERMISSION_LEVEL_COLORS[level],
                display: "flex",
                alignItems: "center",
                gap: 0.35,
                mb: 0.25,
              }}
            >
              <PermissionLevelIcon level={level} fontSize={11} />
              {PERMISSION_LEVEL_LABELS[level]} · {items.length}
            </Typography>
            {items.map((p) => (
              <Typography
                key={p.id}
                variant="caption"
                sx={{ display: "block", color: INK_MUTED, lineHeight: 1.4 }}
              >
                · {shortLabel(p.label)}
              </Typography>
            ))}
          </Box>
        ) : null,
      )}
      {locked && (
        <Typography
          variant="caption"
          sx={{ display: "block", mt: 0.75, color: INK_DIM, fontStyle: "italic" }}
        >
          Showing preset — unlock Settings to sync live values.
        </Typography>
      )}
    </Box>
  );
}

function LevelChip({ level }: { level: PermissionLevel }) {
  const color = PERMISSION_LEVEL_COLORS[level];
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.3,
        px: 0.55,
        py: 0.15,
        borderRadius: 1,
        bgcolor: color,
        color: PERMISSION_LEVEL_INK[level],
        fontSize: "0.55rem",
        fontWeight: 800,
        letterSpacing: 0.2,
        flexShrink: 0,
      }}
    >
      <PermissionLevelIcon level={level} fontSize={11} />
      {PERMISSION_LEVEL_LABELS[level]}
    </Box>
  );
}

function PermissionLine({ permission }: { permission: AiPermission }) {
  const level = permission.level;
  const color = level !== undefined ? PERMISSION_LEVEL_COLORS[level] : "#94a3b8";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 1,
        px: 0.85,
        py: 0.55,
        borderRadius: 1.25,
        border: "1px solid",
        borderColor: alpha(color, 0.18),
        bgcolor: alpha(color, 0.04),
        borderLeft: `2px solid ${alpha(color, 0.65)}`,
      }}
      title={permission.description || permission.label}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.65, minWidth: 0 }}>
        <Box sx={{ display: "flex", color: alpha(color, 0.9), mt: 0.15, flexShrink: 0 }}>
          <PermissionSectionIcon section={permission.section} fontSize={13} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, lineHeight: 1.3, display: "block", color: INK }}
          >
            {shortLabel(permission.label)}
          </Typography>
          {permission.description?.trim() && (
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: INK_MUTED,
                lineHeight: 1.35,
                fontSize: "0.62rem",
                mt: 0.15,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: 180,
              }}
            >
              {permission.description.trim()}
            </Typography>
          )}
        </Box>
      </Box>
      {level !== undefined ? (
        <LevelChip level={level} />
      ) : (
        <Typography variant="caption" sx={{ color: INK_DIM, fontWeight: 700, fontSize: "0.55rem" }}>
          —
        </Typography>
      )}
    </Box>
  );
}

function DetailPanel({
  categories,
  permissions,
  onCollapse,
  highlightSection,
}: {
  categories: string[];
  permissions: AiPermission[];
  onCollapse: () => void;
  highlightSection?: string;
}) {
  const [activeCat, setActiveCat] = React.useState(() => {
    if (highlightSection) {
      const hit = permissions.find((p) => isAionSection(p.section) || p.section === highlightSection);
      if (hit) return displayCategoryLabel(hit.category);
    }
    return categories.includes(AION_LABEL) ? AION_LABEL : (categories[0] ?? "");
  });

  const catPerms = permissions.filter((p) => categoryMatches(p.category, activeCat));
  const sections = getSections(permissions, activeCat);

  return (
    <Box
      sx={{
        width: 300,
        maxHeight: "min(52vh, 420px)",
        display: "flex",
        flexDirection: "column",
        color: INK,
        background: `
          radial-gradient(ellipse at 20% 0%, ${alpha(ACCENT, 0.14)} 0%, transparent 55%),
          rgba(6,10,18,0.96)
        `,
        backdropFilter: "blur(24px)",
        border: "1px solid",
        borderColor: alpha(ACCENT, 0.38),
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: `0 12px 40px ${alpha("#000", 0.45)}, 0 0 0 1px ${alpha(ACCENT, 0.08)}`,
        animation: "permHudIn 0.28s cubic-bezier(0.34,1.2,0.64,1)",
        "@keyframes permHudIn": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1.25,
          py: 0.85,
          borderBottom: "1px solid",
          borderColor: alpha(ACCENT, 0.2),
          flexShrink: 0,
        }}
      >
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <BoltRoundedIcon sx={{ fontSize: 15, color: ACCENT }} />
          <Typography
            sx={{
              fontFamily: "monospace",
              fontWeight: 800,
              fontSize: "0.68rem",
              letterSpacing: 1.2,
              color: ACCENT,
            }}
          >
            AI PERMISSIONS
          </Typography>
        </Stack>
        <Box
          component="button"
          aria-label="Collapse permissions"
          onClick={onCollapse}
          sx={{
            all: "unset",
            cursor: "pointer",
            display: "flex",
            p: 0.35,
            borderRadius: 1,
            color: INK_MUTED,
            "&:hover": { color: INK, bgcolor: alpha(ACCENT, 0.14) },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 14 }} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 0.4,
          px: 1,
          py: 0.75,
          borderBottom: "1px solid",
          borderColor: alpha("#fff", 0.06),
          overflowX: "auto",
          flexShrink: 0,
        }}
      >
        {categories.map((cat) => {
          const active = cat === activeCat;
          return (
            <Box
              key={cat}
              component="button"
              onClick={() => setActiveCat(cat)}
              sx={{
                all: "unset",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 0.45,
                px: 0.9,
                py: 0.35,
                borderRadius: 1.25,
                fontSize: "0.65rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
                color: active ? "#1e1b4b" : INK_MUTED,
                bgcolor: active ? ACCENT : alpha("#fff", 0.04),
                border: "1px solid",
                borderColor: active ? ACCENT : "transparent",
                "&:hover": {
                  color: active ? "#1e1b4b" : INK,
                  bgcolor: active ? ACCENT : alpha("#fff", 0.08),
                },
              }}
            >
              <PermissionCategoryIcon
                category={cat}
                size={12}
                color={active ? "#1e1b4b" : alpha(INK, 0.75)}
                gleam={active ? "#1e1b4b" : ACCENT}
              />
              {cat}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, overflowY: "auto", px: 1, py: 1 }}>
        <Stack spacing={1.25}>
          {sections.map((section) => {
            const rows = catPerms.filter((p) => sectionMatches(p.section, section));
            const highlight = sectionMatches(section, highlightSection ?? "");
            return (
              <Box key={section}>
                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 0.55 }}>
                  <Box
                    sx={{
                      display: "flex",
                      color: highlight ? ACCENT : alpha(ACCENT, 0.75),
                      flexShrink: 0,
                    }}
                  >
                    <PermissionSectionIcon section={section} fontSize={12} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.55rem",
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: highlight ? ACCENT : INK_DIM,
                    }}
                  >
                    {section}
                  </Typography>
                </Stack>
                <Stack spacing={0.45}>
                  {rows.map((p) => (
                    <PermissionLine key={p.id} permission={p} />
                  ))}
                </Stack>
              </Box>
            );
          })}
          {catPerms.length === 0 && (
            <Typography variant="caption" sx={{ color: INK_DIM, fontStyle: "italic" }}>
              No permissions in this category.
            </Typography>
          )}
        </Stack>
      </Box>
    </Box>
  );
}

function PermissionsRailButton() {
  const { status, data, categories, aionOn, aionAsk, aionAuto } = useAiPermissionsDisplay();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement | null>(null);
  const locked = status === "locked";
  const total = aionOn.length + aionAsk.length + aionAuto.length;

  const levels: { level: PermissionLevel; count: number }[] = [
    { level: 2, count: aionOn.length },
    { level: 1, count: aionAsk.length },
    { level: 0, count: aionAuto.length },
  ];

  return (
    <>
      <Tooltip
        title={
          open ? (
            ""
          ) : (
            <TooltipBody
              on={aionOn}
              ask={aionAsk}
              auto={aionAuto}
              locked={locked}
            />
          )
        }
        placement="right"
        enterDelay={280}
        disableHoverListener={open}
        slotProps={{
          tooltip: {
            sx: {
              bgcolor: "rgba(6,10,18,0.97)",
              color: INK,
              border: `1px solid ${alpha(ACCENT, 0.35)}`,
              maxWidth: 280,
              boxShadow: `0 8px 28px ${alpha("#000", 0.4)}`,
            },
          },
        }}
      >
        <ButtonBase
          ref={anchorRef}
          onClick={() => setOpen((v) => !v)}
          aria-label={AION_LABEL}
          aria-expanded={open}
          sx={{
            position: "relative",
            width: RAIL_PILL_SIZE,
            height: RAIL_PILL_SIZE,
            borderRadius: RAIL_PILL_RADIUS,
            color: "#fff",
            background: RAIL_PILL_BACKGROUND,
            boxShadow: open ? RAIL_PILL_SHADOW_ACTIVE : RAIL_PILL_SHADOW,
            transition: "box-shadow 150ms ease",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.2,
          }}
        >
          <FourEyeMark size={22} />
          <Stack direction="row" spacing={0.25} sx={{ lineHeight: 1 }}>
            {levels.map(({ level, count }) => (
              <Box
                key={level}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.1,
                  fontSize: "0.48rem",
                  fontWeight: 800,
                  color: PERMISSION_LEVEL_COLORS[level],
                  opacity: count > 0 ? 1 : 0.35,
                }}
              >
                {count}
              </Box>
            ))}
          </Stack>
          {total > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                minWidth: 14,
                height: 14,
                px: 0.3,
                borderRadius: 7,
                bgcolor: PERMISSION_LEVEL_COLORS[2],
                color: PERMISSION_LEVEL_INK[2],
                fontSize: "0.5rem",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              {total}
            </Box>
          )}
        </ButtonBase>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="right-start"
        modifiers={[{ name: "offset", options: { offset: [0, 12] } }]}
        style={{ zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper elevation={12} sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "transparent" }}>
            <DetailPanel
              categories={categories}
              permissions={data.permissions}
              highlightSection={AION_LABEL}
              onCollapse={() => setOpen(false)}
            />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}

/**
 * Registers the Aion Console permissions pill into the HUD left rail.
 * `order: 11` sits between Spellbook (`10`) and AI Chat pipeline (`12`).
 */
export function PermissionsHudRegistrar() {
  const node = React.useMemo(() => <PermissionsRailButton />, []);
  useRegisterLeftRailItem({
    id: "permissions-rail",
    order: 11,
    node,
    label: AION_LABEL,
  });
  return null;
}

/** @deprecated Prefer {@link PermissionsHudRegistrar} — kept as an alias. */
export function PermissionsHud() {
  return <PermissionsHudRegistrar />;
}
