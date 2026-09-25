import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Web4",
  description: "Web4 Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
