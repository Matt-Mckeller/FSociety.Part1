"use client"
import { useMutation } from "@apollo/client"
import { ReactNode, useContext, useEffect } from "react"
import { useState } from "react"
import { REGISTER_ANALYTICS_EVENT } from "../gql"
import { AnalyticsContext } from "../context"

/* 
Notes: Originally was using next router but felt like window was a better option here
after extracting from a single application into "isolated" packages
Also There are a few different events that could be listened to but browser support varies
And at the time of writing this comment popstate is enough. 
Its not exactly what I want but will get me enough information about navigation changes
TBD how to use next routing in the shared components

ALSO NOTE: Nav link component is logging events
*/
export const RouterEventLogger = ({ children }: { children: ReactNode }) => {
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Ensure this runs only on the client
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handlePopstate = () => {
      // console.log("pop state event", { url: window.location.pathname })
      // Disabled logging via pop state, also triggering from on page navs which I don't need
      // utilize next router or keep as it is with the links specifically logged
      // registerAnalyticsEvent({
      //   variables: {
      //     event: "popstate",
      //     params: { url: window.location.pathname },
      //     ...analyticsEventContext,
      //   },
      // })
    }
    if (typeof window !== "undefined") {
      if (isClient) {
        window.addEventListener("popstate", handlePopstate)
      }

      return () => window.removeEventListener("popstate", handlePopstate)
    }
    return undefined
  })

  return children
}
