import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import type { Metadata } from "next"
import "./globals.css"
import { ClientProviders } from "./providers"

export const metadata: Metadata = {
  title: "Expanse Playground",
  description: "Testing ground for Expanse components and features",
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
          <ClientProviders>{children}</ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
