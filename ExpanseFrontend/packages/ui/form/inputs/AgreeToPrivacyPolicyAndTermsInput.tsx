import React, { useContext } from "react"

import { Box, Typography, Checkbox, Link } from "@mui/material"
import { RoutesContext } from "expanse.ui/application"

export function AgreeToPrivacyPolicyAndTermsInput({
  onChange,
  value,
  error,
  helperText,
}: any) {
  const {
    routes: { privacyPolicy, terms },
  } = useContext(RoutesContext)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(!value)
  }

  return (
    <Box>
      <Box display="flex">
        <Box
          width="19.5px"
          marginRight="7px"
          position="relative"
          display="flex"
          alignContent="center"
        >
          {/* Actual svg width: 17.5px */}
          {/* Moved left 2px to align with above input fields */}
          {/* Desired padding level 3 = 12px */}
          {/* Box width of 19.5px = text on right side is 2 px away */}
          {/* Input fields above are spaced 12px apart so, so 9px distance
          should work for spacing on the checkbox to the text next to it */}
          {/* So add another 7px margin right side */}
          <Checkbox
            id="agree-to-privacy-policy-checkbox"
            onChange={handleChange}
            checked={value}
            size="small"
            sx={{
              position: "relative",
              left: "-2px",
              color: "text.primary",
              padding: 0,
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.23 }}
            color="textPrimary"
          >
            I agree to the{" "}
            <Link target="_blank" href={privacyPolicy} underline="always">
              Privacy Policy
            </Link>
            {" and "}
            <Link target="_blank" href={terms} underline="always">
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Box>
      {error && (
        <Box>
          <Typography fontSize="0.75rem" color="error.main">
            {helperText}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
