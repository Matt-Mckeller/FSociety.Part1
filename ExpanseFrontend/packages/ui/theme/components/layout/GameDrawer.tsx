"use client"
import * as React from "react"
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { ProfileDisplay } from "expanse.ui/game"
import { Link } from "@mui/material"

const openedMixin = (theme: Theme): CSSObject => ({
  width: theme.components?.GameDrawer?.variants?.default?.width,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: theme.components?.GameDrawer?.variants?.default?.width,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  [".MuiDrawer-paper"]: {
    marginTop: "56px",
  },
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}))

export const GameDrawer = () => {
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const teacherLinks = []
  const studentLinks = []
  const links = [
    { text: "Profile", link: "/demo" },
    { text: "Inventory", link: "/demo/inventory" },
    { text: "Wallet", link: "/demo/wallet" },
    { text: "Stores", link: "/demo/store" },
    // { text: "Scholarships", link: "/demo/scholarships" },
    { text: "Reward Setup", link: "/demo/rewardSetup" },
    // { text: "Achievements", link: "/demo/achievements" },
    // { text: "Quests", link: "/demo/quests" },
    // { text: "Lottery", link: "/demo/lottery" },
    // { text: "Battles", link: "/demo/battles" },
    // { text: "Leaderboards", link: "/demo/leaderboards" },
  ]

  return (
    <Drawer variant="permanent" open={open} sx={{ marginTop: "56px" }}>
      {/* <DrawerHeader>
        <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader> */}
      <Divider />
      <Box my={4}>
        <ProfileDisplay barHeight={36} enableLabels={false}></ProfileDisplay>
      </Box>
      <Divider />
      <List>
        {links.map(({ text, link }, index) => (
          <Link component="a" key={text} href={link}>
            <ListItemButton>{text}</ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  )
}

export default GameDrawer
