import { Metadata } from "next"
import GameDemoView from "../../../modules/game/views/GameDemoView"
import { InventorySidePanel, OpenLootView } from "expanse.ui/game"
import { Box } from "@mui/system"

export const metadata: Metadata = {
  title: "Open Loot",
}
export default function Page() {
  return (
    <Box display="flex" flexDirection="row" width="100%" height="100%">
      <Box flexBasis={"50%"}>
        <InventorySidePanel />
      </Box>
      <Box
        display="flex"
        flexBasis={"50%"}
        justifyContent="center"
        alignItems={"center"}
      >
        <OpenLootView />
      </Box>
    </Box>
  )
}
