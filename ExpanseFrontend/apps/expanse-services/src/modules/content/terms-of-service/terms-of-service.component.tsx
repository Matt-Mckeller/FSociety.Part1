"use client"
import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { Box, Typography, Link, useTheme } from "@mui/material"
import { EXPANSE_TERMS_OF_SERVICE_SECTIONS } from "./terms-of-service-sections.enum"
import { AgreeToTermsSection } from "./sections/agree-to-terms-of-service"
import { IntellectualPropertyRightsSection } from "./sections/intellectual-propert-rights"
import { UserRepresentationsSection } from "./sections/user-representations"
import { ProhibitedActivitiesSection } from "./sections/prohibited-activities"
import { UserGeneratedContributionsSection } from "./sections/user-generated-contributions"
import { ContributionLicenseSection } from "./sections/contribution-license"
import { SocialMediaSection } from "./sections/social-media"
import { SubmissionSection } from "./sections/submissions"
import { SiteManagementSection } from "./sections/site-management"
import { TermsAndTerminationSection } from "./sections/terms-and-termination"
import { ModificationsAndInterruptions } from "./sections/modifications-and-interruptions"
import { GoverningLawSection } from "./sections/governing-law"
import { DisputeResolutionSection } from "./sections/dispute-resolution"
import { CorrectionsSection } from "./sections/corrections"
import { DisclaimerSection } from "./sections/disclaimer"
import { LimitationsOfLiabilitySection } from "./sections/limitations-of-liability"
import { PrivacyPolicySection } from "./sections/privacy-policy"
import { IndemnificationSection } from "./sections/indemnification"
import { UserDataSection } from "./sections/user-data"
import { ElectronicCommunicationsTransactionsAndSignaturesSection } from "./sections/electronic-communications-transactions-and-signatures"
import { CaliforniaUsersAndResidentsSection } from "./sections/california-users-and-residents"
import { MiscellaneousSection } from "./sections/miscellaneous"
import { ContactUsSection } from "./sections/contact-us"
import { UserRegistrationSection } from "./sections/user-registrations"

const TermsOfServiceContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
}))

export function TermsOfServiceComponent() {
  // Previously registered office address was listed
  const BusinessName = "Expanse Services LLC"
  const sections: { [key: string]: string } = {
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.AGREE_TO_TERMS]: "AGREEMENT TO TERMS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.INTELLECTUAL_PROPERTY_RIGHTS]:
      "INTELLECTUAL PROPERTY RIGHTS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_REPRESENTATIONS]:
      "USER REPRESENTATIONS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_REGISTRATIONS]:
      "USER REGISTRATIONS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.PROHIBITED_ACTIVITIES]:
      "PROHIBITED ACTIVITIES",
    // [EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_GENERATED_CONTRIBUTIONS]: 'USER GENERATED CONTRIBUTIONS',
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.CONTRIBUTION_LICENSE]:
      "CONTRIBUTION LICENSE",
    // [EXPANSE_TERMS_OF_SERVICE_SECTIONS.SOCIAL_MEDIA]: 'SOCIAL MEDIA',
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.SUBMISSIONS]: "SUBMISSIONS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.SITE_MANAGEMENT]: "SITE MANAGEMENT",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.PRIVACY_POLICY]: "PRIVACY POLICY",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.TERMS_AND_TERMINATION]:
      "TERMS AND TERMINATION",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.MODIFICATIONS_AND_INTERRUPTIONS]:
      "MODIFICATION AND INTERRUPTIONS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.GOVERNING_LAW]: "GOVERNING LAW",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.DISPUTE_RESOLUTION]:
      "DISPUTE RESOLUTION",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.CORRECTIONS]: "CORRECTIONS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.DISCLAIMER]: "DISCLAIMER",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.LIMITATIONS_OF_LIABILITY]:
      "LIMITATIONS OF LIABILITY",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.INDEMNIFICATION]: "INDEMNIFICATION",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_DATA]: "USER DATA",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.ELECTRONIC_COMMUNICATIONS_TRANSACTIONS_AND_SIGNATURES]:
      "ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.CALIFORNIA_USERS_AND_RESIDENTS]:
      "CALIFORNIA USERS AND RESIDENTS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.MISCELLANEOUS]: "MISCELLANEOUS",
    [EXPANSE_TERMS_OF_SERVICE_SECTIONS.CONTACT_US]: "CONTACT US",
  }
  const allSections = Object.keys(sections)

  const theme = useTheme()
  return (
    <TermsOfServiceContainer p={4}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h3" component="h1">
          Terms of Service
        </Typography>
      </Box>
      <Box mt={4} style={{ fontWeight: "500" }}>
        <Typography fontWeight={500} component="h2">
          TABLE OF CONTENTS
        </Typography>
        <ol>
          {allSections.map((sectionIndex: string) => (
            <li key={sectionIndex}>
              <Link href={`#${sectionIndex}`}>{sections[sectionIndex]}</Link>
            </li>
          ))}
        </ol>
        <br />
        <AgreeToTermsSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.AGREE_TO_TERMS}
          title={`1. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.AGREE_TO_TERMS]}`}
          BusinessName={BusinessName}
        />
        <br />
        <IntellectualPropertyRightsSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.INTELLECTUAL_PROPERTY_RIGHTS}
          title={`2. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.INTELLECTUAL_PROPERTY_RIGHTS]}`}
        />
        <br />
        <UserRepresentationsSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_REPRESENTATIONS}
          title={`3. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_REPRESENTATIONS]}`}
        />
        <br />
        <UserRegistrationSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_REGISTRATIONS}
          title={`4. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_REGISTRATIONS]}`}
        />
        <br />
        <ProhibitedActivitiesSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.PROHIBITED_ACTIVITIES}
          title={`5. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.PROHIBITED_ACTIVITIES]}`}
        />
        <br />
        {/* <UserGeneratedContributionsSection id={} title={`6. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_GENERATED_CONTRIBUTIONS]}`} /> */}
        <br />
        <ContributionLicenseSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.CONTRIBUTION_LICENSE}
          title={`6. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.CONTRIBUTION_LICENSE]}`}
        />
        <br />
        {/* <SocialMediaSection id={} title={`8. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.SOCIAL_MEDIA]}`} /> */}
        {/* <br /> */}
        <SubmissionSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.SUBMISSIONS}
          title={`7. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.SUBMISSIONS]}`}
        />
        <br />
        <SiteManagementSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.SITE_MANAGEMENT}
          title={`8. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.SITE_MANAGEMENT]}`}
        />
        <br />
        <PrivacyPolicySection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.PRIVACY_POLICY}
          title={`9. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.PRIVACY_POLICY]}`}
        />
        <br />
        <TermsAndTerminationSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.TERMS_AND_TERMINATION}
          title={`10. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.TERMS_AND_TERMINATION]}`}
        />
        <br />
        <ModificationsAndInterruptions
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.MODIFICATIONS_AND_INTERRUPTIONS}
          title={`11. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.MODIFICATIONS_AND_INTERRUPTIONS]}`}
        />
        <br />
        <GoverningLawSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.GOVERNING_LAW}
          title={`12. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.GOVERNING_LAW]}`}
        />
        <br />
        <DisputeResolutionSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.DISPUTE_RESOLUTION}
          title={`13. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.DISPUTE_RESOLUTION]}`}
        />
        <br />
        <CorrectionsSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.CORRECTIONS}
          title={`14. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.CORRECTIONS]}`}
        />
        <br />
        <DisclaimerSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.DISCLAIMER}
          title={`15. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.DISCLAIMER]}`}
        />
        <br />
        <LimitationsOfLiabilitySection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.LIMITATIONS_OF_LIABILITY}
          title={`16. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.LIMITATIONS_OF_LIABILITY]}`}
        />
        <br />
        <IndemnificationSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.INDEMNIFICATION}
          title={`17. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.INDEMNIFICATION]}`}
        />
        <br />
        <UserDataSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_DATA}
          title={`18. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.USER_DATA]}`}
        />
        <br />
        <ElectronicCommunicationsTransactionsAndSignaturesSection
          id={
            EXPANSE_TERMS_OF_SERVICE_SECTIONS.ELECTRONIC_COMMUNICATIONS_TRANSACTIONS_AND_SIGNATURES
          }
          title={`19. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.ELECTRONIC_COMMUNICATIONS_TRANSACTIONS_AND_SIGNATURES]}`}
        />
        <br />
        <CaliforniaUsersAndResidentsSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.CALIFORNIA_USERS_AND_RESIDENTS}
          title={`20. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.CALIFORNIA_USERS_AND_RESIDENTS]}`}
        />
        <br />
        <MiscellaneousSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.MISCELLANEOUS}
          title={`21. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.MISCELLANEOUS]}`}
        />
        <br />
        <ContactUsSection
          id={EXPANSE_TERMS_OF_SERVICE_SECTIONS.CONTACT_US}
          title={`22. ${sections[EXPANSE_TERMS_OF_SERVICE_SECTIONS.CONTACT_US]}`}
        />

        <br />
      </Box>
    </TermsOfServiceContainer>
  )
}

export default TermsOfServiceComponent
