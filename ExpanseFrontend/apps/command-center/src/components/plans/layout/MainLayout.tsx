import { useState } from "react"
import { Outlet } from "react-router-dom"
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Sidebar } from "../navigation/Sidebar"
import { Breadcrumbs } from "../navigation/Breadcrumbs"

export function MainLayout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 80px)",
        bgcolor: alpha(theme.palette.background.default, 0.5),
      }}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: "blur(8px)",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Toolbar sx={{ minHeight: 56 }}>
            {isMobile && (
              <IconButton
                edge="start"
                onClick={() => setSidebarOpen(true)}
                sx={{
                  mr: 2,
                  color: "text.primary",
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            pl: { xs: 2, sm: 2, md: 2 },
            pr: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, md: 3 },
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 1100 }}>
            <Breadcrumbs />
            <Box sx={{ mt: 1 }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
