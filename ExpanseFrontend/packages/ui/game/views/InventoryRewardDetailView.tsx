import { Box } from "@mui/system"
import React from "react"
import { RewardInterface } from "../types"
import { RewardCard } from "../components"
import { Button } from "@mui/material"
interface InventoryRewardDetailViewProps {
  reward: RewardInterface<any>
}
export const InventoryRewardDetailView = ({
  reward,
}: InventoryRewardDetailViewProps) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <RewardCard reward={reward} />
      <Button>Redeem</Button>
    </Box>
  )
}
