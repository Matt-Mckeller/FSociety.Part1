"use client"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import { ContactCTAButton } from "expanse.ui/contact"
import { ContactUsCharacter } from "expanse.dynamicAssets/graphics/ContactUsCharacter.component"

export const Contact = () => {
  const t = useTranslations("home.contact")
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box width="200px">
        <ContactUsCharacter />
      </Box>
      <Typography variant="h2">{t("title")}</Typography>
      <ContactCTAButton textVariant="touch" eventName={"contact-edu-click"} />
    </Box>
  )
}
