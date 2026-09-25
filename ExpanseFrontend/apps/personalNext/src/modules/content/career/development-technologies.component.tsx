"use client"
import React from "react"
import { Box, Theme } from "@mui/system"
import { Grid, List, ListItem, Typography, styled } from "@mui/material"

function SmallCard({
  title,
  children,
}: {
  title: string
  children: React.ReactElement
}) {
  return (
    <Box
      height="126px"
      width="100%"
      minWidth="300px"
      //   minHeight="100%"
      sx={(theme: Theme) => ({
        borderRadius: "7px",
        // @ts-ignore mui has unknown for shadow type, ignoring
        boxShadow: theme.shadows[1],
        position: "relative",
        // Apply elevation effect by lightening the background color on the card in dark mode
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(rgba(255,255,255, 0.05), rgba(255,255,255, 0.05))"
            : null,
        display: "flex",
        flexDirection: "column",
      })}
      p={4}
    >
      <Box
        display="flex"
        flexBasis="30%"
        justifyContent="center"
        textAlign="center"
      >
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexBasis="70%"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  )
}
const TechnologyListItem = styled(ListItem)(() => ({
  margin: 0,
  padding: 0,
  textAlign: "center",
  display: "block",
}))
const TechnologyList = styled(List)(() => ({
  listStyle: "none",
}))
export function DevelopmentTechnologies() {
  return (
    <Grid container spacing={8} justifyContent="center">
      <Grid
        item
        laptop={4}
        desktop={4}
        tablet={12}
        mobileM={12}
        display="flex"
        justifyContent="center"
      >
        <SmallCard title="Frontend Development">
          <TechnologyList>
            <TechnologyListItem>React</TechnologyListItem>
            <TechnologyListItem>Angular</TechnologyListItem>
            <TechnologyListItem>JavaScript/TypeScript</TechnologyListItem>
          </TechnologyList>
        </SmallCard>
      </Grid>
      <Grid
        item
        laptop={4}
        desktop={4}
        tablet={12}
        mobileM={12}
        display="flex"
        justifyContent="center"
      >
        <SmallCard title="Backend Development">
          <TechnologyList>
            <TechnologyListItem>Node.js</TechnologyListItem>
            <TechnologyListItem>Nest.Js and Express</TechnologyListItem>
            <TechnologyListItem>PHP with Laravel Framework</TechnologyListItem>
          </TechnologyList>
        </SmallCard>
      </Grid>
      <Grid
        item
        laptop={4}
        desktop={4}
        tablet={12}
        mobileM={12}
        display="flex"
        justifyContent="center"
      >
        <SmallCard title="Database & Data">
          <Box component="ul" m={0} p={0}>
            <TechnologyListItem>SQL</TechnologyListItem>
            <TechnologyListItem>NoSQL</TechnologyListItem>
            <TechnologyListItem>JSON + XML</TechnologyListItem>
          </Box>
        </SmallCard>
      </Grid>
    </Grid>
  )
}
