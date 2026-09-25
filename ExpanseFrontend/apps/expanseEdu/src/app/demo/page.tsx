import { Metadata } from "next"
import GameDemoView from "../../modules/game/views/GameDemoView"
import { StudentLandingPage } from "../../modules/game/views"

export const metadata: Metadata = {
  title: "Game Demo",
}
export default function DemoLandingPage() {
  if (typeof window === "undefined") {
    // todo implement server-side rendering for this page
    return <></>
  }
  return <StudentLandingPage />
}
