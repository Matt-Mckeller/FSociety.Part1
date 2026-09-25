"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  Alert,
} from "@mui/material"
import {
  Person,
  Security,
  Notifications,
  Palette,
  Warning,
  Delete,
} from "@mui/icons-material"
import { SettingsSection, SettingsSectionGroup } from "./SettingsSection"
import { EditProfileForm, UserProfileData } from "./EditProfileForm"
import { ProfileCompletenessItem } from "./ProfileCompleteness"

export interface AccountSettingsProps {
  /** User profile data */
  userData: UserProfileData
  /** Save profile handler */
  onSaveProfile: (data: Partial<UserProfileData>) => Promise<void>
  /** Password change handler */
  onChangePassword?: () => void
  /** Account deletion handler */
  onDeleteAccount?: () => Promise<void>
  /** Loading state */
  isLoading?: boolean
  /** Error message */
  error?: string
  /** Show profile section */
  showProfileSection?: boolean
  /** Show security section */
  showSecuritySection?: boolean
  /** Show preferences section */
  showPreferencesSection?: boolean
  /** Show danger zone */
  showDangerZone?: boolean
  /** Custom tabs/sections */
  customSections?: Array<{
    id: string
    label: string
    icon: React.ReactNode
    content: React.ReactNode
  }>
  /** Layout variant */
  variant?: "tabs" | "sections"
  /** Profile completeness items */
  completenessItems?: ProfileCompletenessItem[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      sx={{ pt: 3 }}
    >
      {value === index && children}
    </Box>
  )
}

/**
 * AccountSettings component - Full page layout for account settings.
 * Organizes settings into logical sections with tab or section navigation.
 * 
 * Includes profile editing, security settings, preferences, and danger zone.
 * Follows Expanse brand aesthetic with geometric styling.
 */
export function AccountSettings({
  userData,
  onSaveProfile,
  onChangePassword,
  onDeleteAccount,
  isLoading = false,
  error,
  showProfileSection = true,
  showSecuritySection = true,
  showPreferencesSection = false,
  showDangerZone = true,
  customSections,
  variant = "sections",
  completenessItems,
}: AccountSettingsProps) {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(0)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleDeleteAccount = async () => {
    if (!onDeleteAccount) return

    setIsDeleting(true)
    setDeleteError(null)

    try {
      await onDeleteAccount()
      setDeleteDialogOpen(false)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete account")
    } finally {
      setIsDeleting(false)
    }
  }

  // Build sections array
  const sections: Array<{ id: string; label: string; icon: React.ReactNode }> = []
  if (showProfileSection) sections.push({ id: "profile", label: "Profile", icon: <Person /> })
  if (showSecuritySection) sections.push({ id: "security", label: "Security", icon: <Security /> })
  if (showPreferencesSection) sections.push({ id: "preferences", label: "Preferences", icon: <Palette /> })
  if (customSections) {
    customSections.forEach((section) => {
      sections.push({ id: section.id, label: section.label, icon: section.icon })
    })
  }
  if (showDangerZone) sections.push({ id: "danger", label: "Account", icon: <Warning /> })

  // Profile Section Content
  const ProfileSectionContent = () => (
    <EditProfileForm
      initialData={userData}
      onSave={onSaveProfile}
      isLoading={isLoading}
      error={error}
      showAvatarUpload
      showCompleteness
      completenessItems={completenessItems}
    />
  )

  // Security Section Content
  const SecuritySectionContent = () => (
    <Box>
      <SettingsSection
        title="Password"
        description="Change your account password"
        variant="filled"
        showDivider={false}
        sx={{ mb: 3 }}
      >
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            We recommend using a strong password that you don&apos;t use elsewhere.
          </Typography>
          <Button
            variant="outlined"
            onClick={onChangePassword}
            sx={{ borderRadius: "7px" }}
          >
            Change Password
          </Button>
        </Box>
      </SettingsSection>

      <SettingsSection
        title="Active Sessions"
        description="Manage devices where you're logged in"
        variant="filled"
        showDivider={false}
        sx={{ mb: 3 }}
      >
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ borderRadius: "7px" }}>
            Session management coming soon
          </Alert>
        </Box>
      </SettingsSection>
    </Box>
  )

  // Preferences Section Content (placeholder)
  const PreferencesSectionContent = () => (
    <Box>
      <SettingsSection
        title="Theme"
        description="Choose your preferred theme"
        variant="filled"
        showDivider={false}
        sx={{ mb: 3 }}
        icon={Palette}
      >
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ borderRadius: "7px" }}>
            Theme preferences coming soon
          </Alert>
        </Box>
      </SettingsSection>

      <SettingsSection
        title="Notifications"
        description="Configure notification preferences"
        variant="filled"
        showDivider={false}
        sx={{ mb: 3 }}
        icon={Notifications}
      >
        <Box sx={{ mt: 2 }}>
          <Alert severity="info" sx={{ borderRadius: "7px" }}>
            Notification preferences coming soon
          </Alert>
        </Box>
      </SettingsSection>
    </Box>
  )

  // Danger Zone Content
  const DangerZoneContent = () => (
    <SettingsSection
      title="Delete Account"
      description="Permanently delete your account and all associated data"
      variant="outlined"
      showDivider={false}
      sx={{
        borderColor: theme.palette.error.main,
        "& .MuiTypography-h6": {
          color: theme.palette.error.main,
        },
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Alert severity="warning" sx={{ mb: 2, borderRadius: "7px" }}>
          This action cannot be undone. All your data will be permanently deleted.
        </Alert>
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          onClick={() => setDeleteDialogOpen(true)}
          sx={{ borderRadius: "7px" }}
        >
          Delete Account
        </Button>
      </Box>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Delete Account?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action is permanent
            and cannot be undone. All your data, including profile information,
            settings, and history will be permanently removed.
          </DialogContentText>
          {deleteError && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: "7px" }}>
              {deleteError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={isDeleting}
            sx={{ borderRadius: "7px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={isDeleting}
            sx={{ borderRadius: "7px" }}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </SettingsSection>
  )

  // Tabs variant
  if (variant === "tabs") {
    return (
      <Paper
        elevation={1}
        sx={{
          borderRadius: "7px",
          overflow: "hidden",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Account settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            {sections.map((section, index) => (
              <Tab
                key={section.id}
                icon={section.icon as React.ReactElement}
                iconPosition="start"
                label={section.label}
                id={`settings-tab-${index}`}
                aria-controls={`settings-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          {showProfileSection && (
            <TabPanel value={activeTab} index={sections.findIndex((s) => s.id === "profile")}>
              <ProfileSectionContent />
            </TabPanel>
          )}
          {showSecuritySection && (
            <TabPanel value={activeTab} index={sections.findIndex((s) => s.id === "security")}>
              <SecuritySectionContent />
            </TabPanel>
          )}
          {showPreferencesSection && (
            <TabPanel value={activeTab} index={sections.findIndex((s) => s.id === "preferences")}>
              <PreferencesSectionContent />
            </TabPanel>
          )}
          {customSections?.map((section) => (
            <TabPanel
              key={section.id}
              value={activeTab}
              index={sections.findIndex((s) => s.id === section.id)}
            >
              {section.content}
            </TabPanel>
          ))}
          {showDangerZone && (
            <TabPanel value={activeTab} index={sections.findIndex((s) => s.id === "danger")}>
              <DangerZoneContent />
            </TabPanel>
          )}
        </Box>
      </Paper>
    )
  }

  // Sections variant (default)
  return (
    <Box>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          Account Settings
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: theme.palette.text.secondary }}
        >
          Manage your account settings and preferences
        </Typography>
      </Box>

      {/* Profile Section */}
      {showProfileSection && (
        <SettingsSectionGroup title="Profile" variant="card">
          <ProfileSectionContent />
        </SettingsSectionGroup>
      )}

      {/* Security Section */}
      {showSecuritySection && (
        <Box sx={{ mt: 4 }}>
          <SettingsSectionGroup title="Security" variant="card">
            <SecuritySectionContent />
          </SettingsSectionGroup>
        </Box>
      )}

      {/* Preferences Section */}
      {showPreferencesSection && (
        <Box sx={{ mt: 4 }}>
          <SettingsSectionGroup title="Preferences" variant="card">
            <PreferencesSectionContent />
          </SettingsSectionGroup>
        </Box>
      )}

      {/* Custom Sections */}
      {customSections?.map((section) => (
        <Box key={section.id} sx={{ mt: 4 }}>
          <SettingsSectionGroup title={section.label} variant="card">
            {section.content}
          </SettingsSectionGroup>
        </Box>
      ))}

      {/* Danger Zone */}
      {showDangerZone && (
        <Box sx={{ mt: 4 }}>
          <SettingsSectionGroup title="Danger Zone" variant="card">
            <DangerZoneContent />
          </SettingsSectionGroup>
        </Box>
      )}
    </Box>
  )
}

export default AccountSettings
