import React, { useEffect } from "react"

import {
  InputAdornment,
  Box,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material"
import {
  validateExpansePassword,
  PASSWORD_ERROR_TYPES,
} from "expanse.common/validations"
import { CheckCircle, Info } from "@mui/icons-material"
import HttpsIcon from "@mui/icons-material/Https"

function PasswordErrorDisplay({ value }: { value: string }) {
  const { errorMessages, errorTypes } = validateExpansePassword(value)
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {Object.values(PASSWORD_ERROR_TYPES as any)
        .reverse()
        .map(({ key, regex, message }, index) => (
          <Box
            key={`password-requirement-display-${key}`}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {!errorTypes.includes(key) ? (
              <CheckCircle
                sx={{
                  color: "common.black",
                  width: "14px",
                  height: "14px",
                  mr: 1,
                }}
              />
            ) : (
              <Info
                sx={{
                  color: "action.disabled",
                  width: "14px",
                  height: "14px",
                  mr: 1,
                }}
              />
            )}
            <Typography variant="body1" sx={{ fontSize: "12px" }}>
              {message}
            </Typography>
          </Box>
        ))}
    </Box>
  )
}

interface Props {
  onChange: (v: any) => void
  value: string
  error: boolean
  helperText?: string | null
  displayRequirements: boolean
  autoComplete?: "current-password" | "new-password"
}
export function PasswordInput({
  onChange,
  value,
  error,
  helperText,
  displayRequirements = false,
  autoComplete,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }
  const theme = useTheme()
  const fieldIcon = (
    <HttpsIcon
      sx={{ color: theme.palette.text.primary, height: "100%", width: "100%" }}
    />
  )

  const [passwordInputFieldActive, setPasswordInputFieldActive] =
    React.useState(false)

  const onFocus = () => {
    setPasswordInputFieldActive(true)
  }

  const onBlur = () => {
    // No longer doing anything
  }

  return (
    <Box>
      <TextField
        id="password-input"
        label="Password"
        size="small"
        type="password"
        aria-describedby="Password input"
        placeholder="************"
        required
        fullWidth
        variant="outlined"
        color={theme.palette.mode === "dark" ? "info" : "primary"}
        autoComplete=""
        error={error}
        onFocus={onFocus}
        onBlur={onBlur}
        helperText={!displayRequirements ? helperText : false}
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
      {/* display only if the password-input field is active */}
      {
        // simplify
        ((displayRequirements && passwordInputFieldActive) ||
          (displayRequirements && error)) && (
          <Box mt={1}>
            <PasswordErrorDisplay value={value} />
          </Box>
        )
      }
    </Box>
  )
}
