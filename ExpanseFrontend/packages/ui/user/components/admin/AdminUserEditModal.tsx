"use client"

import React, { useState, useCallback } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  type Breakpoint,
} from "@mui/material"
import { Save, Cancel, Person } from "@mui/icons-material"
import { UserAvatar } from "../UserAvatar"
import { DisplayNameInput } from "../DisplayNameInput"
import { AdminUser } from "./AdminUserList"

export interface AdminUserEditModalProps {
  /** Whether the modal is open */
  open: boolean
  /** User data to edit (null for new user) */
  user: AdminUser | null
  /** Available roles */
  availableRoles?: string[]
  /** Close handler */
  onClose: () => void
  /** Save handler */
  onSave: (user: Partial<AdminUser>) => Promise<void>
  /** Loading state */
  isLoading?: boolean
  /** Error message */
  error?: string
  /** Mode: edit existing or create new */
  mode?: "edit" | "create"
  /** Allow avatar editing */
  allowAvatarEdit?: boolean
  /** Allow role editing */
  allowRoleEdit?: boolean
  /** Allow status editing */
  allowStatusEdit?: boolean
}

/**
 * AdminUserEditModal component for editing or creating users.
 * Provides form for modifying user details with validation.
 * 
 * Follows Expanse brand aesthetic with modal styling.
 */
export function AdminUserEditModal({
  open,
  user,
  availableRoles = ["User", "Admin", "Moderator", "Guest"],
  onClose,
  onSave,
  isLoading: externalLoading = false,
  error: externalError,
  mode = "edit",
  allowAvatarEdit = true,
  allowRoleEdit = true,
  allowStatusEdit = true,
}: AdminUserEditModalProps) {
  const theme = useTheme()
  
  // Form state
  const [displayName, setDisplayName] = useState(user?.displayName || "")
  const [email, setEmail] = useState(user?.email || "")
  const [role, setRole] = useState(user?.role || availableRoles[0])
  const [status, setStatus] = useState<AdminUser["status"]>(user?.status || "active")
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const isLoading = externalLoading || isSubmitting
  const error = externalError || submitError

  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      setDisplayName(user.displayName)
      setEmail(user.email)
      setRole(user.role)
      setStatus(user.status)
      setAvatarPreview(null)
    } else {
      setDisplayName("")
      setEmail("")
      setRole(availableRoles[0])
      setStatus("pending")
      setAvatarPreview(null)
    }
    setSubmitError(null)
  }, [user, availableRoles])

  // Validation
  const isValid = displayName.length >= 2 && email.includes("@")

  // Helper text for email field
  const getEmailHelperText = () => {
    if (email.length > 0 && !email.includes("@")) {
      return "Please enter a valid email address"
    }
    if (mode === "edit" && user) {
      return "Email cannot be changed after account creation"
    }
    return undefined
  }

  // Button text
  const getButtonText = () => {
    if (isLoading) return "Saving..."
    if (mode === "create") return "Create User"
    return "Save Changes"
  }

  // Handle avatar upload
  const handleAvatarUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  // Handle save
  const handleSave = async () => {
    if (!isValid) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const userData: Partial<AdminUser> = {
        displayName,
        email,
        role,
        status,
      }

      if (user?.id) {
        userData.id = user.id
      }

      if (avatarPreview) {
        userData.avatarSrc = avatarPreview
      }

      await onSave(userData)
      onClose()
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save user")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={"sm" as Breakpoint}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "7px",
        },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Person sx={{ color: theme.palette.primary.main }} />
          <Typography variant="h6">
            {mode === "create" ? "Create New User" : "Edit User"}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "7px" }}>
            {error}
          </Alert>
        )}

        {/* Avatar section */}
        {allowAvatarEdit && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: theme.palette.text.secondary }}
            >
              Profile Photo
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <UserAvatar
                src={avatarPreview || user?.avatarSrc}
                name={displayName}
                size="large"
                editable
                onUpload={handleAvatarUpload}
                variant="bordered"
              />
              <Typography
                variant="caption"
                sx={{ color: theme.palette.text.disabled }}
              >
                Click to upload a new photo
              </Typography>
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Display name */}
        <Box sx={{ mb: 3 }}>
          <DisplayNameInput
            value={displayName}
            onChange={setDisplayName}
            disabled={isLoading}
            showCharCount
            showValidIndicator
            label="Display Name"
          />
        </Box>

        {/* Email */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || (mode === "edit" && !!user)}
            size="small"
            error={email.length > 0 && !email.includes("@")}
            helperText={getEmailHelperText()}
          />
        </Box>

        {/* Role */}
        {allowRoleEdit && (
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Role</InputLabel>
              <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
                disabled={isLoading}
              >
                {availableRoles.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {/* Status */}
        {allowStatusEdit && (
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1, color: theme.palette.text.secondary }}
            >
              Account Status
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {(["active", "inactive", "pending"] as const).map((s) => (
                <Button
                  key={s}
                  variant={status === s ? "contained" : "outlined"}
                  size="small"
                  color={
                    s === "active" ? "success" : s === "inactive" ? "error" : "warning"
                  }
                  onClick={() => setStatus(s)}
                  disabled={isLoading}
                  sx={{ borderRadius: "7px", textTransform: "capitalize" }}
                >
                  {s}
                </Button>
              ))}
            </Box>
          </Box>
        )}

        {/* User metadata (for existing users) */}
        {mode === "edit" && user && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                p: 2,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                borderRadius: "7px",
              }}
            >
              <Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  User ID
                </Typography>
                <Typography variant="body2">{user.id}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Level
                </Typography>
                <Typography variant="body2">{user.level ?? "—"}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Created
                </Typography>
                <Typography variant="body2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  Last Login
                </Typography>
                <Typography variant="body2">
                  {user.lastLoginAt
                    ? new Date(user.lastLoginAt).toLocaleDateString()
                    : "Never"}
                </Typography>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          disabled={isLoading}
          startIcon={<Cancel />}
          sx={{ borderRadius: "7px" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isValid || isLoading}
          startIcon={
            isLoading ? <CircularProgress size={18} color="inherit" /> : <Save />
          }
          sx={{ borderRadius: "7px" }}
        >
          {getButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AdminUserEditModal
