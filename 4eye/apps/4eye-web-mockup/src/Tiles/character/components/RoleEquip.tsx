"use client";

/**
 * RoleEquip — the header "equipped roles" input.
 *
 * Renders the active character's equipped role titles as chips (deletable to
 * unequip) plus an "Add role" button that opens a picker of
 * {@link ROLE_TITLE_OPTIONS}. Equipping is capped at {@link MAX_EQUIPPED_ROLES};
 * once full, un-equipped options are disabled until a slot frees up.
 */

import * as React from "react";
import {
  Box,
  Chip,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import AddRounded from "@mui/icons-material/AddRounded";
import CheckRounded from "@mui/icons-material/CheckRounded";

import { MAX_EQUIPPED_ROLES, ROLE_TITLE_OPTIONS, TITLE_CYPHER_WORDS, roleDisplayLabel, roleOptionForLabel } from "../model/titles";
import { useCharacter } from "../store/CharacterProvider";
import { MorphLabel } from "@4eye/web/components/hud/resourceBars/widgets";
import { route } from "@4eye/web/lib/routes";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";

export function RoleEquip() {
  const { character, dispatch } = useCharacter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [hoveredRole, setHoveredRole] = React.useState<string | null>(null);

  const equipped = character.titles;
  const isFull = equipped.length >= MAX_EQUIPPED_ROLES;

  const toggle = (title: string) => dispatch({ type: "toggle-role", title });

  return (
    <Box>
      <Stack sx={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 0.5 }}>
        {equipped.map((t) => {
          const opt = roleOptionForLabel(t);
          const href = opt?.href ? route(opt.href) : undefined;
          return (
          <Chip
            key={t}
            component={href ? "a" : "div"}
            href={href}
            target={href ? "_blank" : undefined}
            rel={href ? "noopener noreferrer" : undefined}
            clickable={Boolean(href)}
            icon={href ? <OpenInNewRounded sx={{ fontSize: 14 }} /> : undefined}
            label={
              TITLE_CYPHER_WORDS[t] ? (
                <MorphLabel
                  motion="scramble"
                  words={TITLE_CYPHER_WORDS[t]}
                  color="inherit"
                  active={hoveredRole === t}
                  maxPasses={null}
                  hold={900}
                  fontSize="0.75rem"
                  weight={700}
                  letterSpacing={0.5}
                />
              ) : (
                t
              )
            }
            size="small"
            onDelete={() => toggle(t)}
            onMouseEnter={() => setHoveredRole(t)}
            onMouseLeave={() => setHoveredRole((prev) => (prev === t ? null : prev))}
            sx={{
              fontWeight: 700,
              height: 22,
              color: "secondary.main",
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
              border: "1px solid",
              borderColor: (theme) => alpha(theme.palette.secondary.main, 0.25),
              textDecoration: "none",
              cursor: href ? "pointer" : "default",
              "& .MuiChip-deleteIcon": { color: "secondary.main", fontSize: 15 },
              "& .MuiChip-icon": { color: "secondary.main", ml: 0.5 },
            }}
          />
          );
        })}
        <Chip
          icon={<AddRounded sx={{ fontSize: 16 }} />}
          label={equipped.length === 0 ? "Add role" : `${equipped.length}/${MAX_EQUIPPED_ROLES}`}
          size="small"
          variant="outlined"
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            fontWeight: 700,
            height: 22,
            color: "text.secondary",
            borderStyle: "dashed",
            "& .MuiChip-icon": { color: "text.secondary", ml: 0.5 },
          }}
        />
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        slotProps={{ paper: { sx: { maxHeight: 360, width: 280 } } }}
      >
        <Typography
          variant="caption"
          sx={{ display: "block", px: 2, py: 1, color: "text.disabled", fontWeight: 700 }}
        >
          {equipped.length}/{MAX_EQUIPPED_ROLES} equipped
        </Typography>
        {ROLE_TITLE_OPTIONS.map((opt) => {
          const isEquipped = equipped.includes(opt.label);
          const disabled = !isEquipped && isFull;
          return (
            <MenuItem
              key={opt.id}
              selected={isEquipped}
              disabled={disabled}
              onClick={() => toggle(opt.label)}
              sx={{ alignItems: "flex-start", py: 0.75 }}
            >
              <Box sx={{ width: 24, flexShrink: 0, pt: 0.25 }}>
                {isEquipped && <CheckRounded sx={{ fontSize: 18, color: "secondary.main" }} />}
              </Box>
              <ListItemText
                primary={roleDisplayLabel(opt.label)}
                secondary={opt.hint}
                slotProps={{
                  primary: { sx: { fontWeight: 700, fontSize: 14 } },
                  secondary: { sx: { fontSize: 12 } },
                }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
