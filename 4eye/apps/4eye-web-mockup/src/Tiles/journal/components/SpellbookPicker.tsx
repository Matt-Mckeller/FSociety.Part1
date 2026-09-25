"use client";

/**
 * SpellbookPicker — an inline "Spellbook" button that opens a popover of
 * Learning Transformations (the Spellbook's `learn`-category spells), grouped
 * by learn-group. Casting one runs the (mocked) transformation on the supplied
 * text and hands the result back via `onResult` for preview.
 */

import * as React from "react";
import {
  Box,
  Button,
  Popover,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import { Lens } from "@expanse/lens";
import { SPELLBOOK_SEED } from "@4eye/web/Tiles/spellbook";
import type { Spell } from "@4eye/web/Tiles/spellbook";
import { LEARN_GROUP_META, LEARN_GROUP_ORDER } from "@4eye/web/Tiles/spellbook/model/types";
import type { TransformResult } from "../model/types";
import { runTransformation, TRANSFORM_SPELL_IDS } from "../store/transformations";

/** The learn spells this tile can cast, in declared order. */
const TRANSFORM_SPELLS: Spell[] = TRANSFORM_SPELL_IDS.map((id) =>
  SPELLBOOK_SEED.spells.find((s) => s.id === id),
).filter((s): s is Spell => Boolean(s));

export function SpellbookPicker({
  text,
  onResult,
  disabled,
}: {
  text: string;
  onResult: (result: TransformResult) => void;
  disabled?: boolean;
}) {
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const cast = (spell: Spell) => {
    const result = runTransformation(spell.id, spell.name, text);
    if (result) onResult(result);
    setAnchor(null);
  };

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        disabled={disabled}
        startIcon={<AutoFixHighRoundedIcon />}
        onClick={(e) => setAnchor(e.currentTarget)}
        sx={{ textTransform: "none", fontWeight: 700 }}
      >
        Spellbook
      </Button>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{ paper: { sx: { p: 1.5, maxWidth: 340 } } }}
      >
        <Typography variant="overline" sx={{ fontWeight: 800, color: "text.secondary" }}>
          Learning Transformations
        </Typography>
        <Stack sx={{ gap: 1.25, mt: 0.5 }}>
          {LEARN_GROUP_ORDER.map((group) => {
            const spells = TRANSFORM_SPELLS.filter((s) => s.learnGroup === group);
            if (spells.length === 0) return null;
            const meta = LEARN_GROUP_META[group];
            return (
              <Box key={group}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 800, color: meta.color, display: "block", mb: 0.5 }}
                >
                  {meta.label}
                </Typography>
                <Stack sx={{ gap: 0.5 }}>
                  {spells.map((spell) => (
                    <Box
                      key={spell.id}
                      onClick={() => cast(spell)}
                      role="button"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        p: 0.75,
                        borderRadius: 1.5,
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: "divider",
                        "&:hover": { borderColor: meta.color, bgcolor: alpha(meta.color, 0.06) },
                      }}
                    >
                      <Lens id={spell.lensId} size={20} animated />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                          {spell.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {spell.shortDescription}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
}
