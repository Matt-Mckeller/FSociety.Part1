"use client"
import React, { useMemo, useState, useContext } from "react"

import { useMediaQuery } from "@mui/material"
import { useRouter, usePathname } from "next/navigation"
import { useMutation } from "@apollo/client"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { AnalyticsContext } from "../../application"
import { ContactFormContent, Dictionary } from "../config"

interface ContactDisplayContextType {
  isModalOpen: boolean
  openContact: () => void
  exitContact: (exitType?: string) => void
  dictionary: ContactFormContent
}

export type ContactDisplayContextProps = {
  contactPageRoute: string
}
function useContactDisplayContext({
  contactPageRoute,
}: ContactDisplayContextProps): ContactDisplayContextType {
  const dictionary = Dictionary["en"]
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userIsOnDesktop = useMediaQuery((theme: any) =>
    theme.breakpoints.up("laptop"),
  )
  const router = useRouter()
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)

  const openContactModal = () => {
    registerAnalyticsEvent({
      variables: {
        event: "open-contact-modal",
        ...analyticsEventContext,
        params: null,
      },
    })
    setIsModalOpen(true)
  }

  // exitType: How did the user exit the contact? Did they exit because of a succesful submit, error, close button, etc
  const exitContact = (exitType?: string) => {
    registerAnalyticsEvent({
      variables: {
        event: "exit-contact",
        ...analyticsEventContext,
        params: JSON.stringify({
          type: exitType || "unknown",
        }),
      },
    })
    if (isModalOpen) {
      setIsModalOpen(false)
    } else {
      router.back()
    }
  }

  const openContact = () => {
    if (userIsOnDesktop === false) {
      registerAnalyticsEvent({
        variables: {
          event: "open-contact-page",
          ...analyticsEventContext,
          params: null,
        },
      })
      router.push(contactPageRoute || "/contact")
    } else {
      openContactModal()
    }
  }

  return {
    isModalOpen,
    openContact,
    exitContact,
    dictionary,
  }
}

export const ContactDisplayContext =
  React.createContext<ContactDisplayContextType>(null)

type ContactDisplayProviderProps = {
  children: React.ReactNode
  contactPageRoute: string
}
export function ContactDisplayProvider({
  children,
  contactPageRoute,
}: ContactDisplayProviderProps) {
  const { isModalOpen, openContact, exitContact, dictionary } =
    useContactDisplayContext(contactPageRoute)

  const value: ContactDisplayContextType = useMemo(
    () => ({
      isModalOpen,
      openContact,
      exitContact,
      dictionary,
    }),
    [isModalOpen, openContact, exitContact, dictionary],
  )

  return (
    <ContactDisplayContext.Provider value={value}>
      {children}
    </ContactDisplayContext.Provider>
  )
}
