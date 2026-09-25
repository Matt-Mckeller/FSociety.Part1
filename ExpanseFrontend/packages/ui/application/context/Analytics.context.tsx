"use client"
import React, { useMemo, useState } from "react"

import { DEVICE_TYPE } from "../types"
import { useWindowDimensions } from "../utility"

// Todo future, use theme based device detection rather than this
function useDeviceType(source: "navigator" | "screenWidth"): DEVICE_TYPE {
  // todo mobile app addition when that comes into play, is not a concern yet
  if (typeof window === "undefined") {
    return "Server"
  }

  if (source === "navigator") {
    const { userAgent } = navigator

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )
    ) {
      return "Mobile"
    }
    if (/Tablet|iPad/i.test(userAgent)) {
      return "Tablet"
    }
    return "Desktop"
  } else if (source === "screenWidth") {
    // todo use theme ( but context )
    const isMobile = window.matchMedia("(max-width: 767px)").matches
    const isTablet = window.matchMedia(
      "(min-width: 768px) and (max-width: 1023px)",
    ).matches

    if (isMobile) {
      return "Mobile"
    }
    if (isTablet) {
      return "Tablet"
    }
    return "Desktop"
  }
  throw new Error("Must specify device type source")
}

type Metrics = {
  // todo define additional metrics to be captured
}

type DeviceContext = {
  deviceTypeByUserAgent: string
  deviceTypeByScreenWidth: string
  screenSize: string
  innerSize: string
}

type AnalyticsEventContextType = {
  pageUrl: string
  eventTimestamp: string
  sessionId: string
  metrics: Metrics
  deviceContext: DeviceContext
}

export type AnalyticsContextType = {
  analyticsSessionId: string
  analyticsEventContext: AnalyticsEventContextType
}
export type AnalyticsProviderProps = {
  children: React.ReactNode
}

export const AnalyticsContext = React.createContext<AnalyticsContextType>(null)

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  // Logic may change in the future
  const [analyticsSessionId, setAnalyticsSessionId] = useState<string>(
    crypto.randomUUID(),
  )

  const deviceTypeByUserAgent = useDeviceType("navigator")
  const deviceTypeByScreenWidth = useDeviceType("screenWidth")

  const {
    screenWidth,
    screenHeight,
    innerWidth,
    innerHeight,
    serverSideRendering,
  } = useWindowDimensions()

  const screenLocation =
    typeof window === "undefined" ? "" : window?.location?.href

  const screenSize = `${screenWidth}x${screenHeight}`
  const innerSize = `${innerWidth}x${innerHeight}`

  const analyticsEventContext = useMemo(
    () => ({
      pageUrl: screenLocation, // todo may change api variable name when switching to mobile as well
      eventTimestamp: new Date().toISOString(),
      sessionId: analyticsSessionId,
      metrics: {
        // pageLoadTime: calculatePageLoadTime(),
      },
      // userAgent: navigator.userAgent, // should be tracked by session id?
      deviceContext: {
        // also possibly tracked by session id or on updates for efficiency but im not worried about it atm
        deviceTypeByUserAgent,
        deviceTypeByScreenWidth,
        screenSize,
        innerSize,
        serverSideRendering,
      },
    }),
    [
      screenLocation,
      analyticsSessionId,
      deviceTypeByUserAgent,
      deviceTypeByScreenWidth,
      screenSize,
      innerSize,
    ],
  )

  const value: AnalyticsContextType = useMemo(
    () => ({
      // Api
      analyticsSessionId,
      analyticsEventContext, // may eventually be converted to a context id, but not much value in this atm
    }),
    [analyticsSessionId, analyticsEventContext],
  )

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  )
}
