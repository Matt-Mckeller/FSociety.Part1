import React from "react"
import { Box, Typography, Link } from "@mui/material"

export function DoWeShareInformationPrivacyPolicySection() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        mb={2}
        id="do-we-share-information"
      >
        3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
      </Typography>
      <Typography variant="body1" component="p">
        In Short: We only share information with your consent, to comply with
        laws, to provide you with services, to protect your rights, or to
        fulfill business obligations. We may process or share your data that we
        hold based on the following legal basis:
      </Typography>
      <Box component="ul">
        <Box component="li">
          <Typography variant="body1" component="span" fontWeight="bold">
            Consent:
          </Typography>
          <Typography variant="body1" component="span">
            {" "}
            We may process your data if you have given us specific consent to
            use your personal information for a specific purpose.
          </Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1" component="span" fontWeight="bold">
            Legitimate Interests:
          </Typography>
          <Typography variant="body1" component="span">
            {" "}
            We may process your data when it is reasonably necessary to achieve
            our legitimate business interests.
          </Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1" component="span" fontWeight="bold">
            Performance of a Contract:
          </Typography>
          <Typography variant="body1" component="span">
            {" "}
            Where we have entered into a contract with you, we may process your
            personal information to fulfill the terms of our contract.
          </Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1" component="span" fontWeight="bold">
            Legal Obligations:
          </Typography>
          <Typography variant="body1" component="span">
            {" "}
            We may disclose your information where we are legally required to do
            so in order to comply with applicable law, governmental requests, a
            judicial proceeding, court order, or legal process, such as in
            response to a court order or a subpoena (including in response to
            public authorities to meet national security or law enforcement
            requirements).
          </Typography>
        </Box>
        <Box component="li">
          <Typography variant="body1" component="span" fontWeight="bold">
            Vital Interests:
          </Typography>
          <Typography variant="body1" component="span">
            {" "}
            We may disclose your information where we believe it is necessary to
            investigate, prevent, or take action regarding potential violations
            of our policies, suspected fraud, situations involving potential
            threats to the safety of any person and illegal activities, or as
            evidence in litigation in which we are involved.
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" component="p" mt={2}>
        More specifically, we may need to process your data or share your
        personal information in the following situations:
      </Typography>
      <Box component="ul">
        <Box component="li">
          <Typography variant="body1" component="span" fontWeight="bold">
            Business Transfers:
          </Typography>
          <Typography variant="body1" component="span">
            {" "}
            We may share or transfer your information in connection with, or
            during negotiations of, any merger, sale of company assets,
            financing, or acquisition of all or a portion of our business to
            another company.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
