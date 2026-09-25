import React from "react";

import { InputAdornment, Box, TextField, Theme, useTheme } from "@mui/material";
import MailLockIcon from "@mui/icons-material/MailLock";

export function PasscodeInput({
  onChange,
  value,
  error,
  helperText,
  allowOnlyNumbers = true,
}: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event && allowOnlyNumbers) {
      const newValue = event.target.value;
      onChange(newValue.replace(/[^\d]/g, ""));
    } else {
      onChange(event.target.value);
    }
  };
  // const fieldIcon = <Profile />

  const theme = useTheme();
  const fieldIcon = (
    <MailLockIcon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  );

  return (
    <TextField
      id="passcode-input"
      label="Passcode"
      size="small"
      aria-describedby="Passcode input"
      placeholder="Enter Code"
      autoFocus
      required
      fullWidth
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      autoComplete="off"
      variant="outlined"
      error={error}
      helperText={helperText}
      InputProps={{
        // eslint-disable-next-line react/no-children-prop
        startAdornment: (
          <InputAdornment
            children={
              <Box height="18px" width="18px">
                {fieldIcon}
              </Box>
            }
            position="start"
          />
        ),
      }}
      value={value}
      onChange={handleChange}
    />
  );
}
