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
          sx={{
            display: "flex",
            justifyContent: "end",
            height: "100%",
            alignItems: "center"
          }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              mr: 2
            }}>
            <Typography
              color={theme.palette.primary.contrastText}
              sx={{
                mr: 1,
                textAlign: "right"
              }}>
              {coins?.xcoins?.quantity || 0}
            </Typography>
            <Box
              sx={{
                width: "25px",
                height: "60%",
                display: "flex",
                justifyContent: "center"
              }}>
              <CoinIcon color={theme.palette.common.white}></CoinIcon>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              mr: 2
            }}>
            <Typography
              color={theme.palette.primary.contrastText}
              sx={{
                mr: 1,
                textAlign: "right"
              }}>
              {gems?.xgems || 0}
            </Typography>
            <Box
              sx={{
                width: "25px",
                height: "60%",
                display: "flex",
                justifyContent: "center"
              }}>
              <GemIcon variant="contrastBG"></GemIcon>
            </Box>
          </Box>
        </Box>
      </Tooltip>
    </ExpandingBar>
  );
}
