/**
 * Mock for Contact module contexts
 * Provides ContactDisplayContext and ContactFormContext for Storybook
 */
import React, { useState, useMemo } from "react"
import { ContactDisplayContext } from "../../../../packages/ui/contact/context/ContactDisplay.context"
import { ContactFormContext } from "../../../../packages/ui/contact/context/ContactForm.context"
import { Dictionary } from "../../../../packages/ui/contact/config/Dictionary"

export type MockContactProviderProps = {
  children: React.ReactNode
  isModalOpen?: boolean
  initialFormValues?: {
    fullName?: string
    email?: string
    phoneNumber?: string
    description?: string
  }
}

export function MockContactProvider({
  children,
  isModalOpen = false,
  initialFormValues = {},
}: MockContactProviderProps) {
  // Form state
  const [fullName, setFullName] = useState(initialFormValues.fullName ?? "")
  const [email, setEmail] = useState(initialFormValues.email ?? "")
  const [phoneNumber, setPhoneNumber] = useState(
    initialFormValues.phoneNumber ?? ""
  )
  const [description, setDescription] = useState(
    initialFormValues.description ?? ""
  )
  const [modalOpen, setModalOpen] = useState(isModalOpen)

  const displayValue = useMemo(
    () => ({
      isModalOpen: modalOpen,
      openContact: () => {
        console.log("[Storybook] openContact called")
        setModalOpen(true)
      },
      exitContact: (exitType?: string) => {
        console.log("[Storybook] exitContact called:", exitType)
        setModalOpen(false)
      },
      dictionary: Dictionary["en"],
    }),
    [modalOpen]
  )

  const formValue = useMemo(
    () => ({
      fullName,
      setFullName,
      email,
      setEmail,
      phoneNumber,
      setPhoneNumber,
      description,
      setDescription,
    }),
    [fullName, email, phoneNumber, description]
  )

  return (
    <ContactDisplayContext.Provider value={displayValue}>
      <ContactFormContext.Provider value={formValue}>
        {children}
      </ContactFormContext.Provider>
    </ContactDisplayContext.Provider>
  )
}
