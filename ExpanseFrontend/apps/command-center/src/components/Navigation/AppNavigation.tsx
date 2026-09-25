/**
 * AppNavigation - Two-tier dropdown navigation component
 * Primary tabs with dropdown menus for grouped navigation
 */
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Grow,
  Typography,
  alpha,
} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { navigationConfig, getActiveNavigation, NavGroup } from '../../config/navigation'

export function AppNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const anchorRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const { groupId: activeGroupId, itemId: activeItemId } = getActiveNavigation(location.pathname)

  // Close dropdown when route changes
  useEffect(() => {
    setOpenGroup(null)
  }, [location.pathname])

  const handleGroupClick = (group: NavGroup) => {
    if (group.path) {
      // Standalone item - navigate directly
      navigate(group.path)
      setOpenGroup(null)
    } else if (group.items && group.items.length > 0) {
      // Group with items - toggle dropdown
      setOpenGroup(openGroup === group.id ? null : group.id)
    }
  }

  const handleItemClick = (path: string) => {
    navigate(path)
    setOpenGroup(null)
  }

  const handleClose = () => {
    setOpenGroup(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent, group: NavGroup) => {
    if (event.key === 'Escape') {
      setOpenGroup(null)
    } else if (event.key === 'ArrowDown' && group.items) {
      event.preventDefault()
      setOpenGroup(group.id)
    }
  }

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {navigationConfig.map((group) => {
        const isActive = group.id === activeGroupId
        const isOpen = openGroup === group.id
        const hasDropdown = group.items && group.items.length > 0

        return (
          <Box key={group.id} sx={{ position: 'relative' }}>
            <Button
              ref={(el) => (anchorRefs.current[group.id] = el)}
              onClick={() => handleGroupClick(group)}
              onKeyDown={(e) => handleKeyDown(e, group)}
              endIcon={hasDropdown ? <KeyboardArrowDownIcon 
                sx={{ 
                  transition: 'transform 0.2s',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }} 
              /> : undefined}
              sx={{
                px: 2,
                py: 1,
                color: isActive ? 'primary.main' : 'text.secondary',
                bgcolor: isActive ? alpha('#2196f3', 0.08) : 'transparent',
                fontWeight: isActive ? 600 : 500,
                textTransform: 'none',
                borderRadius: 2,
                minHeight: 44,
                '&:hover': {
                  bgcolor: isActive ? alpha('#2196f3', 0.12) : alpha('#000', 0.04),
                },
                '& .MuiButton-startIcon': {
                  mr: 1,
                },
              }}
              startIcon={group.icon}
            >
              {group.label}
            </Button>

            {hasDropdown && (
              <Popper
                open={isOpen}
                anchorEl={anchorRefs.current[group.id]}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 1300 }}
              >
                {({ TransitionProps }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: 'left top' }}
                  >
                    <Paper
                      elevation={8}
                      sx={{
                        mt: 0.5,
                        minWidth: 200,
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={isOpen} sx={{ py: 1 }}>
                          {group.items!.map((item) => {
                            const isItemActive = item.id === activeItemId
                            return (
                              <MenuItem
                                key={item.id}
                                onClick={() => handleItemClick(item.path)}
                                selected={isItemActive}
                                sx={{
                                  py: 1.5,
                                  px: 2,
                                  mx: 1,
                                  borderRadius: 1,
                                  '&.Mui-selected': {
                                    bgcolor: alpha('#2196f3', 0.08),
                                    '&:hover': {
                                      bgcolor: alpha('#2196f3', 0.12),
                                    },
                                  },
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    color: isItemActive ? 'primary.main' : 'text.secondary',
                                    minWidth: 36,
                                  }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                  primary={item.label}
                                  primaryTypographyProps={{
                                    fontWeight: isItemActive ? 600 : 400,
                                    color: isItemActive ? 'primary.main' : 'text.primary',
                                  }}
                                />
                              </MenuItem>
                            )
                          })}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

/**
 * Breadcrumb component for showing current location
 */
export function NavigationBreadcrumb() {
  const location = useLocation()
  const { groupId, itemId } = getActiveNavigation(location.pathname)

  const group = navigationConfig.find((g) => g.id === groupId)
  const item = group?.items?.find((i) => i.id === itemId)

  if (!group) return null

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {group.icon}
        {group.label}
      </Typography>
      {item && (
        <>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>/</Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.primary', fontWeight: 500 }}>
            {item.icon}
            {item.label}
          </Typography>
        </>
      )}
    </Box>
  )
}
