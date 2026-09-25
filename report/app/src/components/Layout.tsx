import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
  IconButton,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  People as PeopleIcon,
  Place as PlaceIcon,
  Inventory as InventoryIcon,
  Business as BusinessIcon,
  Psychology as TheoriesIcon,
  Chat as ChatIcon,
  Hub as HubIcon,
  AutoAwesome as SymbolsIcon,
  BubbleChart as GraphIcon,
  Info as BackgroundIcon,
  Search as InvestigationsIcon,
  LocalShipping as TransitProsIcon,
  HelpOutline as UncategorizedIcon,
  Security as SecurityIcon,
  Assignment as StatusIcon,
  Help as RequestsIcon,
  Visibility as InterpretationsIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

// Menu items organized by section
const menuSections = [
  {
    title: null, // Main section, no title
    items: [
      { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
      { text: 'Timeline and Events', icon: <TimelineIcon />, path: '/timeline' },
    ],
  },
  {
    title: 'Other Entities',
    items: [
      { text: 'People', icon: <PeopleIcon />, path: '/people' },
      { text: 'Locations', icon: <PlaceIcon />, path: '/locations' },
      { text: 'Items', icon: <InventoryIcon />, path: '/items' },
      { text: 'Organizations', icon: <BusinessIcon />, path: '/organizations' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      { text: 'Interpretations', icon: <InterpretationsIcon />, path: '/interpretations' },
      { text: 'Theories', icon: <TheoriesIcon />, path: '/theories' },
      { text: 'Symbols', icon: <SymbolsIcon />, path: '/symbols' },
      { text: 'Connections', icon: <HubIcon />, path: '/connections' },
      { text: 'Graph', icon: <GraphIcon />, path: '/graph' },
    ],
  },
  {
    title: 'Context',
    items: [
      { text: 'Background', icon: <BackgroundIcon />, path: '/background' },
      { text: 'Security', icon: <SecurityIcon />, path: '/security' },
      { text: 'Communications', icon: <ChatIcon />, path: '/communications' },
    ],
  },
  {
    title: 'Status',
    items: [
      { text: 'Current Status', icon: <StatusIcon />, path: '/status' },
      { text: 'Requests', icon: <RequestsIcon />, path: '/requests' },
      { text: 'Other Investigations', icon: <InvestigationsIcon />, path: '/investigations' },
    ],
  },
  {
    title: 'Lower Priority',
    items: [
      { text: 'TransitPros', icon: <TransitProsIcon />, path: '/transitpros' },
      { text: 'Uncategorized Events', icon: <UncategorizedIcon />, path: '/uncategorized' },
    ],
  },
];

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', flexDirection: 'column', py: 2 }}>
        <Box
          component="img"
          src="/logoBlack.svg"
          alt="Expanse 72"
          sx={{
            height: 40,
            width: 'auto',
            mb: 1,
            filter: 'invert(27%) sepia(74%) saturate(1697%) hue-rotate(338deg) brightness(87%) contrast(92%)',
          }}
        />
        <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Expanse 72
        </Typography>
      </Toolbar>
      <Divider />
      {menuSections.map((section, sectionIndex) => (
        <Box key={sectionIndex}>
          {section.title && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ px: 2, pt: 2, pb: 0.5, display: 'block', fontWeight: 'bold', textTransform: 'uppercase' }}
            >
              {section.title}
            </Typography>
          )}
          <List dense={section.title !== null} disablePadding>
            {section.items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  sx={{
                    py: section.title ? 0.5 : 1,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(190, 48, 48, 0.15)',
                      borderRight: '3px solid',
                      borderColor: 'primary.main',
                    },
                    '&.Mui-selected:hover': {
                      backgroundColor: 'rgba(190, 48, 48, 0.25)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit', minWidth: 36 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {sectionIndex < menuSections.length - 1 && <Divider sx={{ my: 0.5 }} />}
        </Box>
      ))}
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            src="/logoBlack.svg"
            alt="Expanse 72"
            sx={{
              height: 24,
              width: 'auto',
              mr: 1.5,
              display: { xs: 'none', sm: 'block' },
              filter: 'invert(27%) sepia(74%) saturate(1697%) hue-rotate(338deg) brightness(87%) contrast(92%)',
            }}
          />
          <Typography variant="h6" noWrap component="div" sx={{ color: 'text.primary' }}>
            {menuSections.flatMap(s => s.items).find((item) => item.path === location.pathname)?.text || 'Expanse 72'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
