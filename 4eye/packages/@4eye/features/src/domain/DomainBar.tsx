"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import LockIcon from "@mui/icons-material/Lock";
import TuneIcon from "@mui/icons-material/Tune";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { type DomainType } from "@4eye/types";
import { useDomain } from "./DomainContext";

const ICONS: Record<string, React.ComponentType> = {
  GridView: GridViewIcon,
  School: SchoolIcon,
  Work: WorkIcon,
  Favorite: FavoriteIcon,
  SportsEsports: SportsEsportsIcon,
  Lock: LockIcon,
  Tune: TuneIcon,
};

/**
 * DomainBar — pill-shaped button that opens a menu of all available
 * domains. Pure view; reads/writes via `useDomain`.
 */
export function DomainBar() {
  const { currentDomain, domainConfig, domains, setDomain } = useDomain();
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const Icon = ICONS[domainConfig.icon] ?? GridViewIcon;

  const handleSelect = (id: DomainType) => {
    setDomain(id);
    setAnchor(null);
  };

  return (
    <>
      <Button
        size="small"
        onClick={(e) => setAnchor(e.currentTarget)}
        endIcon={<ExpandMoreIcon />}
        sx={{
          textTransform: "none",
          color: domainConfig.color,
          border: `1px solid ${domainConfig.color}66`,
          bgcolor: `${domainConfig.color}11`,
          "&:hover": { bgcolor: `${domainConfig.color}22` },
          px: 1.25,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Icon />
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {domainConfig.label}
          </Typography>
        </Box>
      </Button>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { minWidth: 220 } } }}
      >
        {domains.map((d) => {
          const ItemIcon = ICONS[d.icon] ?? GridViewIcon;
          return (
            <MenuItem
              key={d.id}
              selected={d.id === currentDomain}
              onClick={() => handleSelect(d.id)}
            >
              <ListItemIcon sx={{ color: d.color }}>
                <ItemIcon />
              </ListItemIcon>
              <ListItemText
                primary={d.label}
                secondary={d.description}
                primaryTypographyProps={{ sx: { fontWeight: 600 } }}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
