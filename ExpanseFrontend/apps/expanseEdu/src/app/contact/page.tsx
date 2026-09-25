import { Metadata } from "next"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ContactProvider, ContactForm } from "expanse.ui/contact"
import { CONTACT_ROUTE } from "../../config"
import { Dictionary } from "../../config"

export const metadata: Metadata = {
  title: "Contact Matthew Mckeller",
}
export default function ContactPage() {
  return (
    <ContactProvider contactPageRoute={CONTACT_ROUTE}>
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
            {Dictionary.en.contact.pageTitle}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="stretch"
          flexGrow={1}
          maxWidth="510px"
          width="100%"
        >
          <ContactForm></ContactForm>
        </Box>
      </Box>
    </ContactProvider>
  )
}
