"use client"
import { useState, useEffect, useContext } from "react"
import { useQuery, gql, useSubscription } from "@apollo/client"
import { GET_EVENTS, NEW_EVENT_SUBSCRIPTION } from "../gql/events"
import { EventFilters, RewardableEventInterface } from "../types"
import { EventsTempContext } from "expanse.ui/game"

// Currently used as a middle point for grabbing event data, will eventually handle fetching and updating from backend
// Context is being used to hold the event data for demo/sample version
export function useEventsData(initialFilters = {}) {
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<EventFilters>(initialFilters)
  const { rewardEvents: rewardEventsTemp } = useContext(EventsTempContext) // Temporarily used until backend is implemented
  const [events, setEvents] = useState<RewardableEventInterface[]>([])
  const rowsPerPage = 10

  //   const { data, loading, error, refetch } = useQuery(GET_EVENTS, {
  //     variables: { page, pageSize: 10, filters }, // Pass variables to the query
  //     fetchPolicy: "cache-and-network", // Or other fetch policy as needed
  //   })

  //   const { data: newEventData, error: subscriptionError } = useSubscription(
  //     NEW_EVENT_SUBSCRIPTION,
  //   )

  const handleNewEventFromSubscription = () => {
    // Option 1: Optimistic update (faster, but might need correction later)
    // setEvents((prevEvents) => [
    //   newEventData.newEvent,
    //   ...prevEvents.slice(0, 9),
    // ]) // Keep only 10 items
    //
    // Option 2: Refetch query (simpler, but might cause a brief flicker)
    // refetch() // This will fetch the data from server with new event
    //
    // Option 3: Update the cache directly (more efficient)
    // This approach is more complex but more performant
    // const cache = client.readQuery({ query: GET_EVENTS, variables: { page, pageSize: 10, filters }});
    // if (cache) {
    //     const updatedEvents = { ...cache };
    //     updatedEvents.events.nodes = [newEventData.newEvent, ...updatedEvents.events.nodes.slice(0,9)];
    //     client.writeQuery({ query: GET_EVENTS, variables: { page, pageSize: 10, filters }, data: updatedEvents });
    // }
  }

  // Context based handling for frontend mock implementation
  useEffect(() => {
    setEvents(rewardEventsTemp)
  }, [rewardEventsTemp])

  // On Subscribed Event Change, Handle New Event
  //   useEffect(() => {
  //     if (newEventData) {
  //       handleNewEventFromSubscription()
  //     }
  //   }, [newEventData, refetch]) // Add refetch as a dependency

  //   useEffect(() => {
  //     // Disabled until working
  //     setEvents(data?.events?.nodes)
  //   }, [data?.events?.nodes])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const updateFilters = (newFilters: EventFilters) => {
    setFilters(newFilters)
    setPage(1) // Reset to first page when filters change
  }

  return {
    // events: data?.events?.nodes || [], // Access data using correct path
    events, // Access data using correct path
    // isLoading: loading,
    // error,
    page,
    // totalPages: data?.events?.totalPages,
    totalPages: Math.ceil(events.length / rowsPerPage),
    handlePageChange,
    filters,
    updateFilters,
    rowsPerPage,
    // refetch,
  }
}
