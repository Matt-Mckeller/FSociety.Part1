"use client"
import React from "react"
import Script from "next/script"

export type GAParams = {
  gaId: string
  dataLayerName?: string
}

declare global {
  interface Window {
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

let currDataLayerName: string | undefined = undefined

export function GoogleAnalytics(props: GAParams) {
  const { gaId, dataLayerName = "dataLayer" } = props

  if (currDataLayerName === undefined) {
    currDataLayerName = dataLayerName
  }

  return (
    <>
      <Script
        id="_ga-init"
        dangerouslySetInnerHTML={{
          __html: `
          window['${dataLayerName}'] = window['${dataLayerName}'] || [];
          function gtag(){window['${dataLayerName}'].push(arguments);}
          gtag('js', new Date());

          gtag('config', '${gaId}');`,
        }}
      />
      <Script
        id="_ga"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  )
}

export function sendGAEvent(eventName, eventParams) {
  if (currDataLayerName === undefined) {
    console.warn(`GA has not been initialized`)
    return
  }

  if (window[currDataLayerName]) {
    window[currDataLayerName].push(eventName, eventParams)
  } else {
    console.warn(`GA dataLayer ${currDataLayerName} does not exist`)
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams)
  } else {
    console.warn(`gtag function does not exist`)
  }
}
