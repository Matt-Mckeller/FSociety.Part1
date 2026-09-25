/**
 * TimelineContext - Centralized state for timeline/journey data
 * Used by: TimelineView
 */
import { createContext, useContext, useMemo, ReactNode } from "react"
import type { JourneyEvent } from "../types"

// Import data
import timelineData from "../data/timeline.json"

interface TimelineContextValue {
  events: JourneyEvent[]

  // Selectors
  getEventById: (id: string) => JourneyEvent | undefined
  getEventsByProject: (projectId: string) => JourneyEvent[]
  getEventsByStatus: (status: JourneyEvent["status"]) => JourneyEvent[]
  getEventsByType: (type: JourneyEvent["type"]) => JourneyEvent[]
  getUpcomingEvents: (limit?: number) => JourneyEvent[]
  getPastEvents: (limit?: number) => JourneyEvent[]
  getEventsInRange: (startDate: Date, endDate: Date) => JourneyEvent[]
}

const TimelineContext = createContext<TimelineContextValue | null>(null)

export function TimelineProvider({ children }: { children: ReactNode }) {
  const events = (timelineData.timeline || []) as JourneyEvent[]

  const value = useMemo<TimelineContextValue>(
    () => ({
      events,

      getEventById: (id) => events.find((e) => e.id === id),

      getEventsByProject: (projectId) =>
        events.filter(
          (e) => e.projectId === projectId || e.storylineId === projectId,
        ),

      getEventsByStatus: (status) => events.filter((e) => e.status === status),

      getEventsByType: (type) => events.filter((e) => e.type === type),

      getUpcomingEvents: (limit = 10) => {
        const now = new Date()
        return events
          .filter((e) => new Date(e.date) >= now)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
          .slice(0, limit)
      },

      getPastEvents: (limit = 10) => {
        const now = new Date()
        return events
          .filter((e) => new Date(e.date) < now)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, limit)
      },

      getEventsInRange: (startDate, endDate) =>
        events.filter((e) => {
          const eventDate = new Date(e.date)
          return eventDate >= startDate && eventDate <= endDate
        }),
    }),
    [events],
  )

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  )
}

export function useTimeline() {
  const context = useContext(TimelineContext)
  if (!context) {
    throw new Error("useTimeline must be used within a TimelineProvider")
  }
  return context
}
