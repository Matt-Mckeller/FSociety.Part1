"use client"

import { useMutation } from "@apollo/client"
import { Box, Button, Theme, useTheme } from "@mui/material"
import React, { FormEvent, useContext, useState } from "react"
import {
  EmailAddressInput,
  NameInput,
  PhoneNumberInput,
  ContactDescriptionInput,
} from "expanse.ui/form"
import {
  ExpanseValidator,
  CONTACT_VALIDATION_CONSTRAINTS,
} from "expanse.common"
import {
  AnalyticsContext,
  LayoutContext,
  REGISTER_ANALYTICS_EVENT,
} from "expanse.ui/application"
import { SUBMIT_CONTACT } from "../../gql/submit-contact"
import { ContactFormContext } from "../../context/ContactForm.context"
import { useContact } from "../../hooks/useContact.hook"
import { ContactDisplayContext } from "../../context"

export function ContactForm() {
  const [registerAnalyticsEvent] = useMutation(REGISTER_ANALYTICS_EVENT)
  const { analyticsEventContext } = useContext(AnalyticsContext)
  const theme: Theme = useTheme()
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    description,
    setDescription,
  } = useContext(ContactFormContext)
  const { handleContactResponse } = useContact()
  const { exitContact, dictionary } = useContext(ContactDisplayContext)
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const [submitContact, { data, loading, error }] = useMutation(SUBMIT_CONTACT)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string[] }>({
    email: [],
    fullName: [],
    phoneNumber: [],
    description: [],
  })

  const requestID = "registerContact"
  const {
    currentLoadingProcessIDs,
    addLoadingProcessID,
    removeLoadingProcessID,
  } = useContext(LayoutContext)

  if (loading) {
    if (currentLoadingProcessIDs.includes(requestID) && loading) {
      addLoadingProcessID(requestID)
    } else if (currentLoadingProcessIDs.includes(requestID) && !loading) {
      removeLoadingProcessID(requestID)
    }
  }

  const formIsValid = async () => {
    const validationResults = await ExpanseValidator(
      {
        email,
        phoneNumber,
        description,
        fullName,
      },
      CONTACT_VALIDATION_CONSTRAINTS,
    )

    const fieldsWithErrors =
      validationResults && Object.keys(validationResults).length
        ? Object.keys(validationResults)
        : []
    if (fieldsWithErrors.length > 0) {
      setFormErrors(validationResults)
      return false
    }
    return true
  }

  const handleOnSubmit = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (!submitDisabled) {
      setSubmitDisabled(true)

      registerAnalyticsEvent({
        variables: {
          event: "clicked-contact-submit",
          ...analyticsEventContext,
        },
      })

      const valid = (await formIsValid()) === true
      if (valid) {
        const response: any = await submitContact({
          variables: {
            fullName,
            phoneNumber,
            email,
            description,
          },
        }).catch(handleContactResponse)

        if (response) {
          handleContactResponse(response)
        }

        setSubmitDisabled(false)
      } else {
        console.log("Validation error on sign up form.")
        setSubmitDisabled(true)
      }
    } else {
      console.log("Submit was disabled, click event ignored.")
    }
  }

  const handleFullNameChange = (val: string) => {
    setFullName(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, fullName: [] })
  }
  const handleEmailChange = (val: string) => {
    setEmail(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, email: [] })
  }
  const handlePhoneNumberChange = (val: string) => {
    // Data formatting handled at input level
    setPhoneNumber(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, phoneNumber: [] })
  }
  const handleDescriptionChanged = (val: string) => {
    // Data formatting handled at input level
    setDescription(val)
    setSubmitDisabled(false)
    setFormErrors({ ...formErrors, description: [] })
  }

  const onCancelHandler = () => {
    exitContact()
  }

  return (
    <Box component="form" onSubmit={handleOnSubmit} flexGrow={1}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        mt={2}
      >
        <Box mb={4} width="100%">
          <NameInput
            autofocus
            onChange={handleFullNameChange}
            value={fullName}
            error={!!(formErrors.fullName && formErrors.fullName.length > 0)}
            helperText={
              formErrors.fullName && formErrors.fullName.length > 0
                ? formErrors.fullName[0]
                : null
            }
          />
        </Box>
        <Box mb={4} width="100%">
          <EmailAddressInput
            onChange={handleEmailChange}
            value={email}
            error={!!(formErrors.email && formErrors.email.length > 0)}
            helperText={
              formErrors.email && formErrors.email.length > 0
                ? formErrors.email[0]
                : null
            }
          />
        </Box>
        <Box mb={6} width="100%">
          <PhoneNumberInput
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
            error={
              !!(formErrors.phoneNumber && formErrors.phoneNumber.length > 0)
            }
            helperText={
              formErrors.phoneNumber && formErrors.phoneNumber.length > 0
                ? formErrors.phoneNumber[0]
                : null
            }
          ></PhoneNumberInput>
        </Box>
        <Box mb={6} width="100%">
          <ContactDescriptionInput
            onChange={handleDescriptionChanged}
            value={description}
            error={
              !!(formErrors.description && formErrors.description.length > 0)
            }
            helperText={
              formErrors.description && formErrors.description.length > 0
                ? formErrors.description[0]
                : null
            }
          ></ContactDescriptionInput>
        </Box>
        {/* Form side action row */}
        <Box display="flex" gap={2} alignSelf={"stretch"}>
          <Button
            fullWidth
            variant="outlined"
            onClick={onCancelHandler}
            sx={{
              color: "text.primary",
              opacity: "20%",
              "&:hover": { opacity: "100%" },
            }}
          >
            {dictionary.cancelButton}
          </Button>

          <Button
            fullWidth
            type="submit"
            disabled={submitDisabled || loading}
            variant="contained"
            onClick={handleOnSubmit}
            color="primary"
            sx={{
              whiteSpace: "nowrap",
              backgroundColor: theme.palette.primary,
              "&:hover": {
                background: theme.palette.primary.highSaturation,
              },
            }}
          >
            {dictionary.submitButton}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
