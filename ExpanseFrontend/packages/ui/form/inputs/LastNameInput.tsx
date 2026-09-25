import React from "react";

import { InputAdornment, Box, TextField, useTheme } from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";

export function LastNameInput({ onChange, value, error, helperText }: any) {
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
      id="last-name-input"
      label="Last name"
      type="text"
      aria-describedby="Last name input"
      size="small"
      placeholder="Smith"
      required
      fullWidth
      color={theme.palette.mode === "dark" ? "info" : "primary"}
      variant="outlined"
      autoComplete="family-name"
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
