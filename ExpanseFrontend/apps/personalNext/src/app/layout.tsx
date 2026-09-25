import type { Metadata } from "next"
import "./globals.css"
import { ProjectApplicationProviders } from "./appProviders"
import StandardLayout from "../modules/layout/standard-layout"
import { GoogleAnalytics } from "expanse.ui/application"
import { ContactProvider, ContactModal } from "expanse.ui/contact"
import { CONTACT_ROUTE } from "../config"

export const metadata: Metadata = {
  title: "Expanse",
  description:
    "Expanse - Innovating the future of work through learning, gamification, and engagement.",
  /*
  {
      rel: "manifest",
      url: "/favicon/site.webmanifest",
    },
  {
      name: "msapplication-TileColor",
      content: "#ffffff",
    },
    {
      name: "msapplication-config",
      content:
        "/favicon/browserconfig.xml",
    },
    */
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
    title: "Matt's Web Application",
    type: "website",
    description: "Web Application Example, Matthew Mckeller",
    url: "https://www.expanseservices.com",
    siteName: "Expanse Services",
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
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
    throw new Error("Missing google analytics id")
  }
  return (
    <html lang="en">
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
      />
      <body>
        <ProjectApplicationProviders
          enableGoogleAnalytics={process.env.ENABLE_GOOGLE_ANALYTICS === "true"}
        >
          <ContactProvider contactPageRoute={CONTACT_ROUTE}>
            <StandardLayout>
              <ContactModal />
              {children}
            </StandardLayout>
          </ContactProvider>
        </ProjectApplicationProviders>
      </body>
    </html>
  )
}
