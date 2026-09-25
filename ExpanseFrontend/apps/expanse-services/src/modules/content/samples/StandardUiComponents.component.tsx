"use client"
import {
  Autocomplete,
  Badge,
  Button,
  Card,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { ComponentProps } from "react"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import MailIcon from "@mui/icons-material/Mail"
import PhoneIcon from "@mui/icons-material/Phone"
import WifiIcon from "@mui/icons-material/Wifi"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

function ComponentCard({
  children,
  title,
  sx = {},
}: {
  children: React.ReactNode
  title: string
  sx?: ComponentProps<any>
}) {
  return (
    <Card
      sx={{
        width: "100%",
        p: 3,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        height: "120px",
        ...sx,
      }}
    >
      <Box display="flex" justifyContent="center" flexGrow={1}>
        {children}
      </Box>

      <Typography variant="body2" component="h4" fontWeight="bold" mt={3}>
        {title}
      </Typography>
    </Card>
  )
}
function GrowthAutocomplete() {
  const growthTerms = [
    { label: "Level up", id: 1 },
    { label: "Power-up", id: 2 },
    { label: "Achievement", id: 3 },
    { label: "Progression", id: 4 },
    { label: "Skill tree", id: 5 },
    { label: "Experience points (XP)", id: 6 },
    { label: "Quest", id: 7 },
    { label: "Mastery", id: 8 },
    { label: "High score", id: 9 },
    { label: "Advancement", id: 10 },
    { label: "Unlock", id: 11 },
    { label: "Upgrade", id: 12 },
    { label: "Evolve", id: 13 },
    { label: "Boss battle", id: 14 },
    { label: "Gamification", id: 15 },
    { label: "Strategy", id: 16 },
    { label: "Competitive edge", id: 17 },
    { label: "Endgame", id: 18 },
    { label: "Leaderboard", id: 19 },
    { label: "Winning streak", id: 20 },
    { label: "Epic Loot", id: 21 }, // Added one more entry
  ]

  return (
    <Autocomplete
      disablePortal
      id="growth-autocomplete-demo"
      options={growthTerms}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Grow" />}
    />
  )
}
function AddToCartButton() {
  return <Button endIcon={<AddShoppingCartIcon />}>Add to cart</Button>
}
function MenuSample() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Open Me!
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}
function BadgeExamples() {
  return (
    <Box pt={2} display="flex" justifyContent="center" alignItems="center">
      <Badge color="primary" badgeContent={3} sx={{ mr: 4 }}>
        <MailIcon />
      </Badge>
      <Badge color="primary" badgeContent={20} sx={{ mr: 4 }}>
        <PhoneIcon />
      </Badge>
      <Badge color="primary" badgeContent={35} max={34}>
        <WifiIcon />
      </Badge>
    </Box>
  )
}
export function StandardUIComponents() {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid
        item
        laptop={4}
        tablet={6}
        zero={12}
        display="flex"
        justifyContent="center"
      >
        <ComponentCard title="Autocomplete" sx={{ paddingTop: 6 }}>
          <GrowthAutocomplete />
        </ComponentCard>
      </Grid>
      <Grid
        item
        laptop={4}
        tablet={6}
        zero={12}
        display="flex"
        justifyContent="center"
      >
        <ComponentCard title="Button">
          <AddToCartButton />
        </ComponentCard>
      </Grid>
      <Grid
        item
        laptop={4}
        tablet={6}
        zero={12}
        display="flex"
        justifyContent="center"
      >
        <ComponentCard title="Menu">
          <MenuSample />
        </ComponentCard>
      </Grid>
      <Grid
        item
        laptop={4}
        tablet={6}
        zero={12}
        display="flex"
        justifyContent="center"
      >
        <ComponentCard title="Badges & Notifications">
          <BadgeExamples />
        </ComponentCard>
      </Grid>
      <Grid
        item
        laptop={4}
        tablet={6}
        zero={12}
        display="flex"
        justifyContent="center"
      >
        <ComponentCard title="Progress Bar Loading">
          <Box width="50%" height="5px" alignSelf="center">
            <LinearProgress />
          </Box>
        </ComponentCard>
      </Grid>
      <Grid
        item
        laptop={4}
        tablet={6}
        zero={12}
        display="flex"
        justifyContent="center"
      >
        <ComponentCard title="Date Picker">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </ComponentCard>
      </Grid>
    </Grid>
  )
}
