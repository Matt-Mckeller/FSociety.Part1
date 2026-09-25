import type { Metadata } from "next"
import "./globals.css"
import SimpleLayout from "./simple-layout"

export const metadata: Metadata = {
  title: "Expanse Services",
  description:
    "Expanse Services - Quality web application development services.",
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
      sizes: "any",
    },
  ],
  openGraph: {
    title: "Expanse Services",
    type: "website",
    description: "Expanse Services - Quality web application development",
    url: "https://www.expanseservices.com",
    siteName: "Expanse Services",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SimpleLayout>
          {children}
        </SimpleLayout>
      </body>
    </html>
  )
}
