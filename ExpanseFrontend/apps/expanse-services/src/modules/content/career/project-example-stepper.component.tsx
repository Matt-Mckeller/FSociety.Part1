"use client"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Button, MobileStepper, Typography, useMediaQuery } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import React from "react"
import HouseSidingIcon from "@mui/icons-material/HouseSiding"
import SchoolIcon from "@mui/icons-material/School"
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt"
import SchemaIcon from "@mui/icons-material/Schema"
import ApartmentIcon from "@mui/icons-material/Apartment"

const steps = [
  {
    title: "Clever EDU: Google Classroom Rostering",
    description:
      "Proudly partnered with Clever, a leading education technology company, to streamline Google Classroom rostering for more than 60% of school districts nationwide. This high-priority, time-sensitive project involved the development of a custom multi-step web application form process that simplified and expedited the rostering process for educators.",
    companyName: "Clever",
    companyLabel: "Education Technology",
    companyIcon: SchoolIcon,
  },
  {
    title: "Identity Theft Analytics Platform",
    description:
      "Developed a high-priority fraud analytics platform for U.S. Government Agencies helping to detect identity theft through custom built dashboards, reporting, and data visualizations. Worked with 12 seasoned professionals, each an ace in their respective roles. Our collaborative team of designers, developers, quality assurance experts, architects, product managers, and data scientists worked in an agile scrum environment.",
    companyName: "LexisNexis Risk Solutions",
    companyLabel: "Fraud Analytics",
    companyIcon: SchemaIcon,
  },
  {
    title: "Application Modernization & Data Integration",
    description:
      "Modernized an application by rebuilding a legacy system which integrated data from multiple sources including POS systems, internal web services, and general ledger accounting into a modern web application with Web Components, React, and GraphQL. Introduced Agile Project management and rebuilt end-of-life applications from the ground up.",
    companyName: "MDU Resources Group",
    companyLabel: "A leading Energy and Construction Services provider",
    companyIcon: HouseSidingIcon,
  },
  {
    title: "Powering up Onboarding Processes",
    description:
      "Developed a custom onboarding process specifically tailored for Texas customers following NRG’s acquisition of Direct Energy. The solution involved creating a user-friendly frontend enrollment UI process that incorporated post-pay enrollment functionality. This streamlined the onboarding process for new customers, making it easier to sign up for energy services.",
    companyName: "NRG Energy",
    companyLabel: "Electric Utilities Industry",
    companyIcon: ElectricBoltIcon,
  },
  {
    title: "ELeasing: Electronic Document Signatures and Inventory Management",
    description:
      "Led the design and implementation of a customized electronic signature process. Orchestrated the end-to-end workflow for creating, securely signing, and storing the company's leases and addendums, implementing automated inventory management based on data input during document creation and signing.",
    // "Led the design and implementation of a customized electronic signature process, seamlessly integrating input fields onto dynamically generated PDF documents crafted from form input. Orchestrated the end-to-end workflow for creating, securely signing, and storing the company's leases and addendums, implementing automated inventory management based on data input during document creation and signing.",
    companyName: "REM",
    companyLabel: "Student Housing",
    companyIcon: ApartmentIcon,
  },
  {
    title: "Appointment Scheduling & Lead Tracking",
    description:
      "Developed custom CRM systems for customer tracking and communication, incorporating real-time functionality to enable simultaneous work on dashboards. Designed and implemented custom lead tracking rules and heat index logic to determine optimal contact times, in collaboration with stakeholders.",
    companyName: "REM",
    companyLabel: "Student Housing",
    companyIcon: ApartmentIcon,
  },
  {
    title: "Priority Queue Ticketing for Parking Spots",
    description:
      "Developed a system to manage sign-ups for limited parking spots, prioritizing based on document completion date. Invitations were sent out in batches at specific times through cron jobs, allowing hundreds of students to sign up simultaneously. Implemented a mutex key locking mechanism to ensure no duplicate reservations.",
    companyName: "REM",
    companyLabel: "Student Housing",
    companyIcon: ApartmentIcon,
  },
]

export function ProjectExampleStepper() {
  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = steps.length
  const mobileSmall = useMediaQuery(theme.breakpoints.down("mobileL"))
  const mobile = useMediaQuery(theme.breakpoints.down("tablet"))
  const tablet = useMediaQuery(theme.breakpoints.up("tablet"))
  const laptop = useMediaQuery(theme.breakpoints.up("laptop"))
  const textAlign = mobile ? "left" : "center"

  const height = laptop
    ? 300
    : tablet && !laptop
      ? 350
      : mobile && !mobileSmall
        ? 450
        : mobileSmall
          ? 550
          : 550

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const CompanyIcon = steps[activeStep].companyIcon
  return (
    <Box
      sx={{
        width: "100%",
        background:
          theme.palette.mode === "light"
            ? theme.palette.background.light
            : null,
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
            : null,
        height,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        borderRadius: "21px",
        pt: 4,
        pl: 4,
        pr: 4,
      }}
    >
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Box
          textAlign={textAlign}
          flexBasis="30%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          pb={2}
        >
          <Typography variant="h3">{steps[activeStep].title}</Typography>
        </Box>
        <Box
          pb={2}
          textAlign={textAlign}
          flexBasis="40%"
          display="flex"
          alignItems="center"
        >
          <Typography variant="body1">
            {steps[activeStep].description}
          </Typography>
        </Box>
        <Box
          textAlign={textAlign}
          flexBasis="30%"
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            textAlign="left"
            sx={{ marginLeft: mobile ? 0 : "20px" }}
            px={8}
          >
            <Box position="relative">
              <Box
                sx={{
                  position: "absolute",
                  left: "-25px",
                  top: "2px",
                  height: "20px",
                  width: "20px",
                }}
              >
                <CompanyIcon sx={{ height: "20px", width: "20px" }} />
              </Box>
              <Typography variant="body1" fontStyle="italic">
                {steps[activeStep].companyName}
              </Typography>
              <Typography variant="body1" fontStyle="italic">
                {steps[activeStep].companyLabel}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <MobileStepper
        // variant="text"
        sx={{
          background:
            theme.palette.mode === "light"
              ? theme.palette.background.light
              : null,
          backgroundImage:
            theme.palette.mode === "dark"
              ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
              : null,
          borderBottomRightRadius: 21,
          borderBottomLeftRadius: 21,
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  )
}
