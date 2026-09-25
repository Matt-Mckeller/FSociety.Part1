"use client";

import { Box } from "@mui/material";
import { Fragment } from "react";
import { useModality } from "../ModalityContext";
import { GridSlot } from "../types";
import { ModalityOrb } from "./ModalityOrb";

/** Renders the modality layout as centered flex rows that hug together. */
export function ModalityGrid() {
  const { layout } = useModality();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        width: "fit-content",
        mx: "auto",
      }}
    >
      {layout.map((row, rowIdx) => {
        const cells = row.filter((cell) => cell !== GridSlot.Empty);
        if (cells.length === 0) return null;
        return (
          <Box
            key={`row-${rowIdx}`}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "2px",
            }}
          >
            {cells.map((cell) => (
              <ModalityOrb key={cell} modalityKey={cell} />
            ))}
          </Box>
        );
      })}
    </Box>
  );
}
