"use client"

import { Box, Tooltip, Typography, useTheme } from "@mui/material"
import { ExpandingBar } from "../../display/ExpandingBar"
import { CoinIcon } from "../../display/icons/CoinIcon"
import { GemIcon } from "../../display/icons/GemIcon"
import { useContext } from "react"
import { WalletContext } from "expanse.ui/game"

export const CurrencyStatusBar = () => {
  const theme = useTheme()
  const { coins, gems } = useContext(WalletContext)

  return (
    <ExpandingBar aspectRatio={4}>
      <Tooltip title="Points">
        <Box
          display="flex"
          justifyContent="end"
          height="100%"
          alignItems="center"
        >
          <Box display="flex" alignItems="center" height="100%" mr={2}>
            <Typography
              mr={1}
              textAlign="right"
              color={theme.palette.primary.contrastText}
            >
              {coins?.xcoins?.quantity || 0}
            </Typography>
            <Box
              width="25px"
              height="60%"
              display="flex"
              justifyContent="center"
            >
              <CoinIcon color={theme.palette.common.white}></CoinIcon>
            </Box>
          </Box>

          <Box display="flex" height="100%" alignItems="center" mr={2}>
            <Typography
              mr={1}
              textAlign="right"
              color={theme.palette.primary.contrastText}
            >
              {gems?.xgems || 0}
            </Typography>
            <Box
              width="25px"
              height="60%"
              display="flex"
              justifyContent="center"
            >
              <GemIcon variant="contrastBG"></GemIcon>
            </Box>
          </Box>
        </Box>
      </Tooltip>
    </ExpandingBar>
  )
}
