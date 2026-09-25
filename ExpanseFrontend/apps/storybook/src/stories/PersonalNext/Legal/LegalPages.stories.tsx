import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { Box, Typography, Link, styled } from "@mui/material"

// Simplified mock components that don't require all the section imports
// These represent the structure without requiring the full dependency tree

const LegalPageContainer = styled(Box)(({ theme }) => ({
  overflow: "hidden",
  maxWidth: 800,
  margin: "0 auto",
}))

// Mock Terms of Service Component
const MockTermsOfService = () => {
  const sections = [
    "AGREEMENT TO TERMS",
    "INTELLECTUAL PROPERTY RIGHTS",
    "USER REPRESENTATIONS",
    "USER REGISTRATIONS",
    "PROHIBITED ACTIVITIES",
    "CONTRIBUTION LICENSE",
    "SUBMISSIONS",
    "SITE MANAGEMENT",
    "PRIVACY POLICY",
    "TERMS AND TERMINATION",
    "MODIFICATION AND INTERRUPTIONS",
    "GOVERNING LAW",
    "DISPUTE RESOLUTION",
    "CORRECTIONS",
    "DISCLAIMER",
    "LIMITATIONS OF LIABILITY",
    "INDEMNIFICATION",
    "USER DATA",
    "ELECTRONIC COMMUNICATIONS",
    "CALIFORNIA USERS AND RESIDENTS",
    "MISCELLANEOUS",
    "CONTACT US",
  ]

  return (
    <LegalPageContainer p={4}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h3" component="h1">
          Terms of Service
        </Typography>
      </Box>
      <Box mt={4} sx={{ fontWeight: 500 }}>
        <Typography fontWeight={500} component="h2">
          TABLE OF CONTENTS
        </Typography>
        <ol>
          {sections.map((section, index) => (
            <li key={index}>
              <Link href={`#section-${index}`} sx={{ cursor: "pointer" }}>
                {section}
              </Link>
            </li>
          ))}
        </ol>
        <br />

        {/* Sample Section */}
        <Box id="section-0" mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            1. AGREEMENT TO TERMS
          </Typography>
          <Typography paragraph>
            These Terms of Use constitute a legally binding agreement made
            between you, whether personally or on behalf of an entity
            (&quot;you&quot;) and Expanse Services LLC (&quot;Company,&quot;
            &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), concerning your
            access to and use of the expanseservices.com website as well as any
            other media form, media channel, mobile website or mobile
            application related, linked, or otherwise connected thereto
            (collectively, the &quot;Site&quot;).
          </Typography>
          <Typography paragraph>
            You agree that by accessing the Site, you have read, understood, and
            agreed to be bound by all of these Terms of Use.
          </Typography>
        </Box>

        {/* Placeholder for more sections */}
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.100",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Additional sections (2-22) would appear here...
          </Typography>
        </Box>
      </Box>
    </LegalPageContainer>
  )
}

// Mock Privacy Policy Component
const MockPrivacyPolicy = () => {
  const sections = [
    "WHAT INFORMATION DO WE COLLECT?",
    "HOW DO WE USE YOUR INFORMATION?",
    "WILL YOUR INFORMATION BE SHARED WITH ANYONE?",
    "DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?",
    "HOW DO WE HANDLE YOUR SOCIAL LOGINS?",
    "HOW LONG DO WE KEEP YOUR INFORMATION?",
    "HOW DO WE KEEP YOUR INFORMATION SAFE?",
    "WHAT ARE YOUR PRIVACY RIGHTS?",
    "CONTROLS FOR DO-NOT-TRACK FEATURES",
    "DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?",
    "DO WE MAKE UPDATES TO THIS NOTICE?",
    "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?",
    "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?",
  ]

  return (
    <LegalPageContainer p={4}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h3" component="h1">
          Privacy Policy
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography paragraph>
          Thank you for choosing to be part of our community at Expanse Services
          LLC (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
          &quot;our&quot;). We are committed to protecting your personal
          information and your right to privacy. If you have any questions or
          concerns about this privacy notice or our practices with regard to
          your personal information, please contact us at{" "}
          <Link href="mailto:info@expanseservices.com">
            info@expanseservices.com
          </Link>
          .
        </Typography>

        <Typography fontWeight={500} component="h2" mt={4}>
          TABLE OF CONTENTS
        </Typography>
        <ol>
          {sections.map((section, index) => (
            <li key={index}>
              <Link href={`#privacy-section-${index}`} sx={{ cursor: "pointer" }}>
                {section}
              </Link>
            </li>
          ))}
        </ol>
        <br />

        {/* Sample Section */}
        <Box id="privacy-section-0" mb={4}>
          <Typography variant="h5" component="h2" gutterBottom>
            1. WHAT INFORMATION DO WE COLLECT?
          </Typography>
          <Typography variant="h6" gutterBottom>
            Personal information you disclose to us
          </Typography>
          <Typography paragraph>
            We collect personal information that you voluntarily provide to us
            when you register on the Website, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Website or otherwise when you
            contact us.
          </Typography>
        </Box>

        {/* Placeholder for more sections */}
        <Box
          sx={{
            p: 2,
            bgcolor: "grey.100",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Additional sections (2-13) would appear here...
          </Typography>
        </Box>
      </Box>
    </LegalPageContainer>
  )
}

// Individual Section Component Mock
const MockLegalSection = ({
  title,
  content,
}: {
  title: string
  content: string
}) => {
  return (
    <Box mb={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography paragraph>{content}</Typography>
    </Box>
  )
}

const meta: Meta = {
  title: "PersonalNext/Legal",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Legal page components for Terms of Service and Privacy Policy.

These components display the legal agreements and policies:
- **TermsOfServiceComponent**: Full terms of service with 22 sections
- **PrivacyPolicyComponent**: Privacy policy with 13 sections

Both components use a table of contents with anchor links for navigation
and styled containers for consistent presentation.
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj

/** Terms of Service - Full page */
export const TermsOfService: Story = {
  render: () => <MockTermsOfService />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete Terms of Service page with table of contents and all legal sections.",
      },
    },
  },
}

/** Privacy Policy - Full page */
export const PrivacyPolicy: Story = {
  render: () => <MockPrivacyPolicy />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete Privacy Policy page with table of contents and all privacy-related sections.",
      },
    },
  },
}

/** Individual Section - Agreement to Terms */
export const AgreementToTermsSection: Story = {
  render: () => (
    <MockLegalSection
      title="1. AGREEMENT TO TERMS"
      content="These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('you') and Expanse Services LLC ('Company,' 'we,' 'us,' or 'our'), concerning your access to and use of the expanseservices.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the 'Site')."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Individual section component showing the agreement to terms.",
      },
    },
  },
}

/** Individual Section - Privacy Rights */
export const PrivacyRightsSection: Story = {
  render: () => (
    <MockLegalSection
      title="8. WHAT ARE YOUR PRIVACY RIGHTS?"
      content="In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right to request access and obtain a copy of your personal information, to request rectification or erasure, to restrict the processing of your personal information, and if applicable, to data portability."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Individual section component showing privacy rights information.",
      },
    },
  },
}

/** Table of Contents Only */
export const TableOfContentsOnly: Story = {
  render: () => (
    <LegalPageContainer p={4}>
      <Typography variant="h4" gutterBottom>
        Terms of Service
      </Typography>
      <Typography fontWeight={500} component="h2" gutterBottom>
        TABLE OF CONTENTS
      </Typography>
      <ol>
        {[
          "AGREEMENT TO TERMS",
          "INTELLECTUAL PROPERTY RIGHTS",
          "USER REPRESENTATIONS",
          "USER REGISTRATIONS",
          "PROHIBITED ACTIVITIES",
          "CONTRIBUTION LICENSE",
        ].map((section, index) => (
          <li key={index}>
            <Link href={`#section-${index}`} sx={{ cursor: "pointer" }}>
              {section}
            </Link>
          </li>
        ))}
      </ol>
    </LegalPageContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Table of contents navigation with anchor links to each section.",
      },
    },
  },
}

/** Mobile View */
export const MobileView: Story = {
  render: () => (
    <Box sx={{ maxWidth: 375 }}>
      <MockTermsOfService />
    </Box>
  ),
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: "Terms of Service as it appears on mobile devices.",
      },
    },
  },
}
