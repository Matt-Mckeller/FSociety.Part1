"use client";

/**
 * EntityContextSwitcher — searchable dropdown that sets which entity's plan
 * is currently being viewed. Defaults to "Self" (null context).
 *
 * Sections:
 *   • Self (the current user)
 *   • People (crew members)
 *   • Locations, Organizations, Teams (from the planning entity graph)
 */

import * as React from "react";
import {
  Box,
  ButtonBase,
  Chip,
  InputBase,
  Popover,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CorporateFareRoundedIcon from "@mui/icons-material/CorporateFareRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import type { Entity } from "@4eye/types";

import { useCommandCenter, type EntityContext } from "../store/CommandCenterProvider";
import { CREW } from "../store/crew";
import { CrewAvatar } from "./CrewAvatar";

type EntitySection = {
  label: string;
  icon: React.ReactNode;
  items: Array<{ id: string; name: string; subtitle?: string; context: EntityContext | null }>;
};

const TYPE_LABELS: Record<string, string> = {
  location: "Location",
  organization: "Organization",
  team: "Team",
};

function typeIcon(type: string, size = 16): React.ReactNode {
  const sx = { fontSize: size, color: "text.secondary" };
  if (type === "location") return <LocationOnRoundedIcon sx={sx} />;
  if (type === "organization") return <CorporateFareRoundedIcon sx={sx} />;
  if (type === "team") return <GroupsRoundedIcon sx={sx} />;
  return <PersonRoundedIcon sx={sx} />;
}

function typeBadgeColor(type: string): string {
  if (type === "location") return "#22d3ee";
  if (type === "organization") return "#a78bfa";
  if (type === "team") return "#34d399";
  return "#94a3b8";
}

export function EntityContextSwitcher() {
  const theme = useTheme();
  const { state, store, setEntityContext } = useCommandCenter();
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);
  const [query, setQuery] = React.useState("");

  const open = Boolean(anchor);
  const active = state.activeEntityContext;

  // Build sections from entity graph
  const sections = React.useMemo<EntitySection[]>(() => {
    const nonPersonEntities = store
      .allEntities()
      .filter((e): e is Entity =>
        e.type === "location" || e.type === "organization" || e.type === "team",
      );

    const byType: Record<string, Entity[]> = {};
    for (const e of nonPersonEntities) {
      (byType[e.type] ??= []).push(e);
    }

    const result: EntitySection[] = [
      {
        label: "People",
        icon: <PersonRoundedIcon sx={{ fontSize: 14 }} />,
        items: CREW.map((m) => ({
          id: m.id,
          name: m.name,
          subtitle: m.crewTier === "t2" ? `@${m.username} · T2` : `@${m.username}`,
          context: { id: m.id, type: "profile", name: m.name },
        })),
      },
    ];

    for (const [type, entities] of Object.entries(byType)) {
      result.push({
        label: TYPE_LABELS[type] ?? type,
        icon: typeIcon(type, 14),
        items: entities.map((e) => ({
          id: e.id,
          name: e.name,
          subtitle: TYPE_LABELS[type],
          context: { id: e.id, type: e.type, name: e.name },
        })),
      });
    }

    return result;
  }, [store]);

  const filteredSections = React.useMemo(() => {
    if (!query.trim()) return sections;
    const q = query.toLowerCase();
    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.subtitle?.toLowerCase().includes(q),
        ),
      }))
      .filter((s) => s.items.length > 0);
  }, [sections, query]);

  function select(context: EntityContext | null) {
    setEntityContext(context);
    setAnchor(null);
    setQuery("");
  }

  const buttonLabel = active ? active.name : "Self";
  const buttonType = active?.type ?? "profile";

  return (
    <>
      <ButtonBase
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          px: 1,
          py: 0.4,
          borderRadius: 1,
          border: "1px solid",
          borderColor: active ? alpha(typeBadgeColor(buttonType), 0.5) : "divider",
          bgcolor: active ? alpha(typeBadgeColor(buttonType), 0.06) : "transparent",
          fontSize: 12,
          fontWeight: 700,
          color: active ? typeBadgeColor(buttonType) : "text.secondary",
          transition: "all 140ms",
          "&:hover": { borderColor: "text.disabled", bgcolor: "action.hover" },
        }}
      >
        {active?.type === "profile" ? (
          (() => {
            const m = CREW.find((c) => c.id === active.id);
            return m ? <CrewAvatar member={m} size={16} /> : typeIcon(buttonType, 14);
          })()
        ) : (
          typeIcon(buttonType, 14)
        )}
        <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, color: "inherit" }}>
          {buttonLabel}
        </Typography>
        <KeyboardArrowDownRoundedIcon sx={{ fontSize: 14, color: "text.disabled" }} />
      </ButtonBase>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => { setAnchor(null); setQuery(""); }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              width: 260,
              maxHeight: 400,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: 8,
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Search */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            px: 1.25,
            py: 0.75,
            borderBottom: "1px solid",
            borderColor: "divider",
            gap: 0.75,
            flexShrink: 0,
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <InputBase
            autoFocus
            placeholder="Search entities…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ flex: 1, fontSize: 13, fontWeight: 600 }}
          />
        </Stack>

        {/* Self option */}
        <Box
          component="button"
          onClick={() => select(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 1.5,
            py: 0.85,
            border: "none",
            bgcolor: !active ? alpha(theme.palette.primary.main, 0.08) : "transparent",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: !active ? 800 : 600,
            color: !active ? "primary.main" : "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
            flexShrink: 0,
            "&:hover": { bgcolor: "action.hover" },
          }}
        >
          <PersonRoundedIcon sx={{ fontSize: 16 }} />
          Self
          {!active && (
            <Chip
              label="active"
              size="small"
              sx={{ height: 16, fontSize: 9, fontWeight: 800, ml: "auto", color: "primary.main", bgcolor: alpha(theme.palette.primary.main, 0.12) }}
            />
          )}
        </Box>

        {/* Scrollable section list */}
        <Box sx={{ overflowY: "auto", flex: 1 }}>
          {filteredSections.map((section) => (
            <Box key={section.label}>
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  bgcolor: "background.default",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                {section.icon}
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, color: "text.disabled", letterSpacing: 0.4, textTransform: "uppercase", fontSize: 9 }}
                >
                  {section.label}
                </Typography>
              </Stack>
              {section.items.map((item) => {
                const isActive = active?.id === item.id;
                const color = item.context ? typeBadgeColor(item.context.type) : "#94a3b8";
                const m = item.context?.type === "profile" ? CREW.find((c) => c.id === item.id) : undefined;

                return (
                  <Box
                    key={item.id}
                    component="button"
                    onClick={() => select(item.context)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 1.5,
                      py: 0.75,
                      width: "100%",
                      border: "none",
                      bgcolor: isActive ? alpha(color, 0.08) : "transparent",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? color : "text.primary",
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    {m ? (
                      <CrewAvatar member={m} size={20} />
                    ) : (
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: 1,
                          bgcolor: alpha(color, 0.15),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {typeIcon(item.context?.type ?? "profile", 12)}
                      </Box>
                    )}
                    <Box sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                      <Typography
                        sx={{ fontSize: 13, fontWeight: "inherit", color: "inherit", lineHeight: 1.2 }}
                      >
                        {item.name}
                      </Typography>
                      {item.subtitle && (
                        <Typography variant="caption" sx={{ color: "text.disabled", fontSize: 10 }}>
                          {item.subtitle}
                        </Typography>
                      )}
                    </Box>
                    {isActive && (
                      <Chip
                        label="active"
                        size="small"
                        sx={{ height: 16, fontSize: 9, fontWeight: 800, color, bgcolor: alpha(color, 0.12) }}
                      />
                    )}
                  </Box>
                );
              })}
            </Box>
          ))}

          {filteredSections.length === 0 && (
            <Typography
              variant="caption"
              sx={{ display: "block", textAlign: "center", p: 2, color: "text.disabled" }}
            >
              No entities match "{query}"
            </Typography>
          )}
        </Box>
      </Popover>
    </>
  );
}
