import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "./providers"

export const metadata: Metadata = {
  title: "Communication Planner",
  description: "Communication session planning and profile display",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
