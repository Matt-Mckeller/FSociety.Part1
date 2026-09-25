"use client"
import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { Box, Typography, Link } from "@mui/material"
import { CollectedInformationPrivacyPolicySection } from "./sections/collected-information.component"
import { EXPANSE_PRIVACY_POLICY_SECTIONS } from "./privacy-policy-sections.enum"
import { HowWeUseInformationPrivacyPolicySection } from "./sections/how-we-use-information.component"
import { CookiesAndTrackingPrivacyPolicySection } from "./sections/cookies-and-tracking"
import { SocialLoginsPrivacyPolicySection } from "./sections/social-logins.component"
import { HowLongDoWeKeepInformationPrivacyPolicySection } from "./sections/how-long-do-we-keep-information.component"
import { InformationSecurityPrivacyPolicySection } from "./sections/information-security.component"
import { PrivacyRightsPrivacyPolicySection } from "./sections/privacy-rights.component"
import { DoNotTrackPrivacyPolicySection } from "./sections/do-not-track.component"
import { CaliforniaPrivacyRightsPrivacyPolicySection } from "./sections/california-privacy-rights.component"
import { NoticeUpdatesPrivacyPolicySection } from "./sections/notice-updates.component"
import { ContactUsPrivacyPolicySection } from "./sections/contact-us.component"
import { ViewingYourDataPrivacyPolicyComponent } from "./sections/viewing-your-data.component"
import { DoWeShareInformationPrivacyPolicySection } from "./sections/do-we-share-information.component"
import { InformationAndMinorsPrivacyPolicySection } from "./sections/information-and-minors.component"

const PrivacyPolicyContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
}))

function PrivacyPolicyHeader() {
  return (
    <Box>
      <Typography>
        <span>
          Thank you for choosing to be part of our community at Expanse Services
          llc (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). We are committed to protecting your personal
          information and your right to privacy. If you have any questions or
          concerns about this privacy notice or our practices with regard to
          your personal information, please contact us at{" "}
        </span>
        <span>
          <Link href="mailto:info@expanseservices.com">
            info@expanseservices.com
          </Link>
        </span>
        <span>.</span>
      </Typography>
      <br />
      <Typography>
        <span>
          This privacy notice describes how we might use your information if
          you:
        </span>
      </Typography>
      <ul>
        <li>
          <Typography>
            <span>Visit our website at </span>
            <span>
              <Link href="https://www.expanseservices.com">
                https://www.expanseservices.com
              </Link>
            </span>
          </Typography>
        </li>
        <li>
          <Typography>
            <span>
              Engage with us in other related ways ― including any sales,
              marketing, or events
            </span>
          </Typography>
        </li>
      </ul>
      <br />
      <Typography>
        <span>In this privacy notice, if we refer to:</span>
      </Typography>
      <ul>
        <li>
          <span className="bold">&quot;Website,&quot;</span>
          <span>
            &nbsp;we are referring to any website of ours that references or
            links to this policy.
          </span>
        </li>
        <li>
          <span className="bold">&quot;Services,&quot;</span>
          <span>
            &nbsp;we are referring to our Website, and other related services,
            including any sales, marketing, or events.
          </span>
        </li>
      </ul>
      <br />
      <Typography>
        <span>
          The purpose of this privacy notice is to explain to you in the
          clearest way possible what information we collect, how we use it, and
          what rights you have in relation to it. If there are any terms in this
          privacy notice that you do not agree with, please discontinue use of
          our Services immediately.
        </span>
      </Typography>
      <br />
      <Typography>
        <span className="bold">
          Please read this privacy notice carefully, as it will help you
          understand what we do with the information that we collect.
        </span>
      </Typography>
    </Box>
  )
}

export function PrivacyPolicyComponent() {
  const BusinessName = "Expanse Services LLC"
  const sections: { [key: string]: string } = {
    [EXPANSE_PRIVACY_POLICY_SECTIONS.COLLECTED_INFORMATION]:
      "WHAT INFORMATION DO WE COLLECT?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.HOW_WE_USE_INFORMATION]:
      "HOW DO WE USE YOUR INFORMATION?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.DO_WE_SHARE_INFORMATION]:
      "WILL YOUR INFORMATION BE SHARED WITH ANYONE?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.COOKIES_AND_TRACKING]:
      "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.SOCAL_LOGINS]:
      "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.HOW_LONG_DO_WE_KEEP_INFORMATION]:
      "HOW LONG DO WE KEEP YOUR INFORMATION?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.INFORMATION_SECURITY]:
      "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.INFORMATION_AND_MINORS]:
      "DO WE COLLECT INFORMATION FROM MINORS?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.PRIVACY_RIGHTS]:
      "WHAT ARE YOUR PRIVACY RIGHTS?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.DO_NOT_TRACK]:
      "CONTROLS FOR DO-NOT-TRACK FEATURES",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.CALIFORNIA_PRIVACY_RIGHTS]:
      "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.NOTICE_UPDATES]:
      "DO WE MAKE UPDATES TO THIS NOTICE?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.CONTACT_US]:
      "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    [EXPANSE_PRIVACY_POLICY_SECTIONS.VIEWING_YOUR_DATA]:
      "HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU",
  }
  const allSections = Object.keys(sections)

  return (
    <PrivacyPolicyContainer p={4} flexGrow="1" >
      <Typography variant="h1">Privacy Policy</Typography>
      <PrivacyPolicyHeader />
      <Box mt={4} style={{ fontWeight: "500" }}>
        <Typography style={{ fontWeight: "500" }} component="h2">
          TABLE OF CONTENTS
        </Typography>
        <Box component="ol">
          {allSections.map((sectionIndex: string) => (
            <Box key={sectionIndex} component="li">
              <Link href={`#${sectionIndex}`}>{sections[sectionIndex]}</Link>
            </Box>
          ))}
        </Box>
        <br />
        <CollectedInformationPrivacyPolicySection />
        <br />
        <HowWeUseInformationPrivacyPolicySection />
        <br />
        <DoWeShareInformationPrivacyPolicySection />
        <br />
        <CookiesAndTrackingPrivacyPolicySection />
        <br />
        <SocialLoginsPrivacyPolicySection />
        <br />
        <HowLongDoWeKeepInformationPrivacyPolicySection />
        <br />
        <InformationSecurityPrivacyPolicySection />
        <br />
        <InformationAndMinorsPrivacyPolicySection />
        <br />
        <PrivacyRightsPrivacyPolicySection />
        <br />
        <DoNotTrackPrivacyPolicySection />
        <br />
        <CaliforniaPrivacyRightsPrivacyPolicySection
          BusinessName={BusinessName}
        />
        <br />
        <br />
        <NoticeUpdatesPrivacyPolicySection />
        <br />
        <br />
        <ContactUsPrivacyPolicySection BusinessName={BusinessName} />
        <br />
        <ViewingYourDataPrivacyPolicyComponent />
        <br />
      </Box>
    </PrivacyPolicyContainer>
  )
}

export default PrivacyPolicyComponent
