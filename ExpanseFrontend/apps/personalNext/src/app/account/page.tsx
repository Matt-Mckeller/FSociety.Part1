import React from "react"
import { UserProfile } from "expanse.ui/user"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expanse Account",
}
export default function AccountProfile({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <UserProfile></UserProfile>
}
