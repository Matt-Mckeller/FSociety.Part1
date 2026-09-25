"use client"
import { Box, Link, styled, Typography, useTheme } from "@mui/material"
import { LinkedIn } from "@mui/icons-material"
import { STATIC_ASSETS } from "expanse.staticAssets"
import React from "react"

export function MattProfilePicture({
  boxShadow = false,
  size = "100px",
  useCustomSrc,
}: {
  boxShadow?: false | number
  size: string
  useCustomSrc?: string
}) {
  const src = useCustomSrc || STATIC_ASSETS.images.profileSubtleLines
  return (
    <Box
      component="img"
      src={src}
      sx={{
        width: size,
        minWidth: size,
        maxWidth: size,
        height: size,
        minHeight: size,
        maxHeight: size,
        boxShadow: boxShadow !== false ? boxShadow : null,
        borderRadius: "6%",
        filter: "grayscale(.75)",
      }}
    />
  )
}

interface Props {
  displayedTitle?: string
  displayTitle?: boolean
  [key: string]: any
}
export function MattsProfile({
  displayedTitle = "Software Development Consultant",
  displayTitle = true,
  ...props
}: Props) {
  const theme = useTheme()
  const display5050overlay = false
  const isDarkMode = theme.palette.mode === "dark"
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      {...props}
    >
      <Box mb={2} position="relative" display="flex">
        {/* 50% overlay colored box over profile photo */}
        {display5050overlay && (
          <Box
            height="100px"
            width="54.3px" // 54.3 because of the specific photo, rather than recropping the photo I just adjusted here
            sx={{
              backgroundColor: theme.palette.primary.main,
              opacity: isDarkMode ? "20%" : "11%",
            }}
            position="absolute"
            right="0"
            zIndex={1}
          ></Box>
        )}

        <MattProfilePicture boxShadow={1} size="100px" />
      </Box>
      <Box
        pl={1}
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box textAlign="center">
          <Box display="flex" justifyContent="center">
            <Typography variant="body1" fontWeight="bold">
              Matthew McKeller
            </Typography>
            <Link
              href="https://www.linkedin.com/in/mattmckeller"
              target="_blank"
              rel="noreferrer"
              color="text.primary"
            >
              <LinkedIn fontSize="small" />
            </Link>
          </Box>
          {displayTitle === true && (
            <Typography variant="body1" fontWeight="bold">
              {displayedTitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
