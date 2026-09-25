"use client"
import { Box, Typography } from "@mui/material"
import { HomeContent } from "./HomeContent"
import { ContactCTAButton } from "expanse.ui/contact"
import { ContactUsCharacter } from "expanse.dynamicAssets/graphics/ContactUsCharacter.component"

export const Contact = () => {
  const content = HomeContent.en.contact
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box width="200px">
        <ContactUsCharacter />
      </Box>
      <Typography variant="h2">{content.title}</Typography>
      <ContactCTAButton textVariant="touch" eventName={"contact-edu-click"} />
    </Box>
  )
}
