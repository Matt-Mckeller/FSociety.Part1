"use client"

import { CONTACT_ROUTE } from "../config"
import { ProjectApplicationProviders } from "./appProviders"
import StandardLayout from "../modules/layout/standard-layout"
import { GoogleAnalytics } from "expanse.ui/application"
import { ContactProvider, ContactModal } from "expanse.ui/contact"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) {
    throw new Error("Missing google analytics id")
  }
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}
        />
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
      </AppRouterCacheProvider>
    </>
  )
}
