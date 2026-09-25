"use client";

/**
 * LayerDetailRouter — renders the right-pane detail for the selected layer.
 * Every layer has its own bespoke panel.
 */

import { Box } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import type { IntegrationLayer } from "../model/layers";
import { HumanPanel } from "../panels/HumanPanel";
import { ComputerPanel } from "../panels/ComputerPanel";
import { RobotPanel } from "../panels/RobotPanel";
import { NeuralPanel } from "../panels/NeuralPanel";
import { StorePanel } from "../panels/StorePanel";
import { GlassesPanel } from "../panels/GlassesPanel";
import { BrainWavePanel } from "../panels/BrainWavePanel";
import { AionPanel } from "../panels/AionPanel";

function PanelFor({ layer }: { layer: IntegrationLayer }) {
  switch (layer.panel) {
    case "human":
      return <HumanPanel layer={layer} />;
    case "computer":
      return <ComputerPanel layer={layer} />;
    case "robot":
      return <RobotPanel layer={layer} />;
    case "neural":
      return <NeuralPanel layer={layer} />;
    case "store":
      return <StorePanel layer={layer} />;
    case "glasses":
      return <GlassesPanel layer={layer} />;
    case "brainwave":
      return <BrainWavePanel layer={layer} />;
    case "aion":
      return <AionPanel layer={layer} />;
  }
}

export function LayerDetailRouter({ layer }: { layer: IntegrationLayer }) {
  return (
    <Box sx={{ position: "relative", height: "100%", overflow: "hidden" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={layer.id}
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <PanelFor layer={layer} />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
}
