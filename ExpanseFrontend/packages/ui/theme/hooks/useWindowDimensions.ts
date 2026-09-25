"use client"
import { useState, useEffect } from "react"

type WindowDimensions = {
  innerWidth: number
  innerHeight: number
  clientWidth: number
  clientHeight: number
  screenWidth: number
  screenHeight: number
  serverSideRendering: boolean
}

export const useWindowDimensions = (): WindowDimensions => {
  const defaultWidth = 1920
  const defaultHeight = 1080

  const [innerHeight, setInnerHeight] = useState(defaultHeight)
  const [innerWidth, setInnerWidth] = useState(defaultWidth)
  const [clientHeight, setClientHeight] = useState(defaultHeight)
  const [clientWidth, setClientWidth] = useState(defaultWidth)
  const [screenHeight, setScreenHeight] = useState(defaultHeight)
  const [screenWidth, setScreenWidth] = useState(defaultWidth)
  const [serverSideRendering, setServerSideRendering] = useState(true)

  useEffect(() => {
    function handleResize() {
      if (typeof window === "undefined" || typeof document === "undefined") {
        setInnerHeight(defaultHeight)
        setInnerWidth(defaultWidth)
        setClientHeight(defaultHeight)
        setClientWidth(defaultWidth)
        setScreenHeight(defaultHeight)
        setScreenWidth(defaultWidth)
        setServerSideRendering(true)
      } else {
        const {
          innerWidth,
          innerHeight,
          screen: { height: sHeight, width: sWidth },
        } = window
        let cWidth = defaultWidth,
          cHeight = defaultHeight
        if (typeof document !== "undefined" && document.documentElement) {
          cWidth = document.documentElement.clientWidth
          cHeight = document.documentElement.clientHeight
        }
        setInnerHeight(innerHeight)
        setInnerWidth(innerWidth)
        setClientHeight(cHeight)
        setClientWidth(cWidth)
        setScreenHeight(sHeight)
        setScreenWidth(sWidth)
        setServerSideRendering(false)
      }
    }
    handleResize()
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
    return undefined
  }, [])

  return {
    innerWidth,
    innerHeight,
    clientWidth,
    clientHeight,
    screenWidth,
    screenHeight,
    serverSideRendering,
  }
}
