"use client";

import {
  Box,
  MenuItem,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import { useRoleSelection } from "./state";
import type { RoleKey } from "./mapContent/types";
import { ROLES, ROLE_ACCENT } from "./mapContent/roles";

export interface RoleGoalSelectorProps {
  /**
   * Optional starting role; ignored if a `RoleSelectionProvider` is
   * already initialized with a different value (the provider owns
   * state). Kept for API compatibility.
   */
  defaultRole?: RoleKey;
}

/**
 * "View As" role picker — a single blue pill `Select` rendered above
 * the Goals / Features / Problems accordion stack inside the
 * MinimapFullView overlay's right column. Defaults to "All audiences"
 * (the `default` role). Selection is owned by `RoleSelectionProvider`.
 */
export function RoleGoalSelector(_props: RoleGoalSelectorProps = {}) {
  const { role: roleKey, setRole } = useRoleSelection<RoleKey>();

  const handleChange = (e: SelectChangeEvent<RoleKey>) => {
    setRole(e.target.value as RoleKey);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        width: "100%",
        px: 3,
        pt: 2,
        pb: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <Box
          sx={{
            width: 4,
            height: 18,
            borderRadius: 1,
            bgcolor: ROLE_ACCENT,
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.primary",
            fontWeight: 800,
            letterSpacing: 0.4,
            fontSize: "1.05rem",
            lineHeight: 1.2,
          }}
        >
          View as
        </Typography>
      </Box>
      <Select<RoleKey>
        value={roleKey}
        onChange={handleChange}
        size="small"
        fullWidth
        aria-label="View as role"
        renderValue={(selected) => {
          const r = ROLES.find((x) => x.key === selected) ?? ROLES[0];
          const Icon = r.Icon;
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Icon fontSize="small" sx={{ color: "#fff" }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#fff" }}
              >
                {r.label}
              </Typography>
            </Box>
          );
        }}
        MenuProps={{
          slotProps: {
            paper: {
              sx: {
                mt: 0.5,
              bgcolor: "#0b1220",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.12)",
              "& .MuiMenuItem-root": {
                gap: 1.25,
                py: 1,
                "&:hover": { bgcolor: "rgba(59,130,246,0.18)" },
                "&.Mui-selected": {
                  bgcolor: `${ROLE_ACCENT}33`,
                  "&:hover": { bgcolor: `${ROLE_ACCENT}44` },
                },
              },
            },
            },
          },
        }}
        sx={{
          // Blue pill skin
          borderRadius: 999,
          bgcolor: ROLE_ACCENT,
          color: "#fff",
          fontWeight: 700,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.6)",
            borderWidth: 1,
          },
          "&:hover": { bgcolor: "#2563EB" /* blue-600 */ },
          "& .MuiSelect-select": {
            py: 1,
            pl: 1.75,
            pr: "36px !important",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiSelect-icon": { color: "#fff", right: 10 },
        }}
      >
        {ROLES.map((r) => {
          const Icon = r.Icon;
          return (
            <MenuItem key={r.key} value={r.key}>
              <Icon fontSize="small" sx={{ color: ROLE_ACCENT }} />
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "inherit" }}
              >
                {r.label}
              </Typography>
            </MenuItem>
          );
        })}
      </Select>
    </Stack>
  );
}

export default RoleGoalSelector;
