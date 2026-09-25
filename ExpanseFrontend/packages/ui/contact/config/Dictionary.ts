import { User } from "../../user"

export type ContactFormContent = {
  title: string
  contactCTAText: string
  contactCTATouchText: string
  contactCTAEdu: string
  calendlyCTAText: string
  successMessage: (fullName: string) => string
  submitButton: string
  cancelButton: string
}
export const Dictionary: { [key: string]: ContactFormContent } = {
  en: {
    title: "Get in Touch",
    contactCTAText: "Contact Me",
    contactCTATouchText: "Get In Touch",
    contactCTAEdu: "Contact Us",
    calendlyCTAText: "Schedule A Call",
    successMessage: (fullName: string) =>
      fullName
        ? `We have received your submission${fullName ? ` ${fullName}` : ""}! Check your email for a confirmation.`
        : "We have received your submission! Check your email for a confirmation.",
    submitButton: "Submit",
    cancelButton: "Cancel",
  },
}
