import { Auth } from "expanse.ui/auth"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Expanse Login",
}
export default function Authentication() {
  return <Auth />
}

