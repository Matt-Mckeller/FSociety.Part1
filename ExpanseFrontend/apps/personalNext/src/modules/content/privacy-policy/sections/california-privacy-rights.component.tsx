import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function CaliforniaPrivacyRightsPrivacyPolicySection({
  BusinessName,
}: {
  BusinessName: string
}) {
  return (
    <Box>
      <Typography
        variant="h4"
        mb={2}
        component="h2"
        id="california-privacy-rights"
      >
        11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
      </Typography>
      <Typography paragraph>
        In Short: Yes, if you are a resident of California, you are granted
        specific rights regarding access to your personal information.
      </Typography>
      <Typography paragraph>
        California Civil Code Section 1798.83, also known as the "Shine The
        Light" law, permits our users who are California residents to request
        and obtain from us, once a year and free of charge, information about
        categories of personal information (if any) we disclosed to third
        parties for direct marketing purposes and the names and addresses of all
        third parties with which we shared personal information in the
        immediately preceding calendar year. If you are a California resident
        and would like to make such a request, please submit your request in
        writing to us using the contact information provided below.
      </Typography>
      <Typography paragraph>
        If you are under 18 years of age, reside in California, and have a
        registered account with the Website, you have the right to request
        removal of unwanted data that you publicly post on the Website. To
        request removal of such data, please contact us using the contact
        information provided below, and include the email address associated
        with your account and a statement that you reside in California. We will
        make sure the data is not publicly displayed on the Website, but please
        be aware that the data may not be completely or comprehensively removed
        from all our systems (e.g. backups, etc.).
      </Typography>
      <Typography variant="h6" mt={3}>
        CCPA Privacy Notice
      </Typography>
      <Typography paragraph>
        The California Code of Regulations defines a "resident" as:
      </Typography>
      <Box ml={8}>
        <Typography>
          (1) every individual who is in the State of California for other than
          a temporary or transitory purpose and
        </Typography>
        <Typography>
          (2) every individual who is domiciled in the State of California who
          is outside the State of California for a temporary or transitory
          purpose.
        </Typography>
      </Box>
      <Typography paragraph>
        All other individuals are defined as "non-residents."
      </Typography>
      <Typography paragraph>
        If this definition of "resident" applies to you, we must adhere to
        certain rights and obligations regarding your personal information.
      </Typography>
      <Typography variant="h6" mt={3}>
        What categories of personal information do we collect?
      </Typography>
      <Typography paragraph>
        We have collected the following categories of personal information in
        the past twelve (12) months:
      </Typography>
      <Box ml={8}>
        <Typography paragraph>
          A. Identifiers: Contact details such as real name, Internet Protocol
          address, and email address.
        </Typography>
        <Typography paragraph>B. Geolocation data: Device location.</Typography>
        {/* Uncomment and adjust the following sections as needed */}
        {/* <Typography paragraph>
          A. Identifiers: Contact details such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address, and account name.
        </Typography>
        <Typography paragraph>
          B. Personal information categories listed in the California Customer Records statute.
        </Typography>
        <ul>
          <li>
            <Typography>Name, contact information, education, employment, employment history, and financial information.</Typography>
          </li>
        </ul>
        <Typography paragraph>
          C. Commercial Information: Transaction information, purchase history, financial details, and payment information.
        </Typography>
        <Typography paragraph>
          D. Geolocation data: Device location.
        </Typography>
        <Typography paragraph>
          E. Audio, electronic, visual, thermal, olfactory, or similar information: Images and audio, video, or call recordings created in connection with our business activities.
        </Typography>
        <Typography paragraph>
          F. Professional or employment-related Information: Business contact details in order to provide you our services at a business level. Job title as well as work history and professional qualifications if you apply for a job with us.
        </Typography>
        <Typography paragraph>
          G. Inferences drawn from other personal information: Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual's preferences and characteristics.
        </Typography> */}
      </Box>
      <Typography paragraph>
        We may also collect other personal information outside of these
        categories in instances where you interact with us in-person, online, or
        by phone or mail in the context of:
      </Typography>
      <ul>
        <li>Receiving help through our customer support channels;</li>
        <li>
          Participation in customer surveys or contests; and Facilitation in the
          delivery of our Services and to respond to your inquiries.
        </li>
      </ul>
      <Typography variant="h6" mt={3}>
        How do we use and share your personal information?
      </Typography>
      <Typography paragraph>
        More information about our data collection and sharing practices can be
        found in this privacy notice. You may contact us by email at{" "}
        <Link href="mailto:info@expanseservices.com">
          info@expanseservices.com
        </Link>
        , or by referring to the contact details at the bottom of this document.
        If you are using an authorized agent to exercise your right to opt-out,
        we may deny a request if the authorized agent does not submit proof that
        they have been validly authorized to act on your behalf.
      </Typography>
      <Typography variant="h6" mt={3}>
        Will your information be shared with anyone else?
      </Typography>
      <Typography paragraph>
        Currently, your information will not be shared with any third parties.
        We prioritize the confidentiality and security of your data. However,
        it's important to note that we may share information in compliance with
        applicable laws and regulations. Our commitment is to keep you informed
        about any potential changes in our data-sharing practices and ensure
        that your privacy rights are respected under the California Consumer
        Privacy Act (CCPA).
      </Typography>
      {/* Uncomment and adjust the following sections as needed */}
      {/* <Typography paragraph>
        We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.
      </Typography> */}
      <Typography paragraph>
        We may use your personal information for our own business purposes, such
        as for undertaking internal research for technological development and
        demonstration. This is not considered to be "selling" your personal
        data. {BusinessName} has not disclosed or sold any personal information
        to third parties for a business or commercial purpose in the preceding
        12 months. {BusinessName} will not sell personal information in the
        future belonging to website visitors, users, and other consumers.
      </Typography>
      <Typography variant="h6" mt={3}>
        Your rights with respect to your personal data
      </Typography>
      <Typography paragraph>
        Right to request deletion of the data - Request to delete
      </Typography>
      <Typography paragraph>
        You can ask for the deletion of your personal information. If you ask us
        to delete your personal information, we will respect your request and
        delete your personal information, subject to certain exceptions provided
        by law, such as (but not limited to) the exercise by another consumer of
        his or her right to free speech, our compliance requirements resulting
        from a legal obligation, or any processing that may be required to
        protect against illegal activities.
      </Typography>
      <Typography paragraph>Right to be informed - Request to know</Typography>
      <Typography paragraph>
        Depending on the circumstances, you have a right to know: whether we
        collect and use your personal information; the categories of personal
        information that we collect; the purposes for which the collected
        personal information is used; whether we sell your personal information
        to third parties; the categories of personal information that we sold or
        disclosed for a business purpose; the categories of third parties to
        whom the personal information was sold or disclosed for a business
        purpose; and the business or commercial purpose for collecting or
        selling personal information.
      </Typography>
      <Typography paragraph>
        In accordance with applicable law, we are not obligated to provide or
        delete consumer information that is de-identified in response to a
        consumer request or to re-identify individual data to verify a consumer
        request.
      </Typography>
      <Typography variant="h6" mt={3}>
        Right to Non-Discrimination for the Exercise of a Consumer’s Privacy
        Rights
      </Typography>
      <Typography paragraph>
        We will not discriminate against you if you exercise your privacy
        rights.
      </Typography>
      <Typography variant="h6" mt={3}>
        Verification process
      </Typography>
      <Typography paragraph>
        Upon receiving your request, we will need to verify your identity to
        determine you are the same person about whom we have the information in
        our system. These verification efforts require us to ask you to provide
        information so that we can match it with information you have previously
        provided us. For instance, depending on the type of request you submit,
        we may ask you to provide certain information so that we can match the
        information you provide with the information we already have on file, or
        we may contact you through a communication method (e.g. phone or email)
        that you have previously provided to us. We may also use other
        verification methods as the circumstances dictate.
      </Typography>
      <Typography paragraph>
        We will only use personal information provided in your request to verify
        your identity or authority to make the request. To the extent possible,
        we will avoid requesting additional information from you for the
        purposes of verification. If, however, we cannot verify your identity
        from the information already maintained by us, we may request that you
        provide additional information for the purposes of verifying your
        identity, and for security or fraud-prevention purposes. We will delete
        such additionally provided information as soon as we finish verifying
        you.
      </Typography>
      <Typography variant="h6" mt={3}>
        Other privacy rights
      </Typography>
      <ul>
        <li>You may object to the processing of your personal data.</li>
        <li>
          You may request correction of your personal data if it is incorrect or
          no longer relevant, or ask to restrict the processing of the data.
        </li>
        <li>
          You can designate an authorized agent to make a request under the CCPA
          on your behalf. We may deny a request from an authorized agent that
          does not submit proof that they have been validly authorized to act on
          your behalf in accordance with the CCPA.
        </li>
        <li>
          You may request to opt-out from future selling of your personal
          information to third parties. Upon receiving a request to opt-out, we
          will act upon the request as soon as feasibly possible, but no later
          than 15 days from the date of the request submission.
        </li>
      </ul>
      <Typography paragraph>
        To exercise these rights, you can contact us by email at{" "}
        <Link href="mailto:info@expanseservices.com">
          info@expanseservices.com
        </Link>
        , or by referring to the contact details at the bottom of this document.
        If you have a complaint about how we handle your data, we would like to
        hear from you.
      </Typography>
    </Box>
  )
}
