import React from "react";

import { InputAdornment, Box, TextField, useTheme } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";

export function FirstNameInput({ onChange, value, error, helperText }: any) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  const theme = useTheme();
  const fieldIcon = (
    <Person2Icon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  );

  return (
    <TextField
      id="first-name-input"
      label="First name"
      size="small"
      aria-describedby="First name input"
      placeholder="John"
      autoFocus
      required
      fullWidth
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      autoComplete="given-name"
      variant="outlined"
      error={error}
      helperText={helperText}
      InputProps={{
        // eslint-disable-next-line react/no-children-prop
        startAdornment: (
          <InputAdornment
            children={
              <Box height="1rem" width="1rem" marginTop="-0.3rem">
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
