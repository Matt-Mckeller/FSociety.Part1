import { Box, Typography } from "@mui/material"
import { DesignCollaborationAnimation } from "expanse.dynamicAssets/lotties/DesignCollaboration/DesignCollaborationAnimation"
import { ContactCTAEduButton } from "expanse.ui/contact"

export const UnderConstruction = () => {
  return (
    <Box display="flex" flexDirection={"column"} alignItems={"center"}>
      <DesignCollaborationAnimation width={300} maxWidth={300} />
      <Box>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{
            fontSize: { zero: "1.2rem", tablet: "1.5rem" },
            // fontSize: { zero: "1rem", mobileS: "1.5rem", tablet: "2.5rem" },
          }}
        >
          Website Under Construction!
        </Typography>
        <Typography textAlign="center">
          Interested in learning more? Contact us by clicking the button below.
        </Typography>
      </Box>
      <ContactCTAEduButton eventName={"contact-edu-click"} />
    </Box>
  )
}
