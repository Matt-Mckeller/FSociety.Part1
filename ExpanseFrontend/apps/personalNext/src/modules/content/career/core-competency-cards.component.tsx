"use client"
import React from "react"
import { styled, Theme, alpha } from "@mui/material/styles"
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material"

import {
  LighteningCloud,
  SpiralBrowserScreen,
  WebAndMobileAppScreens,
} from "expanse.dynamicAssets"

// TODO: Cleanup asset positioning and switch to mui card?
// This evolved over time, had custom positioning but switched to centered

export type CoreCompetencyCardProps = {
  title: string
  text: string

  ImageComponent: React.ComponentType<any>
}

const ServiceCardMedia = styled(Box)({})
const ServiceCardContent = styled(Box)({})

export function CoreCompetencyCard({
  title,
  text,
  ImageComponent,
}: CoreCompetencyCardProps) {
  const mediaHeight = 140
  return (
    <Box
      height="100%"
      minHeight="100%"
      sx={(theme: Theme) => ({
        borderRadius: "7px",
        boxShadow: theme.shadows[1],
        position: "relative",
        // Apply elevation effect by lightening the background color on the card in dark mode
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
            : null,
      })}
      p={8}
    >
      <ServiceCardMedia>
        <Box display="flex" justifyContent="center">
          <Box
            height={mediaHeight}
            maxHeight={mediaHeight}
            minHeight={mediaHeight}
          >
            <ImageComponent />
          </Box>
        </Box>
      </ServiceCardMedia>
      <ServiceCardContent>
        <Box mb={2} textAlign="center">
          {/* Font size manually set to avoid rem */}
          <Typography variant="cardTitle" component="h1" fontSize="20px">
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="cardBody" component="p" fontSize="16px">
            {text}
          </Typography>
        </Box>
      </ServiceCardContent>
    </Box>
  )
}

export const WebAndMobileAppDevCard = {
  title: "Web App Development",
  text: "We excel in translating business requirements into well-architected and scalable web applications. Our full-stack development skills ensure that every aspect of the application aligns perfectly with your unique needs. With a decade of experience crafting custom software solutions and a toolkit of cutting-edge technologies, we're prepared to deliver world-class applications!",
  ImageComponent: WebAndMobileAppScreens,
  imagePositionTop: "-2rem",
  imagePositionLeft: "-2.2rem",
}

export const IntegrationsAndApiDevelopmentCard = {
  title: "Integrations and APIs",
  text: "With a deep understanding of complex systems, we specialize in crafting robust API integrations. We design and implement seamless integrations, breaking down silos and connecting disparate data sources to optimize workflows and drive operational efficiency.",
  ImageComponent: LighteningCloud,
  imagePositionTop: "-3rem",
  imagePositionLeft: "0",
}

export const TechnologyMigrationServicesCard = {
  title: "Technology Migration",
  text: "Expertly guiding technology migrations for efficiency, innovation, and scalable growth. Assessing systems, designing architectures with precision.",
  ImageComponent: SpiralBrowserScreen,
  imagePositionTop: "-2rem",
  imagePositionLeft: "4.3rem",
}
export const WebDevelopmentServicesCard = {
  title: "Web Development",
  text: "With a passion for crafting visually stunning, user-friendly, and responsive digital experiences, we transform your vision into reality. With accessibility in mind and an understanding of UI/UX design principles, we deliver innovative solutions that drive user engagement and business growth.",
  ImageComponent: SpiralBrowserScreen,
  imagePositionTop: "-2rem",
  imagePositionLeft: "4.3rem",
}

export function CoreCompetencyCards() {
  const theme = useTheme()
  // const useRowLayout = useMediaQuery(theme.breakpoints.up("laptop"))
  const showRowLayout = useMediaQuery("(min-width: 1105px)")

  return (
    <Box
      display="flex"
      flexDirection={showRowLayout ? "row" : "column"}
      gap={8}
    >
      <Box flexBasis={showRowLayout ? `${100 / 3}%` : "100%"}>
        <CoreCompetencyCard {...WebAndMobileAppDevCard} />
      </Box>
      <Box flexBasis={showRowLayout ? `${100 / 3}%` : "100%"}>
        <CoreCompetencyCard {...IntegrationsAndApiDevelopmentCard} />
      </Box>
      <Box flexBasis={showRowLayout ? `${100 / 3}%` : "100%"}>
        <CoreCompetencyCard {...WebDevelopmentServicesCard} />
      </Box>
    </Box>
  )
}
