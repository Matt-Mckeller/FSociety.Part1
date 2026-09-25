/**
 * SearchInput - Standardized search text field
 *
 * Provides consistent search UI across all views.
 */
import { TextField, InputAdornment, type TextFieldProps } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import IconButton from "@mui/material/IconButton"
import { INPUT_WIDTH } from "./ui-constants"

export interface SearchInputProps
  extends Omit<TextFieldProps, "InputProps" | "size"> {
  /** Current search value */
  value: string
  /** Handler for value changes */
  onValueChange: (value: string) => void
  /** Placeholder text (default: "Search...") */
  placeholder?: string
  /** Width preset or custom number */
  width?: "sm" | "md" | "lg" | number
  /** Show clear button when value exists */
  showClear?: boolean
}

export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search...",
  width = "md",
  showClear = true,
  sx,
  ...props
}: SearchInputProps) {
  const minWidth = typeof width === "number" ? width : INPUT_WIDTH[width]

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      sx={{ minWidth, ...sx }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" sx={{ color: "text.secondary" }} />
          </InputAdornment>
        ),
        endAdornment:
          showClear && value ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => onValueChange("")}
                edge="end"
                aria-label="clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      {...props}
    />
  )
}
