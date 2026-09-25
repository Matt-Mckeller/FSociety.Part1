import { Metadata } from "next"
import GameDemoView from "../../../modules/game/views/GameDemoView"
import { StudentStoreView } from "../../../modules/game"

export const metadata: Metadata = {
  title: "Store",
}
export default function Page() {
  return <StudentStoreView />
}
