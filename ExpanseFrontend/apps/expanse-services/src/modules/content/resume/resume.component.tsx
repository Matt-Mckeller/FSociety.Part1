"use client"
import React, { useState } from "react"
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  styled,
  Grid,
  Link,
  useMediaQuery,
  useTheme,
  ListItemIcon,
} from "@mui/material"

import { useSearchParams } from "next/navigation"
import EmailIcon from "@mui/icons-material/Email"
import PhoneIcon from "@mui/icons-material/Phone"
import GitHubIcon from "@mui/icons-material/GitHub"
import { LinkedIn } from "@mui/icons-material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import StarIcon from "@mui/icons-material/Star"
import CircleIcon from "@mui/icons-material/Circle"
import AddIcon from "@mui/icons-material/Add"

import DevelopmentContent from "./resumeContentDeveloper.json"
import ProductContent from "./resumeContentProduct.json"

import {
  type AdditionalTechnicalSkillsAndKnowledge,
  type Education,
  type ExecutiveSummary,
  type DeveloperResumeContent,
  type TechnicalSkillHighlights,
  type WorkExperience,
  ProductResumeContent,
  ProductSkillHighlights,
} from "./resumeContent.type"
import { SectionSpacer, TypographyResponsive } from "expanse.ui/theme"
import { Dictionary, ResumeDictionaryHeaderContent } from "./dictionary"
import { CalendlyCTAButton } from "expanse.ui/contact"
import { MattProfilePicture } from "../career"
import { OneTwoThreeLine } from "expanse.dynamicAssets"

const ResumeList = styled(List)(() => ({
  padding: 0,
  margin: 0,
}))

const ResumeListItem = styled(ListItem)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
}))

const ResumeTechnicalSkillHighlightsDisplay = ({
  sectionContent,
}: {
  sectionContent: TechnicalSkillHighlights
}) => {
  return (
    <Box>
      <Typography variant="h6">
        {sectionContent.subsections.frameworksAndLibraries.label}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.frameworksAndLibraries.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.languages.label}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.languages.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.databasesAndData.label}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.databasesAndData.values.join(", ")}
      </Typography>

      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.apis.label}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.apis.values.join(", ")}
      </Typography>
      <Box>
        <Typography variant="h6" mt={4}>
          {sectionContent.subsections.infrastructureAndCloud.label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textIndent: "-8px", paddingLeft: "8px" }}
        >
          <Box component="span" fontStyle="italic" fontWeight="500" mr={2}>
            {sectionContent.subsections.infrastructureAndCloud.aws.label}:
          </Box>
          {sectionContent.subsections.infrastructureAndCloud.aws.values.join(
            ", ",
          )}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textIndent: "-8px", paddingLeft: "8px" }}
        >
          <Box component="span" fontStyle="italic" fontWeight="500" mr={2}>
            {
              sectionContent.subsections.infrastructureAndCloud.googleCloud
                .label
            }
            :
          </Box>
          {sectionContent.subsections.infrastructureAndCloud.googleCloud.values.join(
            ", ",
          )}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textIndent: "-8px", paddingLeft: "8px" }}
        >
          <Box component="span" fontStyle="italic" fontWeight="500" mr={2}>
            {sectionContent.subsections.infrastructureAndCloud.general.label}:
          </Box>
          {sectionContent.subsections.infrastructureAndCloud.general.values.join(
            ", ",
          )}
        </Typography>
      </Box>

      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.testing.label}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.testing.values.join(", ")}
      </Typography>
    </Box>
  )
}

const ResumeProductSkillHighlightsDisplay = ({
  sectionContent,
}: {
  sectionContent: ProductSkillHighlights
}) => {
  return (
    <Box>
      <Typography variant="h6">
        {sectionContent.subsections.coreProductManagement.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.coreProductManagement.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.researchPlanningAndReporting.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.researchPlanningAndReporting.values.join(
          ", ",
        )}
      </Typography>
      <Typography variant="h6" mt={4}>
        {
          sectionContent.subsections.technicalDocumentationAndUserDocumentation
            .sectionLabel
        }
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.technicalDocumentationAndUserDocumentation.values.join(
          ", ",
        )}
      </Typography>
      <Typography variant="h6" mt={4}>
        {
          sectionContent.subsections.productivityAndCollaborativeTools
            .sectionLabel
        }
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.productivityAndCollaborativeTools.values.join(
          ", ",
        )}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.databasesAndData.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.databasesAndData.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.designAndUserExperience.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.designAndUserExperience.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.technicalProductExpertise.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.technicalProductExpertise.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.testingAndQualityAssurance.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.testingAndQualityAssurance.values.join(
          ", ",
        )}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.infrastructureAndCloud.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.infrastructureAndCloud.values.join(", ")}
      </Typography>
      <Typography variant="h6" mt={4}>
        {sectionContent.subsections.aiAndMachineLearning.sectionLabel}
      </Typography>
      <Typography variant="body2">
        {sectionContent.subsections.aiAndMachineLearning.values.join(", ")}
      </Typography>
    </Box>
  )
}

const ResumeExecutiveSummarySection = ({
  sectionContent,
}: {
  sectionContent: ExecutiveSummary
}) => {
  return <Typography>{sectionContent.value}</Typography>
}

const ResumeWorkExperienceSection = ({
  sectionContent,
}: {
  sectionContent: WorkExperience
}) => {
  const theme = useTheme()
  const useMultipleLinesForLocationAndDates = useMediaQuery(
    theme.breakpoints.down("tablet"),
  )

  return (
    <>
      {sectionContent.values.map((workItem) => (
        <Box key={workItem.company} mb={8}>
          <Typography variant="h6">
            {workItem.company} - {workItem.title}
          </Typography>
          {useMultipleLinesForLocationAndDates}
          <Box
            display="flex"
            flexDirection={
              useMultipleLinesForLocationAndDates ? "column-reverse" : "row"
            }
          >
            <Typography variant="body2" color="textSecondary">
              {workItem.location}
            </Typography>
            {!useMultipleLinesForLocationAndDates && (
              <Typography variant="body2" mx={2} color="textSecondary">
                |
              </Typography>
            )}

            <Typography variant="body2" color="textSecondary">
              {workItem.startDate &&
                `${new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric", timeZone: "utc" }).format(new Date(workItem.startDate))}`}{" "}
              to&nbsp;
              {workItem.endDate
                ? `${new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric", timeZone: "utc" }).format(new Date(workItem.endDate))}`
                : "Present"}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph mb={2}>
            {workItem.summary}
          </Typography>
          <ResumeList>
            {workItem.description.map((descItem) => (
              <ListItem
                key={descItem.label}
                sx={{
                  pl: descItem.nestLevel === 1 ? 8 : 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <ListItemIcon
                  sx={{ alignSelf: "flex-start", mt: 0.5, minWidth: 0, pr: 2 }}
                >
                  {descItem.nestLevel === 1 ? (
                    <AddIcon sx={{ fontSize: "14px", mt: 1 }} />
                  ) : (
                    <CircleIcon sx={{ fontSize: "8px", mt: 2 }} />
                  )}
                </ListItemIcon>
                <Typography variant="body2">
                  <strong>{descItem.label}:</strong> {descItem.text}
                </Typography>
              </ListItem>
            ))}
          </ResumeList>
        </Box>
      ))}
    </>
  )
}

const ResumeEducationSection = ({
  sectionContent,
}: {
  sectionContent: Education
}) => {
  return (
    <Box>
      <Typography variant="h6">{sectionContent.school}</Typography>
      <Typography variant="body1" mr={2}>
        {sectionContent.degree}
      </Typography>
      <Box display="flex">
        <Typography variant="body2" color="textSecondary" mr={2}>
          {sectionContent.location}
        </Typography>

        <Typography variant="body2" color="textSecondary">
          {sectionContent.startYear} - {sectionContent.endYear}
        </Typography>
      </Box>
    </Box>
  )
}

const ResumeAdditionalTechnicalSkillsAndKnowledgeSection = ({
  sectionContent,
}: {
  sectionContent: AdditionalTechnicalSkillsAndKnowledge
}) => {
  return (
    <>
      {Object.entries(sectionContent.subsections).map(([subKey, subValue]) => (
        <Box key={subKey} mb={4}>
          <Typography variant="h6">{subValue.label}</Typography>
          <Typography variant="body2">{subValue.values.join(", ")}</Typography>
        </Box>
      ))}
    </>
  )
}
const ResumeHeader = ({
  variant,
  content,
}: {
  variant: "development" | "product"
  content: ResumeDictionaryHeaderContent
}) => {
  return (
    <Box>
      <TypographyResponsive variant="h1" textAlign={"center"}>
        {variant === "product"
          ? content.productPageTitle
          : content.devPageTitle}
      </TypographyResponsive>
      <Typography variant="body2" color="textSecondary" textAlign={"center"}>
        {content.location}
      </Typography>
      <SectionSpacer size="small" />
      <Box display="flex" justifyContent="center" my={3}>
        <MattProfilePicture boxShadow={1} size="100px" />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box flexBasis="300px" display="flex">
          <CalendlyCTAButton eventName="contact-calendly-click-resume"></CalendlyCTAButton>
        </Box>
      </Box>
      {/* Perhaps should be its own section but I think its fine */}
      <SectionSpacer size="small" />
      <TypographyResponsive variant="h2" textAlign={"center"}>
        {content.contactAndProfiles}
      </TypographyResponsive>
      <Grid container spacing={0}>
        {/* EMAIL */}
        <Grid
          item
          mobileS={12}
          tablet={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            <EmailIcon sx={{ height: 16 }} />
            <Link href={content.mailto}>{content.email}</Link>
          </Box>
        </Grid>

        {/* LINKED IN */}
        <Grid
          item
          mobileS={12}
          tablet={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LinkedIn sx={{ height: 16 }} />
          <Box display="inline" pl={1}>
            <Link href={content.linkedInUrl}>{content.linkedInLabel}</Link>
          </Box>
        </Grid>

        {/* PHONE NUMBER */}
        <Grid
          item
          mobileS={12}
          tablet={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PhoneIcon sx={{ color: "primary", height: 16 }} />
          <Box display="inline" ml={1}>
            <Link href={`tel:` + content.phoneNumber.replace(/[^\d]/g, "")}>
              {content.phoneNumber}
            </Link>
          </Box>
        </Grid>

        {/* GITHUB */}
        <Grid
          item
          mobileS={12}
          tablet={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <GitHubIcon sx={{ height: 16 }} />
          <Box pl={1}>
            <Link href={content.githubUrl}>{content.githubLabel}</Link>
          </Box>
        </Grid>
      </Grid>
      <SectionSpacer size="xs" />
      <OneTwoThreeLine width="100%" height={3} />
    </Box>
  )
}

const ProductResume: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "es">("en")
  const allContent: { [key: string]: ProductResumeContent } = ProductContent
  const sections = allContent[language].sections
  return (
    <Container>
      <ResumeHeader
        variant="product"
        content={Dictionary.en.headerContent}
      ></ResumeHeader>
      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.executiveSummary.sectionLabel}
      </Typography>

      <ResumeExecutiveSummarySection
        sectionContent={sections.executiveSummary}
      ></ResumeExecutiveSummarySection>

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.productSkillHighlights.sectionLabel}
      </Typography>
      <ResumeProductSkillHighlightsDisplay
        sectionContent={sections.productSkillHighlights}
      />

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.workExperience.sectionLabel}
      </Typography>
      <ResumeWorkExperienceSection
        sectionContent={sections.workExperience}
      ></ResumeWorkExperienceSection>

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.education.sectionLabel}
      </Typography>
      <ResumeEducationSection sectionContent={sections.education} />
    </Container>
  )
}

const DevelopmentResume: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "es">("en")

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "es" : "en"))
  }

  const allContent: { [language: string]: DeveloperResumeContent } =
    DevelopmentContent
  const sections = allContent[language].sections

  return (
    <Container>
      <ResumeHeader
        variant="development"
        content={Dictionary.en.headerContent}
      ></ResumeHeader>
      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.executiveSummary.sectionLabel}
      </Typography>

      <ResumeExecutiveSummarySection
        sectionContent={sections.executiveSummary}
      ></ResumeExecutiveSummarySection>

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.technicalSkillHighlights.sectionLabel}
      </Typography>
      <ResumeTechnicalSkillHighlightsDisplay
        sectionContent={sections.technicalSkillHighlights}
      />

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.workExperience.sectionLabel}
      </Typography>
      <ResumeWorkExperienceSection
        sectionContent={sections.workExperience}
      ></ResumeWorkExperienceSection>

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.education.sectionLabel}
      </Typography>
      <ResumeEducationSection sectionContent={sections.education} />

      <SectionSpacer size="small" />

      <Typography variant="h2" gutterBottom>
        {sections.additionalTechnicalSkillsAndKnowledge.sectionLabel}
      </Typography>
      <ResumeAdditionalTechnicalSkillsAndKnowledgeSection
        sectionContent={sections.additionalTechnicalSkillsAndKnowledge}
      />
    </Container>
  )
}

export const Resume: React.FC = () => {
  const searchParams = useSearchParams()
  // If an no search type or an invalid search type is provided the development resume will display by default
  const searchType: "development" | "product" | any =
    searchParams?.get("type") || "development"

  if (searchType === "product") {
    return <ProductResume />
  }

  return <DevelopmentResume />
}
