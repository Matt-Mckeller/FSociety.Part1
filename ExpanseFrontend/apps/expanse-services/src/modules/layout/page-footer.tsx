"use client"
import React from "react"
import { alpha, Box, Link, useMediaQuery } from "@mui/material"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import GitHubIcon from "@mui/icons-material/GitHub"
import { PRIVACY_POLICY_ROUTE, TERMS_ROUTE } from "../../config/routes"
import { useTheme } from "@mui/system"

function PhoneNumber() {
  // todo to config/env
  const PhoneNumber = "+1 816-739-9473"
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <PhoneIcon sx={{ color: "primary", height: 16 }} />
      <Box display="inline" ml={1}>
        <Link href={`tel:${PhoneNumber}`}>{PhoneNumber}</Link>
      </Box>
    </Box>
  )
}

function Github() {
  return (
    // Margin adjusted because of icon having extra space on left side for improved alignment
    <Box display="flex" justifyContent="center" alignItems="center" ml="-5px">
      <GitHubIcon sx={{ height: 16 }} />
      <Box pl={1}>
        <Link
          href="https://github.com/matt-mckeller"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Samples
        </Link>
      </Box>
    </Box>
  )
}

function EmailAddress() {
  const CompanyEmail = "matt@expanseservices.com"
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <EmailIcon sx={{ height: 16 }} />
      <Link href={`mailto:${CompanyEmail}`} ml={1}>
        {CompanyEmail}
      </Link>
    </Box>
  )
}

function PrivacyPolicyLink(textAlign: any = "center") {
  return (
    <Link textAlign={textAlign} href={PRIVACY_POLICY_ROUTE} underline="hover">
      Privacy Policy
    </Link>
  )
}

function TermsOfServiceLink(textAlign: any = "center") {
  return (
    <Link textAlign={textAlign} href={TERMS_ROUTE} underline="hover">
      Terms of Service
    </Link>
  )
}

function PageFooter() {
  const theme = useTheme()
  const showDesktop = !useMediaQuery(theme.breakpoints.down("laptop"))

  return (
    <Box
      py={8}
      px={8}
      display="flex"
      flexDirection={showDesktop ? "row" : "column"}
      justifyContent="space-between"
      width={"100%"}
      sx={{
        backgroundColor: theme.palette.background.default,
        // @ts-ignore mui theme has unknown for shadows
        boxShadow: theme.shadows[1],
        borderTop:
          theme.palette.mode === "dark"
            ? `1px solid ${alpha(theme.palette.text.primary, 0.3)}`
            : "none",
      }}
    >
      <Github />
      <PhoneNumber />
      <EmailAddress />
      {/* <PrivacyPolicyLink textAlign={showDesktop ? "left" : "center"} /> */}
      {/* <TermsOfServiceLink textAlign={showDesktop ? "right" : "center"} /> */}
    </Box>
  )
}

export default PageFooter
