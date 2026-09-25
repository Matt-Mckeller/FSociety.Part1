import { testFunction } from "./externalFile"
import React from "react"
import { createRoot } from "react-dom/client"
import { LottieThemingDemo } from "expanse.dynamicAssets"
import { ThemeProvider } from "expanse.ui/theme"

console.log("hello", testFunction())

const initializeReactApplication = () => {
  const container = document.getElementById("react-container")
  if (!container) return

  const root = createRoot(container)
  root.render(
    <ThemeProvider initialTheme="primary" initialThemeMode="light">
      <LottieThemingDemo />
    </ThemeProvider>,
  )
}

initializeReactApplication()
