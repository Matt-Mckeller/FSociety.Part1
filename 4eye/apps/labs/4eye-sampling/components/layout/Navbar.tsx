'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '@expanse/auth';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navbar() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('laptop'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(href);
    }
  };

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="desktop">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: 0,
              mr: 4,
            }}
          >
            4eye.ai
          </Typography>

          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.href}
                  color="inherit"
                  onClick={() => handleNavClick(link.href)}
                  sx={{ color: 'text.primary' }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: isMobile ? 1 : 0 }} />

          {!isLoading && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  {!isMobile && (
                    <Typography sx={{ alignSelf: 'center', mr: 1, color: 'text.secondary' }}>
                      {user?.name}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  {!isMobile && (
                    <Button
                      color="inherit"
                      onClick={() => router.push('/login')}
                      sx={{ color: 'text.primary' }}
                    >
                      Sign In
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={() => router.push('/signup')}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(true)}
              sx={{ ml: 1, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 280, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton onClick={() => handleNavClick(link.href)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {!isAuthenticated && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavClick('/login')}>
                  <ListItemText primary="Sign In" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
