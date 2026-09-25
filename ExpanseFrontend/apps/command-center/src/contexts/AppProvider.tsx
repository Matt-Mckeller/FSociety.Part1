/**
 * AppProvider - Root provider combining all contexts
 */
import { ReactNode } from "react"
import { GameDataProvider } from "./GameDataContext"
import { DocsProvider } from "./DocsContext"
import { ProjectsProvider } from "./ProjectsContext"
import { StrategicProvider } from "./StrategicContext"
import { RoadmapProvider } from "./RoadmapContext"
import { FinancialsProvider } from "./FinancialsContext"
import { LaunchProvider } from "./LaunchContext"
import { TimelineProvider } from "./TimelineContext"
import { QuestionsProvider } from "./QuestionsContext"

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <GameDataProvider>
      <DocsProvider>
        <ProjectsProvider>
          <StrategicProvider>
            <RoadmapProvider>
              <FinancialsProvider>
                <LaunchProvider>
                  <TimelineProvider>
                    <QuestionsProvider>{children}</QuestionsProvider>
                  </TimelineProvider>
                </LaunchProvider>
              </FinancialsProvider>
            </RoadmapProvider>
          </StrategicProvider>
        </ProjectsProvider>
      </DocsProvider>
    </GameDataProvider>
  )
}
