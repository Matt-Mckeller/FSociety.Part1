"use client"
import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ExpanseLogo } from "expanse.dynamicAssets"
import React from "react"
import { ScreenshotWrapper } from "../components/ScreenShotWrapper"
import { ExpandingBorderBox } from "../../../../../../packages/ui/theme/components/ExpandingBorderBox.component"

export function BusinessCardBackV2() {
  const containerWidth = 3500 / 4
  const containerHeight = 2000 / 4
  const largestBorderSize = 9
  const extraPaddingForContainer = largestBorderSize

  return (
    <ScreenshotWrapper
      screenshotHeight={containerHeight}
      screenshotWidth={containerWidth}
      fileExtension="jpg"
      assetName="BusinessCardBackV2"
    >
      <Box
        id="extra-padding-container"
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "100%",
          minHeight: "100%",
          p: extraPaddingForContainer + "px",
        }}
      >
        <ExpandingBorderBox largestBorderSize={largestBorderSize}>
          <Box height="100%" width="100%">
            <Box display="flex" flexDirection="column" height="100%">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                flexBasis="60%"
                // width="100%"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  height={containerHeight / 4}
                  mt={8}
                  mb={8}
                >
                  <ExpanseLogo></ExpanseLogo>
                </Box>
                <Box
                  textAlign="center"
                  display="flex"
                  justifyContent="center"
                  mb={4}
                  flexGrow={1}
                >
                  <Typography variant="h2" fontWeight="bold">
                    Expanse Services
                  </Typography>
                </Box>
                <Box textAlign="center" display="flex" justifyContent="center">
                  <Typography variant="h3" fontWeight="bold">
                    Unlock your digitial potential.
                  </Typography>
                </Box>
              </Box>
              <Box flexBasis="40%" display="flex" flexDirection="row" pt={4}>
                <Box flexBasis="12.5%"></Box>
                <List sx={{ flexBasis: "35%" }}>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Web Application Development
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ p: 0, fontWeight: "500" }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        APIs & Integrations
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Web Development
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ p: 0, listStyleType: "circle" }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Technology Migration
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
                <Box flexBasis="15%"></Box>
                <List sx={{ flexBasis: "30%" }}>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Frontend Development
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Backend Development
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Data Visualizations
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem sx={{ p: 0 }}>
                    <ListItemText>
                      <Typography variant="body1" fontWeight="500">
                        Forms & UI
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
                <Box flexBasis="7.5%"></Box>
              </Box>
            </Box>
          </Box>
        </ExpandingBorderBox>
      </Box>
    </ScreenshotWrapper>
  )
}
