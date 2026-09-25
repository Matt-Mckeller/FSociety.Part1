import React, { useContext, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { AnalyticsContext, ApiContext, useAnalyticsEventContext } from ".."
import { REGISTER_ANALYTICS_EVENT } from "../gql"
import { useMutation } from "@apollo/client"

export function useRouterEventLogging() {
  const router = useRouter()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      registerAnalyticsEvent({
        variables: {
          event: "navigate",
          params: JSON.stringify({ url }),
          ...analyticsEventContext,
        },
      })
      // addLoadingProcessID('page-navigation')
    }
    const handleRouteChangeComplete = () => {
      // console.log('Finished loading page.')
    }
    const handleRouteChangeError = (url: string) => {
      console.error("Error loading page.")
      registerAnalyticsEvent({
        variables: useAnalyticsEventContext({
          event: "navigate-error",
          params: JSON.stringify({ url }),
          ...analyticsEventContext,
        }),
      })
    }

    router.events.on("routeChangeStart", handleRouteChangeStart)
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    router.events.on("routeChangeError", handleRouteChangeError)

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart)
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
      router.events.off("routeChangeError", handleRouteChangeError)
    }
  }, [router])

  useEffect(() => {
    registerAnalyticsEvent({
      variables: {
        event: "page-load",
        params: JSON.stringify({ path: router.pathname }),
        ...analyticsEventContext,
      },
    })
  }, [router.pathname])

  return {}
}
