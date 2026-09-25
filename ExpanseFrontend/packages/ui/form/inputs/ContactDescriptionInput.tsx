import React from "react"

import { InputAdornment, Box, TextField, Theme, useTheme } from "@mui/material"
import Person2Icon from "@mui/icons-material/Person2"

export function ContactDescriptionInput({
  onChange,
  value,
  error,
  helperText,
}: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  const theme = useTheme()
  const fieldIcon = (
    <Person2Icon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  )

  return (
    <TextField
      id="contact-description-input"
      label="Details"
      size="small"
      aria-describedby="Tell us more!"
      placeholder="Tell us more!"
      required
      multiline
      rows={3}
      fullWidth
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      autoComplete="given-name"
      variant="outlined"
      error={error}
      helperText={helperText}
      // InputProps={{
      //   // eslint-disable-next-line react/no-children-prop
      //   startAdornment: (
      //     <InputAdornment
      //       children={
      //         <Box height="18px" width="18px">
      //           {fieldIcon}
      //         </Box>
      //       }
      //       position="start"
      //     />
      //   ),
      // }}
      value={value}
      onChange={handleChange}
    />
  )
}
