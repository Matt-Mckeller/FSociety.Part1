"use client"
import {
  Box,
  Paper,
  Theme,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import Grid from "@mui/material/Grid"
import CloudIcon from "@mui/icons-material/Cloud"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import TerminalIcon from "@mui/icons-material/Terminal"
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg"
import DataObjectIcon from "@mui/icons-material/DataObject"
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt"
import StorageIcon from "@mui/icons-material/Storage"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import React from "react"
import { DynamicForm } from "@mui/icons-material"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "300px",
  minWidth: "300px",
}))
function CardContainer({
  Icon,
  text,
}: {
  Icon: React.ElementType
  text: string
}) {
  const theme = useTheme()
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={2}
      height="126px"
      width="100%"
      minWidth="100%"
    >
      <Box maxHeight="40px" height="40px" minHeight="40px" mb={1}>
        <Icon />
      </Box>
      <Typography variant="cardTitle" textAlign="center" component="h4">
        {text}
      </Typography>
    </Box>
  )
}

export function SpecializationSection() {
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
        <Item sx={{ width: "100%" }}>
          <CardContainer
            Icon={DataObjectIcon}
            text="Frontend & Backend Development"
          />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer
            Icon={AccountTreeIcon}
            text="Agile Software Development"
          />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer Icon={DynamicForm} text="Custom Forms & Reports" />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer
            Icon={TerminalIcon}
            text="Software Architecture & API Design"
          />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer Icon={CloudIcon} text="Cloud Environments" />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer
            Icon={QueryStatsIcon}
            text="Data Visualization & Analysis"
          />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer Icon={ViewQuiltIcon} text="User Interface Design" />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer Icon={StorageIcon} text="Database Design & Modeling" />
        </Item>
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
        <Item sx={{ width: "100%" }}>
          <CardContainer
            Icon={PermPhoneMsgIcon}
            text="Effective Communication & Collaboration"
          />
        </Item>
      </Grid>
    </Grid>
  )
}
