'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import FeaturesIcon from '@mui/icons-material/AutoAwesome';
import ScreensIcon from '@mui/icons-material/PhoneIphone';
import TechIcon from '@mui/icons-material/Code';
import PrivacyIcon from '@mui/icons-material/Security';
import RobotIcon from '@mui/icons-material/SmartToy';
import PlanIcon from '@mui/icons-material/Assignment';

const DRAWER_WIDTH = 260;

const navItems = [
  { label: 'Overview', href: '/', icon: <HomeIcon /> },
  { label: 'Features', href: '/features', icon: <FeaturesIcon /> },
  { label: 'Screens', href: '/screens', icon: <ScreensIcon /> },
  { label: 'Technology', href: '/technology', icon: <TechIcon /> },
  { label: 'Privacy & Security', href: '/privacy', icon: <PrivacyIcon /> },
  { label: 'Robot Model', href: '/robot', icon: <RobotIcon /> },
  { label: 'Project Plan', href: '/plan', icon: <PlanIcon /> },
];

export default function Navigation({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ py: 2 }}>
      <Box sx={{ px: 3, mb: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <RobotIcon sx={{ fontSize: 28 }} />
          Counsellor Support
        </Typography>
        <Typography variant="caption" color="text.secondary">
          AI-Powered Mental Health
        </Typography>
      </Box>
      <List sx={{ px: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => isMobile && setMobileOpen(false)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  backgroundColor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? 'white' : 'primary.main',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.9rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          display: { md: 'none' },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={600}>
            Counsellor Support
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: { xs: '56px', md: 0 },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
