import React from "react"
import { UserProfile } from "expanse.ui/user"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Matthew Mckeller",
}
export default function About({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return "wip"
  return <p>About page</p>
}
