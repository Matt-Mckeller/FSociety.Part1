import { Metadata } from "next"
import GameDemoView from "../../../modules/game/views/GameDemoView"
import { InventoryView } from "expanse.ui/game"

export const metadata: Metadata = {
  title: "Game Demo",
}
export default function GameDemo() {
  return <InventoryView />
}
