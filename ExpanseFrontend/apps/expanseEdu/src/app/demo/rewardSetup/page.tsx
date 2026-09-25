import { Metadata } from "next"
import GameDemoView from "../../../modules/game/views/GameDemoView"
import { TeacherRewardManagement } from "../../../modules/game"

export const metadata: Metadata = {
  title: "Game Demo",
}
export default function Page() {
  return <TeacherRewardManagement />
}
