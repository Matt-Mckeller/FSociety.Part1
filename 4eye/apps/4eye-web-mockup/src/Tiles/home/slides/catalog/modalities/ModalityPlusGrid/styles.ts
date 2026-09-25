import type { SxProps, Theme } from "@mui/material";

/**
 * Grid container that renders the modality plus/cross. Column/row counts are
 * derived from the layout at render time. Tight 2px gap clusters the orbs
 * together so the diamond/cross silhouette reads as one shape.
 */
export const getGridSx = (cols: number, rows: number): SxProps<Theme> => ({
  display: "grid",
  gridTemplateColumns: `repeat(${cols}, auto)`,
  gridTemplateRows: `repeat(${rows}, auto)`,
  gap: "2px",
  justifyContent: "center",
  alignItems: "center",
  justifyItems: "center",
  width: "fit-content",
  mx: "auto",
});
