"use client"
import React from "react"
import {
  ContactDisplayContextProps,
  ContactDisplayProvider,
} from "./ContactDisplay.context"
import { ContactFormProvider } from "./ContactForm.context"

type ContactProviderType = ContactDisplayContextProps & {
  children: React.ReactNode
}
export function ContactProvider({
  children,
  contactPageRoute,
}: ContactProviderType) {
  return (
    <ContactDisplayProvider contactPageRoute={contactPageRoute}>
      <ContactFormProvider>{children}</ContactFormProvider>
    </ContactDisplayProvider>
  )
}
