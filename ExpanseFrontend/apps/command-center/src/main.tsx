import React from "react"
import ReactDOM from "react-dom/client"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { theme } from "./theme"
import { AppProvider } from "./contexts"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AppProvider>
  </React.StrictMode>,
)
