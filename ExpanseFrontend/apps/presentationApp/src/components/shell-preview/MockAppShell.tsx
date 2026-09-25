'use client'

import React, { useState } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  LinearProgress,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  Paper,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Button,
} from '@mui/material'

// Icons
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ChatIcon from '@mui/icons-material/Chat'
import StickyNote2Icon from '@mui/icons-material/StickyNote2'
import InventoryIcon from '@mui/icons-material/Inventory'
import SchoolIcon from '@mui/icons-material/School'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import StarIcon from '@mui/icons-material/Star'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import HelpIcon from '@mui/icons-material/Help'
import CloseIcon from '@mui/icons-material/Close'

import { useShellMock, PanelState } from './ShellMockProvider'
import { QuestList, sampleQuests } from './QuestComponents'

// ============================================================================
// Profile Badge Logo Component
// Represents: Gaming (achievement badge shape), Growth (rising flame/phoenix),
// Learning (radiating knowledge/enlightenment rays)
// ============================================================================

function ProfileBadgeLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow effect */}
      <defs>
        <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="flameGradient" x1="24" y1="40" x2="24" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="innerFlame" x1="24" y1="36" x2="24" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="badgeRing" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Background circle with gradient border (Achievement Badge) */}
      <circle cx="24" cy="24" r="22" fill="url(#badgeGlow)" />
      <circle 
        cx="24" 
        cy="24" 
        r="20" 
        fill="#1e1b4b"
        stroke="url(#badgeRing)"
        strokeWidth="2.5"
      />
      
      {/* Rising Flame/Phoenix (Growth + Transformation) */}
      <path
        d="M24 8
           C24 8 18 16 18 22
           C18 26 20 30 24 32
           C28 30 30 26 30 22
           C30 16 24 8 24 8Z"
        fill="url(#flameGradient)"
      />
      
      {/* Inner flame core (Learning/Knowledge spark) */}
      <path
        d="M24 14
           C24 14 21 19 21 23
           C21 25.5 22.2 27.5 24 28.5
           C25.8 27.5 27 25.5 27 23
           C27 19 24 14 24 14Z"
        fill="url(#innerFlame)"
      />
      
      {/* Small rising particles (Level-up / XP / Progress) */}
      <circle cx="16" cy="18" r="1.5" fill="#fbbf24" opacity="0.9" />
      <circle cx="32" cy="18" r="1.5" fill="#fbbf24" opacity="0.9" />
      <circle cx="14" cy="26" r="1" fill="#a78bfa" opacity="0.7" />
      <circle cx="34" cy="26" r="1" fill="#a78bfa" opacity="0.7" />
      
      {/* Star highlights (Achievement unlocked) */}
      <path
        d="M24 6 L24.8 8 L26.8 8 L25.2 9.2 L25.8 11.2 L24 10 L22.2 11.2 L22.8 9.2 L21.2 8 L23.2 8 Z"
        fill="#fbbf24"
      />
      
      {/* Base platform (Foundation/stability) */}
      <path
        d="M18 36 L24 33 L30 36 L28 38 L24 36 L20 38 Z"
        fill="#8b5cf6"
        opacity="0.6"
      />
    </svg>
  )
}

// ============================================================================
// Drawer Widths & Heights
// ============================================================================

const NAV_DRAWER_WIDTH = 280
const PANEL_DRAWER_WIDTH = 340
const CHAT_DRAWER_HEIGHT = 280

// ============================================================================
// Top Bar Component (Simplified - Profile Menu)
// ============================================================================

function TopBar() {
  const { user, theme } = useShellMock()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        bgcolor: theme === 'dark' ? '#1e293b' : 'white',
        color: theme === 'dark' ? 'white' : 'text.primary',
        borderBottom: '1px solid',
        borderColor: theme === 'dark' ? '#334155' : 'divider',
        zIndex: 1200,
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Logo & Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SchoolIcon sx={{ color: '#8b5cf6', fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Expanse Edu
          </Typography>
        </Box>

        {/* Center: XP Bar & Game Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
          <Chip
            icon={<StarIcon sx={{ color: '#f59e0b !important' }} />}
            label={`Level ${user.level}`}
            size="small"
            sx={{ bgcolor: '#fef3c7', fontWeight: 600 }}
          />
          <Box sx={{ width: 180 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                XP
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.xp}/{user.maxXp}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(user.xp / user.maxXp) * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#8b5cf6',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
          <Chip
            icon={<MonetizationOnIcon sx={{ color: '#10b981 !important' }} />}
            label={user.coins.toLocaleString()}
            size="small"
            sx={{ bgcolor: '#d1fae5', fontWeight: 600 }}
          />
        </Box>

        {/* Right: Notifications & Profile Menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Notifications">
            <IconButton size="small">
              <Badge badgeContent={2} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          {/* Profile Menu Button */}
          <Button
            onClick={handleProfileClick}
            sx={{
              ml: 1,
              textTransform: 'none',
              color: 'inherit',
              '&:hover': { bgcolor: theme === 'dark' ? '#334155' : '#f1f5f9' },
            }}
            endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 18, transition: 'transform 0.2s', transform: menuOpen ? 'rotate(180deg)' : 'none' }} />}
          >
            <Box sx={{ mr: 1, display: 'flex' }}>
              <ProfileBadgeLogo size={36} />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
              {user.name}
            </Typography>
          </Button>
          
          {/* Profile Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                elevation: 8,
                sx: {
                  mt: 1.5,
                  minWidth: 220,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                  boxShadow: theme === 'dark' 
                    ? '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                    : '0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
                  bgcolor: theme === 'dark' ? '#1e293b' : 'background.paper',
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: theme === 'dark' ? '#1e293b' : 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    borderLeft: '1px solid',
                    borderTop: '1px solid',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                  },
                },
              },
            }}
          >
            {/* User Info */}
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
              <Typography variant="caption" color="text.secondary">Level {user.level} Explorer</Typography>
            </Box>
            
            <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1.25 }}>
              <PersonIcon sx={{ fontSize: 20, color: '#64748b' }} />
              <Typography variant="body2">Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1.25 }}>
              <InventoryIcon sx={{ fontSize: 20, color: '#8b5cf6' }} />
              <Typography variant="body2">Inventory</Typography>
              <Chip label="3 new" size="small" sx={{ ml: 'auto', height: 20, fontSize: '0.65rem', bgcolor: '#f3e8ff', color: '#8b5cf6' }} />
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1.25 }}>
              <SettingsIcon sx={{ fontSize: 20, color: '#64748b' }} />
              <Typography variant="body2">Settings</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1.25 }}>
              <HelpIcon sx={{ fontSize: 20, color: '#64748b' }} />
              <Typography variant="body2">Help & Support</Typography>
            </MenuItem>
            
            <Divider sx={{ my: 0.5 }} />
            
            <MenuItem onClick={handleClose} sx={{ gap: 1.5, py: 1.25, color: '#ef4444' }}>
              <LogoutIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2">Sign Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

// ============================================================================
// Side Navigation Component (Enhanced with Action Buttons)
// ============================================================================

function SideNavigation() {
  const { sections, theme, panels, togglePanel } = useShellMock()

  if (!panels.navigation) return null

  // Count active quests for badge
  const activeQuestCount = sampleQuests.filter(q => q.status === 'active').length

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: NAV_DRAWER_WIDTH,
        flexShrink: 0,
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        '& .MuiDrawer-paper': {
          width: NAV_DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: theme === 'dark' ? '#0f172a' : '#f8fafc',
          borderRight: '1px solid',
          borderColor: theme === 'dark' ? '#334155' : 'divider',
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Sections List */}
      <Box sx={{ p: 2, flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1.5, fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.05em' }}>
          SECTIONS
        </Typography>
        <List disablePadding>
          {sections.map((section, index) => (
            <ListItem key={section.id} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  py: 1,
                  bgcolor: index === 1 ? (theme === 'dark' ? '#1e293b' : 'white') : 'transparent',
                  border: index === 1 ? '1px solid' : '1px solid transparent',
                  borderColor: index === 1 ? '#8b5cf6' : 'transparent',
                  '&:hover': {
                    bgcolor: theme === 'dark' ? '#1e293b' : 'white',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {section.progress === 100 ? (
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
                  ) : (
                    <RadioButtonUncheckedIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={section.title}
                  secondary={`${section.progress}%`}
                  primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: index === 1 ? 600 : 400 }}
                  secondaryTypographyProps={{ fontSize: '0.7rem' }}
                />
                {/* Mini progress bar */}
                <Box sx={{ width: 40, ml: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={section.progress}
                    color={section.progress === 100 ? 'success' : 'primary'}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      bgcolor: 'action.hover',
                    }}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Quick Access Icons - Fixed at Bottom */}
      <Box
        sx={{
          flexShrink: 0,
          py: 1,
          px: 1.5,
          display: 'flex',
          justifyContent: 'center',
          gap: 0.5,
          borderTop: '1px solid',
          borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
        }}
      >
        <Tooltip title="Quests" placement="top">
          <IconButton
            size="small"
            onClick={() => togglePanel('quest')}
            sx={{
              color: panels.quest ? '#f59e0b' : 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Badge badgeContent={activeQuestCount} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 9, height: 14, minWidth: 14 } }}>
              <EmojiEventsIcon sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Chat" placement="top">
          <IconButton
            size="small"
            onClick={() => togglePanel('chat')}
            sx={{
              color: panels.chat ? '#3b82f6' : 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ChatIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notes" placement="top">
          <IconButton
            size="small"
            onClick={() => togglePanel('notes')}
            sx={{
              color: panels.notes ? '#10b981' : 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <StickyNote2Icon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  )
}

// ============================================================================
// Content Area Component
// ============================================================================

function ContentArea() {
  const { currentSlide, totalSlides, presentationTitle, theme } = useShellMock()

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        bgcolor: theme === 'dark' ? '#0f172a' : '#f1f5f9',
        minHeight: '100%',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: theme === 'dark' ? '#1e293b' : 'white',
          border: '1px solid',
          borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
          minHeight: 400,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="overline" color="text.secondary">
            {presentationTitle}
          </Typography>
          <Chip label={`Slide ${currentSlide} of ${totalSlides}`} size="small" />
        </Box>
        
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
          Core Concepts
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Understanding the fundamentals of effective learning
        </Typography>
        
        <Box sx={{ 
          p: 3, 
          bgcolor: '#f8fafc', 
          borderRadius: 2, 
          border: '1px dashed #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
        }}>
          <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
            [Primary Slide Content Area]
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

// ============================================================================
// Quest Drawer Component (Overlay with backdrop)
// ============================================================================

const QUEST_DRAWER_WIDTH = 420

function QuestDrawer() {
  const { panels, theme, togglePanel } = useShellMock()
  const activeQuestCount = sampleQuests.filter(q => q.status === 'active').length

  return (
    <Drawer
      anchor="right"
      variant="temporary"
      open={panels.quest}
      onClose={() => togglePanel('quest')}
      transitionDuration={200}
      hideBackdrop={false}
      ModalProps={{
        keepMounted: false,
        disablePortal: true,
        disableScrollLock: true,
        disableAutoFocus: true,
        disableEnforceFocus: true,
        disableRestoreFocus: true,
      }}
      SlideProps={{
        easing: {
          enter: 'cubic-bezier(0.0, 0, 0.2, 1)',
          exit: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
      }}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300,
        '& .MuiBackdrop-root': {
          position: 'absolute',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        },
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: QUEST_DRAWER_WIDTH,
          height: '100%',
          top: 0,
          right: 0,
          boxSizing: 'border-box',
          bgcolor: theme === 'dark' ? '#1e293b' : 'white',
          borderLeft: '1px solid',
          borderColor: theme === 'dark' ? '#334155' : 'divider',
          boxShadow: '-8px 0 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Panel Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: '1px solid', borderColor: theme === 'dark' ? '#334155' : 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmojiEventsIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Quests
            </Typography>
            <Chip
              label={`${activeQuestCount} Active`}
              size="small"
              sx={{ bgcolor: '#fef3c7', color: '#92400e', fontWeight: 600 }}
            />
          </Box>
          <IconButton onClick={() => togglePanel('quest')} sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Panel Content */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <QuestList
            quests={sampleQuests}
            onStart={(id) => console.log('Start quest:', id)}
            onClaim={(id) => console.log('Claim quest:', id)}
          />
        </Box>
      </Box>
    </Drawer>
  )
}

// ============================================================================
// Chat Drawer Component (Bottom - takes priority for space)
// ============================================================================

function ChatDrawer() {
  const { panels, theme, togglePanel } = useShellMock()

  if (!panels.chat) return null

  return (
    <Drawer
      anchor="bottom"
      variant="persistent"
      open={panels.chat}
      sx={{
        flexShrink: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: CHAT_DRAWER_HEIGHT,
        zIndex: 1100,
        '& .MuiDrawer-paper': {
          height: CHAT_DRAWER_HEIGHT,
          boxSizing: 'border-box',
          bgcolor: theme === 'dark' ? '#1e293b' : 'white',
          borderTop: '1px solid',
          borderColor: theme === 'dark' ? '#334155' : 'divider',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Panel Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ChatIcon sx={{ color: '#3b82f6' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Chat
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => togglePanel('chat')} sx={{ color: 'text.secondary' }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        
        {/* Chat Content */}
        <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex', gap: 2 }}>
          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              bgcolor: theme === 'dark' ? '#0f172a' : '#f8fafc',
              borderRadius: 2,
              border: '1px dashed',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              [Chat Messages]
            </Typography>
          </Box>
          {/* Input Area */}
          <Box
            sx={{
              width: 200,
              p: 2,
              bgcolor: theme === 'dark' ? '#0f172a' : '#f1f5f9',
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme === 'dark' ? '#334155' : '#e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              [AI Assistant]
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

// ============================================================================
// Panel Drawer Component (Notes, Inventory - right side persistent)
// ============================================================================

function PanelDrawer({ type }: { type: 'notes' | 'inventory' }) {
  const { panels, theme, togglePanel } = useShellMock()

  if (!panels[type]) return null

  const panelConfig = {
    notes: { title: 'Notes', icon: <StickyNote2Icon sx={{ color: '#10b981' }} />, color: '#10b981' },
    inventory: { title: 'Inventory', icon: <InventoryIcon sx={{ color: '#8b5cf6' }} />, color: '#8b5cf6' },
  }

  const config = panelConfig[type]

  // PanelDrawer is inside body container which already handles Chat offset
  // So we just use 100% height here

  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={panels[type]}
      sx={{
        width: PANEL_DRAWER_WIDTH,
        flexShrink: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        '& .MuiDrawer-paper': {
          width: PANEL_DRAWER_WIDTH,
          boxSizing: 'border-box',
          bgcolor: theme === 'dark' ? '#1e293b' : 'white',
          borderLeft: '1px solid',
          borderColor: theme === 'dark' ? '#334155' : 'divider',
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
        },
      }}
    >
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Panel Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {config.icon}
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {config.title}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => togglePanel(type)} sx={{ color: 'text.secondary' }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
        
        {/* Panel Content */}
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <Box
            sx={{
              p: 3,
              bgcolor: '#f8fafc',
              borderRadius: 2,
              border: '1px dashed #e2e8f0',
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
              [{config.title} Content]
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}

// ============================================================================
// Main Shell Component
// ============================================================================

export function MockAppShell() {
  const { panels } = useShellMock()

  // Notes/Inventory are right-side panels (Chat is now bottom)
  const activeRightPanel = (['notes', 'inventory'] as const).find(p => panels[p]) || null

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%', 
        width: '100%', 
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      {/* Fixed Header - absolute positioned */}
      <TopBar />
      
      {/* Body area below header */}
      <Box
        sx={{
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
          bottom: panels.chat ? CHAT_DRAWER_HEIGHT : 0,
          display: 'flex',
          overflow: 'hidden',
          transition: 'bottom 0.3s ease',
        }}
      >
        {/* Left Navigation - absolute within body */}
        <SideNavigation />
        
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            position: 'absolute',
            top: 0,
            left: panels.navigation ? NAV_DRAWER_WIDTH : 0,
            right: activeRightPanel ? PANEL_DRAWER_WIDTH : 0,
            bottom: 0,
            overflow: 'auto',
            transition: 'left 0.3s ease, right 0.3s ease',
          }}
        >
          <ContentArea />
        </Box>
        
        {/* Right-side persistent drawers for Notes, Inventory */}
        {(['notes', 'inventory'] as const).map(panel => (
          <PanelDrawer key={panel} type={panel} />
        ))}
      </Box>
      
      {/* Chat drawer - bottom, takes priority over right panels */}
      <ChatDrawer />
      
      {/* Quest drawer - overlay with backdrop (sits above everything) */}
      <QuestDrawer />
    </Box>
  )
}

export default MockAppShell
