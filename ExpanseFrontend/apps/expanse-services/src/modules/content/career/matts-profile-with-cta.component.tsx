import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import { CalendlyCTAButton, ContactCTAButton } from "expanse.ui/contact"
import { MattsProfile } from "./matts-profile.component"

export const MattsProfileWithCta = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
    >
      <MattsProfile displayTitle={false} />
      {/* <Typography variant="body1" fontWeight="600" component="h1" mb={4}>
        Application Development Expert
      </Typography> */}

      <Box display="flex" flexDirection="row" justifyContent="center">
        <Box display="flex" flexDirection="column">
          <Box mb={1}>
            <CalendlyCTAButton eventName="contact-calendly-click" />
          </Box>
          <ContactCTAButton eventName="contact-cta-click" />
        </Box>
      </Box>
    </Box>
  )
}
