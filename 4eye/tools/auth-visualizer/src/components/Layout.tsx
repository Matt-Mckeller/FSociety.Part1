import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TimelineIcon from '@mui/icons-material/Timeline';
import SecurityIcon from '@mui/icons-material/Security';
import WidgetsIcon from '@mui/icons-material/Widgets';

const drawerWidth = 280;

const navItems = [
  { path: '/', label: 'Overview', icon: <DashboardIcon /> },
  { path: '/flows', label: 'Auth Flows', icon: <TimelineIcon /> },
  { path: '/architecture', label: 'Architecture', icon: <AccountTreeIcon /> },
  { path: '/compliance', label: 'Compliance', icon: <SecurityIcon /> },
  { path: '/components', label: 'Components', icon: <WidgetsIcon /> },
];

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
        elevation={0}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
            Authentication System Visualizer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ px: 2 }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
            🔐 Auth Plan
          </Typography>
        </Toolbar>
        <Divider />

        <List sx={{ px: 1 }}>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 1,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'inherit' : 'text.secondary' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: location.pathname === item.path ? 600 : 400 
                    } 
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mt: 'auto' }} />
        
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            4eye / Expanse
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Auth System Planning
          </Typography>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
