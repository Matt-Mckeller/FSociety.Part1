"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
  Snackbar,
} from "@mui/material"
import { Save, Cancel, CheckCircle } from "@mui/icons-material"
import { UserAvatar } from "./UserAvatar"
import { DisplayNameInput } from "./DisplayNameInput"
import { SettingsSection } from "./SettingsSection"
import { ProfileCompleteness, ProfileCompletenessItem } from "./ProfileCompleteness"

export interface UserProfileData {
  displayName: string
  avatarSrc?: string | null
  email?: string
}

export interface EditProfileFormProps {
  /** Initial user data */
  initialData: UserProfileData
  /** Save handler - returns promise for async operations */
  onSave: (data: Partial<UserProfileData>) => Promise<void>
  /** Cancel handler */
  onCancel?: () => void
  /** Loading state from parent */
  isLoading?: boolean
  /** External error message */
  error?: string
  /** Show avatar upload section */
  showAvatarUpload?: boolean
  /** Show profile completeness */
  showCompleteness?: boolean
  /** Profile completeness items */
  completenessItems?: ProfileCompletenessItem[]
  /** Layout variant */
  variant?: "inline" | "card"
  /** Show success message after save */
  showSuccessMessage?: boolean
}

/**
 * EditProfileForm component for editing user profile information.
 * Includes avatar upload, display name editing, and validation.
 * 
 * Supports async save operations with loading and error states.
 * Follows Expanse brand aesthetic with consistent styling.
 */
export function EditProfileForm({
  initialData,
  onSave,
  onCancel,
  isLoading: externalLoading = false,
  error: externalError,
  showAvatarUpload = true,
  showCompleteness = true,
  completenessItems,
  variant = "inline",
  showSuccessMessage = true,
}: EditProfileFormProps) {
  const theme = useTheme()
  const [displayName, setDisplayName] = useState(initialData.displayName)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const isLoading = externalLoading || isSubmitting
  const error = externalError || submitError

  // Track changes
  useEffect(() => {
    const nameChanged = displayName !== initialData.displayName
    const avatarChanged = avatarFile !== null
    setHasChanges(nameChanged || avatarChanged)
  }, [displayName, avatarFile, initialData.displayName])

  // Validate form
  const isValid = displayName.length >= 2 && displayName.length <= 50

  // Handle avatar upload
  const handleAvatarUpload = useCallback((file: File) => {
    setAvatarFile(file)
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!isValid || !hasChanges) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const updates: Partial<UserProfileData> = {}
      
      if (displayName !== initialData.displayName) {
        updates.displayName = displayName
      }
      
      if (avatarPreview) {
        updates.avatarSrc = avatarPreview
      }

      await onSave(updates)
      setShowSuccess(true)
      setHasChanges(false)
      setAvatarFile(null)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Failed to save profile")
    } finally {
      setIsSubmitting(false)
    }
  }, [isValid, hasChanges, displayName, avatarPreview, initialData.displayName, onSave])

  // Handle cancel
  const handleCancel = useCallback(() => {
    setDisplayName(initialData.displayName)
    setAvatarFile(null)
    setAvatarPreview(null)
    setSubmitError(null)
    onCancel?.()
  }, [initialData.displayName, onCancel])

  // Dynamic completeness items
  const dynamicCompletenessItems: ProfileCompletenessItem[] = completenessItems || [
    {
      id: "display-name",
      label: "Set display name",
      completed: displayName.length >= 2,
      points: 1,
    },
    {
      id: "avatar",
      label: "Upload profile photo",
      completed: !!(avatarPreview || initialData.avatarSrc),
      points: 2,
    },
    {
      id: "email",
      label: "Verify email address",
      completed: !!initialData.email,
      points: 1,
    },
  ]

  return (
    <Box>
      {/* Error alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "7px" }}>
          {error}
        </Alert>
      )}

      {/* Avatar section */}
      {showAvatarUpload && (
        <SettingsSection
          title="Profile Photo"
          description="Upload a photo to personalize your profile"
          variant="filled"
          showDivider={false}
          sx={{ mb: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mt: 2,
            }}
          >
            <UserAvatar
              src={avatarPreview || initialData.avatarSrc}
              name={displayName}
              size="xlarge"
              editable
              onUpload={handleAvatarUpload}
              isLoading={isLoading}
              variant="expanding"
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                Click on the avatar to upload a new photo.
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.disabled }}>
                Supported formats: JPG, PNG, GIF. Max size: 5MB.
              </Typography>
              {avatarFile && (
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.success.main, display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <CheckCircle sx={{ fontSize: 16 }} />
                    New photo selected: {avatarFile.name}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </SettingsSection>
      )}

      {/* Display name section */}
      <SettingsSection
        title="Display Name"
        description="This is how your name will appear to others"
        variant="filled"
        showDivider={false}
        sx={{ mb: 3 }}
      >
        <Box sx={{ mt: 2, maxWidth: 400 }}>
          <DisplayNameInput
            value={displayName}
            onChange={setDisplayName}
            disabled={isLoading}
            showCharCount
            showValidIndicator
          />
        </Box>
      </SettingsSection>

      {/* Profile completeness */}
      {showCompleteness && (
        <SettingsSection
          title="Profile Progress"
          description="Complete your profile to unlock all features"
          variant="outlined"
          showDivider={false}
          sx={{ mb: 3 }}
        >
          <Box sx={{ mt: 2 }}>
            <ProfileCompleteness
              items={dynamicCompletenessItems}
              variant="detailed"
              showChecklist
              size="medium"
              showAchievement
            />
          </Box>
        </SettingsSection>
      )}

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "flex-start",
          pt: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <Save />}
          onClick={handleSubmit}
          disabled={!isValid || !hasChanges || isLoading}
          sx={{ borderRadius: "7px", minWidth: 120 }}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={handleCancel}
          disabled={isLoading}
          sx={{ borderRadius: "7px" }}
        >
          Cancel
        </Button>
      </Box>

      {/* Success snackbar */}
      {showSuccessMessage && (
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          message="Profile updated successfully!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      )}
    </Box>
  )
}

export default EditProfileForm
