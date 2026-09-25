import { Metadata } from "next"
import TermsOfServiceComponent from "../../modules/content/terms-of-service/terms-of-service.component"

export const metadata: Metadata = {
  title: "Terms of Service",
}
export default function TermsOfService() {
  return <TermsOfServiceComponent />
}
