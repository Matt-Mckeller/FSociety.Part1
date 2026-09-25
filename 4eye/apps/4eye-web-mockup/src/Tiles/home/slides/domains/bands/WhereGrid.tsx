"use client";

import { Box } from "@mui/material";
import { WherePill } from "../primitives/WherePill";
import { useDomainsSlideContext } from "../state/DomainsSlideContext";
import { DOMAINS_SELECTORS } from "../state/domains.constants";

export function WhereGrid() {
  const { places } = useDomainsSlideContext();

  return (
    <Box className="reach-where-band" sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            zero: "repeat(1, minmax(0, 220px))",
            tablet: "repeat(3, minmax(0, 220px))",
          },
          justifyContent: "center",
          gap: { zero: 1.5, tablet: 2.5 },
          width: "100%",
        }}
      >
        {places.map(({ key, label, Icon, color }) => (
          <Box
            key={key}
            className={DOMAINS_SELECTORS.whereCell.slice(1)}
            sx={{ minWidth: 0 }}
          >
            <WherePill
              label={label}
              Icon={Icon}
              hex={color}
              className={DOMAINS_SELECTORS.wherePill.slice(1)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default WhereGrid;
