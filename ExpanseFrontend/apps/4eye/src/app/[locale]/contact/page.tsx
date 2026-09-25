import { getTranslations } from "next-intl/server"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ContactProvider, ContactForm } from "expanse.ui/contact"
import { CONTACT_ROUTE } from "../../../config"

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })

  return {
    title: t("pageTitle"),
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })

  return (
    <ContactProvider contactPageRoute={`/${locale}${CONTACT_ROUTE}`}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        flexGrow={1}
        width="100%"
      >
        <Box id="page-header" textAlign="center" mb={6}>
          <Typography variant="h2" component="h2">
            {t("pageTitle")}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="stretch"
          flexGrow={1}
          maxWidth="510px"
          width="100%"
        >
          <ContactForm />
        </Box>
      </Box>
    </ContactProvider>
  )
}
