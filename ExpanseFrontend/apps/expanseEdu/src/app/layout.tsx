import type { Metadata } from "next"
import "./globals.css"
import dynamic from "next/dynamic"
import { SITE_URL } from "@/config/site"
const ClientLayout = dynamic(() => import("./layout_client"), { ssr: false })

export const metadata: Metadata = {
  title: "Expanse EDU - Improving Engagement in Education",
  description:
    "Turning school into a game to improve engagement and learning outcomes.",
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
      rel: "mask-icon",
      url: "/favicon/safari-pinned-tab.svg",
      color: "#ffffff",
    },
    {
      rel: "icon",
      url: "/favicon/favicon.ico",
      sizes: "any",
    },
  ],
  openGraph: {
    title: "Expanse EDU - Improving Engagement in Education",
    type: "website",
    description:
      "Turning school into a game to improve engagement and learning outcomes.",
    url: SITE_URL,
    siteName: "Expanse EDU",
    images: [
      "https://storage.googleapis.com/expanse-public-assets/openGraph/ogImageSimple.jpg",
    ],
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
        {/* All client-only logic is now in ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
