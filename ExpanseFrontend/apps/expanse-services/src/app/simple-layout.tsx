"use client"
import React from "react"
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Toolbar, 
  Typography, 
  Container,
  ThemeProvider,
  createTheme 
} from "@mui/material"
import Link from "next/link"

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
})

type Props = {
  children: React.ReactNode
}

export function SimpleLayout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <AppBar position="fixed">
          <Toolbar>
            <Typography 
              variant="h6" 
              component={Link} 
              href="/" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                flexGrow: 1 
              }}
            >
              Expanse Services
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar /> {/* Spacer for fixed AppBar */}
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Container>
        <Box 
          component="footer" 
          sx={{ 
            py: 3, 
            px: 2, 
            mt: 'auto',
            backgroundColor: 'background.paper',
            textAlign: 'center'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Expanse Services
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default SimpleLayout
