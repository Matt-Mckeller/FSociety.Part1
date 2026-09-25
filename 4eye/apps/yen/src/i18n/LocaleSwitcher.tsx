"use client";

/**
 * The site language control.
 *
 * Each language is listed in its own script. A menu that offers "Japanese" in
 * English to someone who cannot read English is a menu written for the person
 * who built it, so the endonym leads and the English name is the secondary
 * line, for the case where you are picking a language you do not speak.
 *
 * Distinct from the *video* language picker inside the player: this one changes
 * the interface, that one changes which edition of a recording plays. They are
 * different questions and are answered in different places on purpose.
 */

import * as React from "react";
import { Box, Menu, MenuItem, Stack, Tooltip, Typography } from "@mui/material";

import { LOCALES, LOCALE_META, type Locale } from "./locales";
import { LanguagesGlyph } from "@/components/media/playerIcons";
import { useLocale } from "./LocaleProvider";

export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

  return (
    <>
      <Tooltip title="Interface language" arrow>
        <Stack
          component="button"
          type="button"
          onClick={(e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)}
          aria-haspopup="menu"
          aria-expanded={Boolean(anchor)}
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 0.75,
            px: compact ? 0.9 : 1.25,
            py: 0.5,
            font: "inherit",
            cursor: "pointer",
            borderRadius: 999,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            color: "text.secondary",
            "&:hover": { borderColor: "text.disabled", color: "text.primary" },
          }}
        >
          <LanguagesGlyph size={15} />
          <Typography sx={{ fontSize: 12.5, fontWeight: 650 }}>
            {LOCALE_META[locale].endonym}
          </Typography>
        </Stack>
      </Tooltip>

      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        slotProps={{ paper: { sx: { minWidth: 190 } } }}
      >
        {LOCALES.map((code: Locale) => {
          const meta = LOCALE_META[code];
          const active = code === locale;
          return (
            <MenuItem
              key={code}
              selected={active}
              onClick={() => {
                setLocale(code);
                setAnchor(null);
              }}
              sx={{ gap: 1.25, alignItems: "baseline" }}
            >
              <Typography
                // Each row renders in its own language, so it must not inherit
                // the page direction — Arabic in an LTR menu reads backwards.
                lang={code}
                dir={meta.dir}
                sx={{ fontSize: 14, fontWeight: active ? 700 : 550, flex: 1 }}
              >
                {meta.endonym}
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: "text.disabled" }}>{meta.english}</Typography>
              {active && (
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main" }} />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
