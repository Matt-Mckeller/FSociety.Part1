"use client"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { sections } from "../data"

export function QuickWinsAppBar() {
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchor(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchor(null)
  }

  const handleScrollToSection = (sectionId: string) => {
    handleMenuClose()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: "#4285f4" }}
      className="qw-no-print"
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Quick Wins Guide
        </Typography>
        <Button
          color="inherit"
          onClick={handleMenuClick}
          startIcon={<MenuIcon />}
        >
          Sections
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          {sections.map((section) => (
            <MenuItem
              key={section.id}
              onClick={() => handleScrollToSection(section.id)}
            >
              {section.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
