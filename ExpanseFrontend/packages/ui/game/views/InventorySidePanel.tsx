"use client"
import { Badge, Button, Grid, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ChestOpening1Animation } from "expanse.dynamicAssets"
import {
  InventoryContext,
  InventoryItemImage,
  InventoryItemInterface,
  useInventoryItemDictionary,
} from "expanse.ui/game"
import React, { useContext } from "react"

export const InventorySidePanel = () => {
  const { inventory, unopenedLootBoxes } = useContext(InventoryContext)
  console.log("Inventory Side Panel", {
    inventory,
  })
  const getText = (item: InventoryItemInterface) => {
    const { dictionaryEntry } = useInventoryItemDictionary(item)

    const name = dictionaryEntry?.name
    const description = dictionaryEntry?.description
    return { name, description }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      flexGrow={1}
      borderRight={(theme) => `1px solid ${theme.palette.divider}`}
      // bgcolor="gray"
      p={4}
    >
      <Typography fontWeight="bold" variant="h3" textAlign="center">
        Inventory
      </Typography>
      <Grid container spacing={3} mt={2}>
        {unopenedLootBoxes?.length > 0 && (
          <Grid item zero={12} key={"lootbox"}>
            <Badge
              badgeContent={unopenedLootBoxes?.length}
              color="primary"
              sx={{ width: "100%" }}
              invisible={unopenedLootBoxes?.length <= 1}
            >
              <Paper
                elevation={3}
                sx={(theme) => ({
                  width: "100%",
                  padding: 2,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  border: `5px solid ${theme.palette.primary.light}`,
                })}
              >
                <Box width={50} height={50}>
                  <ChestOpening1Animation />
                </Box>
                <Typography variant="body1" ml={2}>
                  Chests
                </Typography>
              </Paper>
            </Badge>
          </Grid>
        )}
        {inventory?.length > 0 &&
          inventory.map((item, index) => (
            <Grid item zero={12} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InventoryItemImage item={item} width={50} height={50} />

                <Typography variant="body1" ml={2}>
                  {getText(item).name}
                </Typography>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}
