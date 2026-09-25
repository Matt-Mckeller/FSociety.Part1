import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function PrivacyRightsPrivacyPolicySection() {
  return (
    <Box>
      <Typography variant="h4" component="h2" mb={2} id="privacy-rights">
        9. WHAT ARE YOUR PRIVACY RIGHTS?
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        In Short: In some regions, such as the European Economic Area (EEA) and
        United Kingdom (UK), you have rights that allow you greater access to
        and control over your personal information. You may review, change, or
        terminate your account at any time.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        In some regions (like the EEA and UK), you have certain rights under
        &nbsp;applicable data protection laws. These may include the right (i)
        to request access and obtain a copy of your personal information, (ii)
        to request rectification or erasure; (iii) to restrict the processing of
        your personal information; and (iv) if applicable, to data portability.
        In certain circumstances, you may also have the right to object to the
        processing of your personal information. To make such a request, please
        use the contact details provided below. We will consider and act upon
        any request in accordance with applicable data protection laws.
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        If we are relying on your consent to process your personal information,
        you have the right to withdraw your consent at any time. Please note
        however that this will not affect the lawfulness of the processing
        before its withdrawal, nor will it affect the processing of your
        personal information conducted in reliance on lawful processing grounds
        other than consent.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        If you are a resident in the EEA or UK and you believe we are unlawfully
        processing your personal information, you also have the right to
        complain to your local data protection supervisory authority. You can
        find their contact details here:
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        <Link href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">
          https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
        </Link>
        . &nbsp;
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        If you are a resident in Switzerland, the contact details for the data
        protection authorities are available here:
        <Link href="https://www.edoeb.admin.ch/edoeb/en/home.html">
          https://www.edoeb.admin.ch/edoeb/en/home.html
        </Link>
        .
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        If you have questions or comments about your privacy rights, you may
        email us at info@expanseservices.com.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        Account Information
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        If you would at any time like to review or change the information in
        your account or terminate your account, you can:
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        Contact us using the contact information provided. Upon your request to
        terminate your account, we will deactivate or delete your account and
        information from our active databases. However, we may retain some
        information in our files to prevent fraud, troubleshoot problems, assist
        with any investigations, enforce our Terms of Use and/or comply with
        applicable legal requirements.
      </Typography>

      <Typography component="p" variant="body1" paragraph>
        Cookies and similar technologies: Most Web browsers are set to accept
        cookies by default. If you prefer, you can usually choose to set your
        browser to remove cookies and to reject cookies. If you choose to remove
        cookies or reject cookies, this could affect certain features or
        services of our Website. To opt-out of interest-based advertising by
        advertisers on our Website visit{" "}
        <Link href="http://www.aboutads.info/choices/">
          http://www.aboutads.info/choices/
        </Link>
        .
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        Opting out of email marketing : You can unsubscribe from our marketing
        email list at any time by clicking on the unsubscribe link in the emails
        that we send or by contacting us using the details provided below. You
        will then be removed from the marketing email list — however, we may
        still communicate with you, for example to send you service-related
        emails that are necessary for the administration and use of your
        account, to respond to service requests, or for other non-marketing
        purposes.
      </Typography>

      <Typography component="p" variant="body1">
        To otherwise opt-out, you may:
      </Typography>
      <Typography component="p" variant="body1" paragraph>
        Contact us using the contact information provided.
      </Typography>
    </Box>
  )
}
