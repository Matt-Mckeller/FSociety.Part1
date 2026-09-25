"use client"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { locales, localeNames, type Locale } from "../../i18n/config"
import { MenuItem, Select, FormControl, Box, Typography } from "@mui/material"
import LanguageIcon from "@mui/icons-material/Language"

interface LanguageSwitcherProps {
  /**
   * Display variant
   * - "select": Dropdown select (default)
   * - "buttons": Row of buttons
   */
  variant?: "select" | "buttons"
}

/**
 * Language Switcher Component
 *
 * Allows users to switch between available locales.
 * Updates the URL to reflect the new locale.
 */
export function LanguageSwitcher({ variant = "select" }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: string) => {
    // Replace the current locale in the path with the new one
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")

    router.push(newPath)
  }

  if (variant === "buttons") {
    return (
      <Box display="flex" gap={1} alignItems="center">
        <LanguageIcon fontSize="small" sx={{ opacity: 0.7 }} />
        {locales.map((l) => (
          <Typography
            key={l}
            component="button"
            onClick={() => handleLocaleChange(l)}
            sx={{
              cursor: "pointer",
              border: "none",
              background: "none",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: l === locale ? "bold" : "normal",
              textDecoration: l === locale ? "underline" : "none",
              opacity: l === locale ? 1 : 0.7,
              "&:hover": {
                opacity: 1,
                backgroundColor: "action.hover",
              },
            }}
          >
            {localeNames[l]}
          </Typography>
        ))}
      </Box>
    )
  }

  return (
    <FormControl size="small">
      <Select
        value={locale}
        onChange={(e) => handleLocaleChange(e.target.value)}
        displayEmpty
        sx={{
          minWidth: 100,
          "& .MuiSelect-select": {
            display: "flex",
            alignItems: "center",
            gap: 1,
          },
        }}
        startAdornment={<LanguageIcon fontSize="small" sx={{ mr: 1 }} />}
      >
        {locales.map((l) => (
          <MenuItem key={l} value={l}>
            {localeNames[l]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default LanguageSwitcher
