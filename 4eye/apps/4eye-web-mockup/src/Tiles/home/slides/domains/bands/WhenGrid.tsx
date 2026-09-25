"use client";

import { Box } from "@mui/material";
import { WhenPill } from "../primitives/WhenPill";
import { useDomainsSlideContext } from "../state/DomainsSlideContext";
import { DOMAINS_SELECTORS } from "../state/domains.constants";

export function WhenGrid() {
  const { whens } = useDomainsSlideContext();

  return (
    <Box className="reach-when-band" sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            zero: "repeat(1, minmax(0, 240px))",
            tablet: "repeat(2, minmax(0, 260px))",
          },
          justifyContent: "center",
          gap: { zero: 1.5, tablet: 2.5 },
          width: "100%",
        }}
      >
        {whens.map(({ key, label, Icon, color }) => (
          <Box key={key} sx={{ minWidth: 0 }}>
            <WhenPill
              label={label}
              Icon={Icon}
              hex={color}
              className={DOMAINS_SELECTORS.whenPill.slice(1)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default WhenGrid;
