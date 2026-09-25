"use client"
import React, { useMemo, useState } from "react"

type ContactContextType = {
  email: string
  setEmail: (v: string) => void
  fullName: string
  setFullName: (v: string) => void
  phoneNumber: string
  setPhoneNumber: (v: string) => void
  description: string
  setDescription: (v: string) => void
}

function useContactForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  // Note: Phone number formatting handled by input field, should this be the case? Can be moved here
  const [phoneNumber, setPhoneNumber] = useState("")
  const [description, setDescription] = useState("")

  return {
    email,
    setEmail,
    fullName,
    setFullName,
    setPhoneNumber,
    phoneNumber,
    description,
    setDescription,
  }
}

export const ContactFormContext = React.createContext<ContactContextType>(null)

export function ContactFormProvider({ children }: any) {
  const contactFormContext = useContactForm()

  const value: ContactContextType = useMemo(
    () => contactFormContext,
    [contactFormContext],
  )

  return (
    <ContactFormContext.Provider value={value}>
      {children}
    </ContactFormContext.Provider>
  )
}
