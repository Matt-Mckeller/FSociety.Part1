"use client"
import { useContext } from "react"
import { WalletContext } from "../../context"
import { Box, Typography, useTheme, Grid, Tooltip } from "@mui/material"
import { CoinIcon } from "../../../theme"

export const WalletBanner = () => {
  const { coins } = useContext(WalletContext)
  const coinIndexes = Object.keys(coins).sort((a, b) => {
    if (a.toLowerCase() === "xcoins") return -1
    if (b.toLowerCase() === "xcoins") return 1
    if (a.toLowerCase() === "familycoins") return -1
    if (b.toLowerCase() === "familycoins") return 1
    return a.localeCompare(b)
  })
  const theme = useTheme()
  return (
    <Box width="100%">
      <Typography>Your coins</Typography>
      <Grid container spacing={2}>
        {coinIndexes.map((coinIndex) => {
          if (coins[coinIndex]) {
            return (
              <Grid item key={coinIndex} zero={12} tablet={6}>
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  py={1}
                >
                  <Box width="30px" height="30px">
                    {coinIndex.toLowerCase() === "xcoins" ? (
                      <CoinIcon color={theme.palette.background.contrastBG} />
                    ) : coinIndex.toLowerCase() === "familycoins" ? (
                      <CoinIcon
                        color={theme.palette.background.contrastBG}
                        coinText="FM"
                      />
                    ) : (
                      <CoinIcon
                        color={theme.palette.background.contrastBG}
                        coinText={coins[coinIndex].coinIconText}
                        coinTextColor={theme.palette.background.default}
                      />
                    )}
                  </Box>
                  <Typography
                    pl={2}
                    noWrap
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    <Tooltip
                      title={`(${coins[coinIndex].quantity}) ${coins[coinIndex].name}`}
                    >
                      <span>
                        ({coins[coinIndex].quantity}) {coins[coinIndex].name}
                      </span>
                    </Tooltip>
                  </Typography>
                </Box>
              </Grid>
            )
          }
          return null
        })}
      </Grid>
    </Box>
  )
}
