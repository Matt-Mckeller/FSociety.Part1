import { TicketCard } from "expanse.ui/points"
import { TicketEventActions } from "../ui"
import { Box } from "@mui/system"

export const TicketEventSampleDisplay = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <TicketCard />
      <TicketEventActions />
    </Box>
  )
}
