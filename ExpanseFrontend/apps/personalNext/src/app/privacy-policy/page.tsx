import { Metadata } from "next"
import PrivacyPolicyComponent from "../../modules/content/privacy-policy/privacy-policy.component"

export const metadata: Metadata = {
  title: "Privacy Policy",
}
export default function PrivacyPolicy() {
  return <PrivacyPolicyComponent />
}

