"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { 
  Box, 
  Typography, 
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  styled,
  useTheme,
  Theme,
  CSSObject,
} from "@mui/material"
import MuiDrawer from "@mui/material/Drawer"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import HomeIcon from "@mui/icons-material/Home"
import InventoryIcon from "@mui/icons-material/Inventory"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import StoreIcon from "@mui/icons-material/Store"
import SettingsIcon from "@mui/icons-material/Settings"
import React, { useState } from "react"

/**
 * GameDrawer is a collapsible side navigation drawer used in the game interface.
 * It expands and collapses with smooth animations and shows icons when collapsed.
 * 
 * Note: This is a visual demonstration without the actual routing functionality.
 */
const meta: Meta = {
  title: "Theme/Layout/GameDrawer",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

// Recreate the drawer styling for demo
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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
  minHeight: 56,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

const menuItems = [
  { text: "Profile", icon: <HomeIcon /> },
  { text: "Inventory", icon: <InventoryIcon /> },
  { text: "Wallet", icon: <AccountBalanceWalletIcon /> },
  { text: "Store", icon: <StoreIcon /> },
  { text: "Settings", icon: <SettingsIcon /> },
]

// Demo component
const GameDrawerDemo = ({ initialOpen = true }: { initialOpen?: boolean }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(initialOpen)
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <Box sx={{ display: "flex", height: 400 }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ opacity: open ? 1 : 0 }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {menuItems[selectedIndex].text}
        </Typography>
        <Typography color="text.secondary">
          This is the content area for the {menuItems[selectedIndex].text.toLowerCase()} page.
          Click the arrow icon to toggle the drawer.
        </Typography>
      </Box>
    </Box>
  )
}

export const Expanded: StoryObj = {
  name: "Expanded State",
  render: () => <GameDrawerDemo initialOpen={true} />,
}

export const Collapsed: StoryObj = {
  name: "Collapsed State",
  render: () => <GameDrawerDemo initialOpen={false} />,
}

export const Interactive: StoryObj = {
  name: "Interactive",
  render: () => (
    <Box>
      <Typography variant="subtitle2" sx={{ p: 2, bgcolor: "background.paper" }}>
        Click the arrow button or menu items to interact with the drawer
      </Typography>
      <GameDrawerDemo initialOpen={true} />
    </Box>
  ),
}

export const DrawerStates: StoryObj = {
  name: "State Comparison",
  render: () => (
    <Box sx={{ display: "flex", gap: 4, p: 2 }}>
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Expanded</Typography>
        <Box sx={{ 
          width: drawerWidth, 
          border: "1px solid", 
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}>
          <DrawerHeader sx={{ bgcolor: "background.paper" }}>
            <IconButton size="small">
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List dense>
            {menuItems.slice(0, 3).map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton selected={index === 0}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Collapsed</Typography>
        <Box sx={{ 
          width: 57, 
          border: "1px solid", 
          borderColor: "divider",
          borderRadius: 1,
          overflow: "hidden",
        }}>
          <DrawerHeader sx={{ bgcolor: "background.paper", justifyContent: "center" }}>
            <IconButton size="small">
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List dense>
            {menuItems.slice(0, 3).map((item, index) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton selected={index === 0} sx={{ justifyContent: "center" }}>
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  ),
}

export const WithContent: StoryObj = {
  name: "Full Layout Example",
  render: () => {
    const FullLayoutDemo = () => {
      const [open, setOpen] = useState(true)
      const [selectedIndex, setSelectedIndex] = useState(0)

      return (
        <Box sx={{ display: "flex", height: 500 }}>
          {/* Simulated App Bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 56,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              px: 2,
              zIndex: 1201,
            }}
          >
            <Typography variant="h6">Game Application</Typography>
          </Box>
          
          {/* Drawer */}
          <Drawer 
            variant="permanent" 
            open={open}
            sx={{ "& .MuiDrawer-paper": { marginTop: "56px" } }}
          >
            <DrawerHeader>
              <IconButton onClick={() => setOpen(!open)}>
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {menuItems.map((item, index) => (
                <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    selected={selectedIndex === index}
                    onClick={() => setSelectedIndex(index)}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      sx={{ opacity: open ? 1 : 0 }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          
          {/* Main content */}
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: 3, 
              mt: "56px",
              bgcolor: "background.default",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              {menuItems[selectedIndex].text}
            </Typography>
            <Typography paragraph>
              Welcome to the {menuItems[selectedIndex].text.toLowerCase()} section.
              This demonstrates how the GameDrawer integrates with the application layout.
            </Typography>
            <Box 
              sx={{ 
                p: 3, 
                bgcolor: "background.paper", 
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography color="text.secondary">
                Content area with theme-aware styling
              </Typography>
            </Box>
          </Box>
        </Box>
      )
    }

    return <FullLayoutDemo />
  },
}
