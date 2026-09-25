import { Metadata } from "next"
import { Resume } from "@personalNext/content/resume/resume.component"
import { ContactDisplayProvider } from "expanse.ui/contact"
import { CONTACT_ROUTE } from "../../../config"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Matthew Mckeller Resume",
}
export default function ResumePage() {
  return (
    <ContactDisplayProvider contactPageRoute={CONTACT_ROUTE}>
      <Suspense>
        <Resume />
      </Suspense>
    </ContactDisplayProvider>
  )
}
