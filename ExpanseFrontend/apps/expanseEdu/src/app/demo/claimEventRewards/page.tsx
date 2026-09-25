import { Metadata } from "next"
import { ClaimEventRewardsView } from "expanse.ui/game"

export const metadata: Metadata = {
  title: "Claim Event Rewards",
}
export default function ClaimEventRewards() {
  return <ClaimEventRewardsView />
}
