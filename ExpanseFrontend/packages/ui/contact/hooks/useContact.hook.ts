import { useContext } from "react"
import { getDisplayErrorMessage, ValidationContent } from "expanse.common"
import { ContactDisplayContext } from "../context/ContactDisplay.context"
import { REGISTER_ANALYTICS_EVENT } from "../../application/gql"
import { useMutation } from "@apollo/client"
import { AnalyticsContext, LayoutContext } from "../../application"
import { ContactFormContext } from "../context/ContactForm.context"

export interface UseContactType {
  handleContactResponse: (response: any) => boolean
}

export function useContact(): UseContactType {
  const { exitContact, dictionary } = useContext(ContactDisplayContext)
  const { fullName } = useContext(ContactFormContext)
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const { showSnackbarSuccess, showSnackbarError } = useContext(LayoutContext)

  const handleError = (errorMessage: string) => {
    showSnackbarError(errorMessage)
  }
  const handleSuccess = () => {
    exitContact("successfulSubmit")
    registerAnalyticsEvent({
      variables: {
        event: "exit-contact",
        ...analyticsEventContext,
        params: JSON.stringify({
          location: "successfulSubmit",
        }),
      },
    })
    showSnackbarSuccess(dictionary.successMessage(fullName))
    registerAnalyticsEvent({
      variables: {
        event: "successful-contact",
        ...analyticsEventContext,
        params: null,
      },
    })
    return true
  }

  const handleResponse = (response: any) => {
    if (
      response &&
      response?.data?.registerContact &&
      response?.data?.registerContact.success === true
    ) {
      handleSuccess()
      return true
    }
    const errorMessage: string = getDisplayErrorMessage(
      response,
      ValidationContent["en"].responseErrors.contact,
    )
    handleError(errorMessage)

    return false
  }

  return {
    handleContactResponse: handleResponse,
  }
}
