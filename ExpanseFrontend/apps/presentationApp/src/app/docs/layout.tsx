'use client';

import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse, Typography, Divider, Breadcrumbs, Chip, Tooltip } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExtensionIcon from '@mui/icons-material/Extension';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InventoryIcon from '@mui/icons-material/Inventory';
import CodeIcon from '@mui/icons-material/Code';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ScienceIcon from '@mui/icons-material/Science';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PeopleIcon from '@mui/icons-material/People';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import SpeedIcon from '@mui/icons-material/Speed';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import RouteIcon from '@mui/icons-material/Route';
import ChecklistIcon from '@mui/icons-material/Checklist';
import StarIcon from '@mui/icons-material/Star';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { useState } from 'react';

const DRAWER_WIDTH = 300;

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  tooltip?: string;
  disabled?: boolean;
}

// Quick Access / Favorites - Most frequently used pages
const quickAccess: NavItem[] = [
  { title: 'Features', href: '/docs/features', icon: <StarIcon sx={{ color: '#f59e0b' }} /> },
  { title: 'Layout', href: '/docs/layout', icon: <StarIcon sx={{ color: '#f59e0b' }} /> },
  { 
    title: 'Browse by Feature', 
    href: '#', 
    icon: <FilterListIcon sx={{ color: '#94a3b8' }} />,
    tooltip: 'Future: Filter all documentation by specific feature. When implemented, selecting a feature will show related content across all sections.',
    disabled: true,
  },
];

// Main Navigation - Organized by section type
const navigation: NavItem[] = [
  { title: 'Home', href: '/docs', icon: <HomeIcon /> },
  {
    title: 'Features',
    href: '/docs/features',
    icon: <ExtensionIcon />,
    children: [
      { title: 'Presentation', href: '/docs/features/presentation' },
      { title: 'Game UI', href: '/docs/features/game-ui' },
      { title: 'Chat', href: '/docs/features/chat' },
      { title: 'Collaboration', href: '/docs/features/collaboration' },
      { title: 'Quests', href: '/docs/features/quests' },
      { title: 'Action Bars', href: '/docs/features/action-bars' },
      { title: 'AI Actions', href: '/docs/features/ai-actions' },
      { title: 'Feedback', href: '/docs/features/feedback' },
      { title: 'Panels', href: '/docs/features/panels' },
      { title: 'Context Menu', href: '/docs/features/context-menu' },
      { title: 'Learning', href: '/docs/features/learning' },
      { title: 'Unlockable', href: '/docs/features/unlockable' },
      { title: 'Exploratory', href: '/docs/features/exploratory' },
    ],
  },
  {
    title: 'Concepts',
    href: '/docs/concepts',
    icon: <LightbulbIcon />,
    children: [
      { title: 'Currency System', href: '/docs/concepts/currency' },
      { title: 'XP & Progression', href: '/docs/concepts/progression' },
      { title: 'Quest System', href: '/docs/concepts/quests' },
    ],
  },
  { title: 'Layout', href: '/docs/layout', icon: <ViewModuleIcon /> },
  {
    title: 'Design & Mockups',
    href: '/docs/design-mockups',
    icon: <DesignServicesIcon />,
    children: [
      { title: 'Decorative Elements', href: '/docs/design-mockups/decorative' },
      { title: 'Theming', href: '/docs/design-mockups/theming' },
    ],
  },
  {
    title: 'Planning',
    href: '/docs/planning',
    icon: <InventoryIcon />,
    children: [
      {
        title: 'Product',
        href: '/docs/planning/product',
        children: [
          { title: 'Knowledge & Wiki', href: '/docs/planning/product/knowledge-wiki' },
          { title: 'Questions & Decisions', href: '/docs/planning/product/questions-decisions' },
          { title: 'UX Details', href: '/docs/planning/product/ux-details' },
          { title: 'Technology Choices', href: '/docs/planning/product/technology-choices' },
          { title: 'Features', href: '/docs/planning/product/features' },
          { title: 'Value Statements', href: '/docs/planning/product/value-statements' },
          { title: 'Feature Dependencies', href: '/docs/planning/product/feature-dependencies' },
        ],
      },
      {
        title: 'Technical',
        href: '/docs/planning/technical',
        children: [
          { title: 'Types', href: '/docs/planning/technical/types' },
          { title: 'Data Models', href: '/docs/planning/technical/data-models' },
          { title: 'Design', href: '/docs/planning/technical/design' },
          { title: 'Architecture', href: '/docs/planning/technical/architecture' },
          { title: 'UI Components', href: '/docs/planning/technical/ui-components' },
          { title: 'React Context', href: '/docs/planning/technical/react-context' },
          { title: 'Modules', href: '/docs/planning/technical/modules' },
          { title: 'Logic', href: '/docs/planning/technical/logic' },
          { title: 'APIs', href: '/docs/planning/technical/apis' },
          { title: 'Infrastructure', href: '/docs/planning/technical/infrastructure' },
          { title: 'Databases', href: '/docs/planning/technical/databases' },
          { title: 'Security & Privacy', href: '/docs/planning/technical/security-privacy' },
          { title: 'Scaling', href: '/docs/planning/technical/scaling' },
          { title: 'Internationalization', href: '/docs/planning/technical/internationalization' },
          { title: 'Accessibility', href: '/docs/planning/technical/accessibility' },
          { title: 'Logging', href: '/docs/planning/technical/logging' },
          { title: 'Observability', href: '/docs/planning/technical/observability' },
          { title: 'Analytics', href: '/docs/planning/technical/analytics' },
          { title: 'Performance', href: '/docs/planning/technical/performance' },
        ],
      },
    ],
  },
  {
    title: 'Business',
    href: '/docs/business',
    icon: <FlagIcon />,
    children: [
      { title: 'Goals', href: '/docs/business/goals' },
      { title: 'Value Proposition', href: '/docs/business/value-proposition' },
      { title: 'Success Metrics', href: '/docs/business/success-metrics' },
    ],
  },
  {
    title: 'Marketing',
    href: '/docs/marketing',
    icon: <PeopleIcon />,
    children: [
      { title: 'Audiences', href: '/docs/marketing/audiences' },
      { title: 'Personas', href: '/docs/marketing/personas' },
      { title: 'Positioning', href: '/docs/marketing/positioning' },
      {
        title: 'Content',
        href: '/docs/marketing/content',
        children: [
          { title: 'Content Types', href: '/docs/marketing/content/types' },
          { title: 'Content Pipelines', href: '/docs/marketing/content/pipelines' },
          { title: 'Content Strategy', href: '/docs/marketing/content/strategy' },
        ],
      },
    ],
  },
  {
    title: 'Website',
    href: '/docs/website',
    icon: <LanguageIcon />,
    children: [
      { 
        title: 'Strategy', 
        href: '/docs/website/strategy',
        children: [
          { title: 'Sitemap', href: '/docs/website/strategy/sitemap' },
          { title: 'Conversion Goals', href: '/docs/website/strategy/conversion-goals' },
        ],
      },
      { 
        title: 'Pages', 
        href: '/docs/website/pages',
        children: [
          { title: 'Homepage', href: '/docs/website/pages/homepage' },
          { title: 'Features', href: '/docs/website/pages/features' },
          { title: 'Pricing', href: '/docs/website/pages/pricing' },
          { title: 'About', href: '/docs/website/pages/about' },
          { title: 'Contact', href: '/docs/website/pages/contact' },
          { title: 'Demo', href: '/docs/website/pages/demo' },
        ],
      },
      { 
        title: 'Components', 
        href: '/docs/website/components',
        children: [
          { title: 'Hero', href: '/docs/website/components/hero' },
          { title: 'Feature Grid', href: '/docs/website/components/features-grid' },
          { title: 'Testimonials', href: '/docs/website/components/testimonials' },
          { title: 'CTA', href: '/docs/website/components/cta' },
          { title: 'Footer', href: '/docs/website/components/footer' },
        ],
      },
    ],
  },
  {
    title: 'Testing',
    href: '/docs/testing',
    icon: <ScienceIcon />,
    children: [
      { title: 'User Journeys', href: '/docs/testing/user-journeys' },
      { title: 'Test Cases', href: '/docs/testing/test-cases' },
    ],
  },
  {
    title: 'Implementation',
    href: '/docs/implementation',
    icon: <RocketLaunchIcon />,
    children: [
      { title: 'Presets & Setup', href: '/docs/implementation/presets' },
      { title: 'Plan', href: '/docs/implementation/plan' },
      { title: 'Priorities', href: '/docs/implementation/priorities' },
      { title: 'Strategies', href: '/docs/implementation/strategies' },
      { title: 'Phases', href: '/docs/implementation/phases' },
    ],
  },
];

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(pathname.startsWith(item.href) && item.href !== '#');
  const isActive = pathname === item.href;
  const isChildActive = item.children?.some(child => pathname === child.href);
  const hasChildren = item.children && item.children.length > 0;
  const isDisabled = item.disabled;

  const buttonContent = (
    <ListItemButton
      component={hasChildren || isDisabled ? 'div' : Link}
      href={hasChildren || isDisabled ? undefined : item.href}
      onClick={hasChildren && !isDisabled ? () => setOpen(!open) : undefined}
      selected={isActive}
      disabled={isDisabled}
      sx={{ 
        pl: 2 + depth * 2,
        py: depth > 0 ? 0.75 : 1,
        borderRadius: 2,
        transition: 'all 0.15s ease',
        ...(isChildActive && !isActive && {
          backgroundColor: 'rgba(21, 101, 192, 0.04)',
        }),
        ...(isDisabled && {
          opacity: 0.6,
          cursor: 'help',
        }),
      }}
    >
      {item.icon && (
        <ListItemIcon sx={{ 
          minWidth: 36, 
          color: isActive ? 'primary.main' : 'text.secondary',
          transition: 'color 0.15s ease',
        }}>
          {item.icon}
        </ListItemIcon>
      )}
      <ListItemText 
            primary={item.title}
            primaryTypographyProps={{
              fontSize: depth > 0 ? '0.875rem' : '0.9375rem',
              fontWeight: isActive ? 600 : (depth > 0 ? 400 : 500),
            }}
          />
          {hasChildren && (
            <Box sx={{ color: 'text.secondary', display: 'flex' }}>
              {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </Box>
          )}
        </ListItemButton>
  );

  const wrappedContent = item.tooltip ? (
    <Tooltip title={item.tooltip} placement="right" arrow>
      <span>{buttonContent}</span>
    </Tooltip>
  ) : buttonContent;

  return (
    <>
      <ListItem disablePadding>
        {wrappedContent}
      </ListItem>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ position: 'relative' }}>
            <Box sx={{ 
              position: 'absolute',
              left: 28,
              top: 4,
              bottom: 4,
              width: 2,
              bgcolor: 'grey.200',
              borderRadius: 1,
            }} />
            {item.children!.map((child) => (
              <NavItemComponent key={child.href} item={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = [];
  let href = '';
  
  for (let i = 0; i < parts.length; i++) {
    href += '/' + parts[i];
    const label = parts[i].charAt(0).toUpperCase() + parts[i].slice(1).replace(/-/g, ' ');
    breadcrumbs.push({ label, href, isLast: i === parts.length - 1 });
  }
  
  return breadcrumbs;
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 2.5,
          background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
          color: 'white',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <AutoStoriesIcon sx={{ fontSize: 28 }} />
            <Box>
              <Typography 
                variant="h6" 
                component={Link} 
                href="/" 
                sx={{ 
                  textDecoration: 'none', 
                  color: 'inherit',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                PresentationApp
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85, display: 'block', mt: -0.25 }}>
                Documentation Wiki
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Navigation */}
        <Box sx={{ p: 1.5, flex: 1, overflowY: 'auto' }}>
          {/* Quick Access / Favorites */}
          <Typography 
            variant="caption" 
            sx={{ 
              px: 2, 
              py: 1, 
              display: 'flex', 
              alignItems: 'center',
              gap: 0.5,
              fontWeight: 600, 
              color: 'primary.main',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
            }}
          >
            <StarIcon sx={{ fontSize: '0.875rem' }} />
            Quick Access
          </Typography>
          <List disablePadding>
            {quickAccess.map((item) => (
              <NavItemComponent key={item.href} item={item} />
            ))}
          </List>
          
          <Divider sx={{ my: 1.5 }} />
          
          {/* Main Navigation */}
          <Typography 
            variant="caption" 
            sx={{ 
              px: 2, 
              py: 1, 
              display: 'block', 
              fontWeight: 600, 
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontSize: '0.7rem',
            }}
          >
            Navigation
          </Typography>
          <List disablePadding>
            {navigation.map((item) => (
              <NavItemComponent key={item.href} item={item} />
            ))}
          </List>
        </Box>
        
        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Chip 
            label="v1.0" 
            size="small" 
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: 22 }}
          />
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Breadcrumb Bar */}
        {breadcrumbs.length > 1 && (
          <Box sx={{ 
            px: 4, 
            py: 1.5, 
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}>
            <Breadcrumbs 
              separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
              sx={{ '& .MuiBreadcrumbs-li': { fontSize: '0.875rem' } }}
            >
              {breadcrumbs.map((crumb) => (
                crumb.isLast ? (
                  <Typography 
                    key={crumb.href} 
                    color="text.primary" 
                    sx={{ fontWeight: 500, fontSize: '0.875rem' }}
                  >
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link 
                    key={crumb.href} 
                    href={crumb.href}
                    style={{ 
                      textDecoration: 'none', 
                      color: '#64748b',
                    }}
                  >
                    {crumb.label}
                  </Link>
                )
              ))}
            </Breadcrumbs>
          </Box>
        )}
        
        {/* Content Area */}
        <Box sx={{ p: 4, width: '100%' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
