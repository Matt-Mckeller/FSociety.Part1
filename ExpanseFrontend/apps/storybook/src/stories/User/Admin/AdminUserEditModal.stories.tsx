import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Box, Button, Stack } from "@mui/material"
import { AdminUserEditModal } from "../../../../../../packages/ui/user/components/admin/AdminUserEditModal"
import { AdminUser } from "../../../../../../packages/ui/user/components/admin/AdminUserList"
import { STATIC_ASSETS } from "expanse.staticAssets"

/**
 * AdminUserEditModal provides a modal dialog for creating or editing users
 * with role selection, status management, and avatar editing.
 */
const meta: Meta<typeof AdminUserEditModal> = {
  title: "User/Admin/AdminUserEditModal",
  component: AdminUserEditModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A modal dialog for admin user management with support for creating new users or editing existing ones.",
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["edit", "create"],
    },
    open: { control: "boolean" },
    allowRoleEdit: { control: "boolean" },
    allowStatusEdit: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof AdminUserEditModal>

// =============================================================================
// Mock Data
// =============================================================================

const mockUser: AdminUser = {
  id: "user-1",
  displayName: "Jane Doe",
  email: "jane.doe@example.com",
  role: "Teacher",
  status: "active",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
  createdAt: new Date("2023-01-15"),
  lastLoginAt: new Date("2024-01-10"),
}

const inactiveUser: AdminUser = {
  id: "user-2",
  displayName: "Bob Smith",
  email: "bob.smith@example.com",
  role: "Student",
  status: "inactive",
  avatarSrc: undefined,
  createdAt: new Date("2023-06-20"),
  lastLoginAt: new Date("2023-12-01"),
}

const pendingUser: AdminUser = {
  id: "user-3",
  displayName: "New User",
  email: "new.user@example.com",
  role: "Student",
  status: "pending",
  avatarSrc: undefined,
  createdAt: new Date(),
  lastLoginAt: undefined,
}

const adminUser: AdminUser = {
  id: "user-4",
  displayName: "Admin User",
  email: "admin@example.com",
  role: "Admin",
  status: "active",
  avatarSrc: STATIC_ASSETS.images.profileDarkerLines,
  createdAt: new Date("2021-03-01"),
  lastLoginAt: new Date("2024-01-11"),
}

const availableRoles = ["Student", "Teacher", "Admin"]

// =============================================================================
// Interactive Wrapper
// =============================================================================

interface ModalWrapperProps {
  user?: AdminUser | null
  mode: "edit" | "create"
  allowRoleEdit?: boolean
  allowStatusEdit?: boolean
}

const ModalWrapper = ({
  user = null,
  mode,
  allowRoleEdit = true,
  allowStatusEdit = true,
}: ModalWrapperProps) => {
  const [open, setOpen] = useState(true)

  return (
    <Box>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {mode === "create" ? "Create User" : "Edit User"}
      </Button>
      <AdminUserEditModal
        open={open}
        user={user}
        mode={mode}
        availableRoles={availableRoles}
        allowRoleEdit={allowRoleEdit}
        allowStatusEdit={allowStatusEdit}
        onSave={async (data) => {
          console.log("Saving:", data)
          await new Promise((resolve) => setTimeout(resolve, 1000))
          alert(`Saved user: ${data.displayName}`)
          setOpen(false)
        }}
        onClose={() => setOpen(false)}
      />
    </Box>
  )
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Edit mode with existing user
 */
export const EditMode: Story = {
  render: () => <ModalWrapper user={mockUser} mode="edit" />,
}

/**
 * Create mode for new user
 */
export const CreateMode: Story = {
  render: () => <ModalWrapper mode="create" />,
}

/**
 * Edit inactive user
 */
export const EditInactiveUser: Story = {
  render: () => <ModalWrapper user={inactiveUser} mode="edit" />,
  parameters: {
    docs: {
      description: {
        story: "Editing a user with inactive status.",
      },
    },
  },
}

/**
 * Edit pending user
 */
export const EditPendingUser: Story = {
  render: () => <ModalWrapper user={pendingUser} mode="edit" />,
  parameters: {
    docs: {
      description: {
        story: "Editing a user awaiting activation.",
      },
    },
  },
}

/**
 * Edit admin user
 */
export const EditAdminUser: Story = {
  render: () => <ModalWrapper user={adminUser} mode="edit" />,
}

/**
 * Without role editing
 */
export const WithoutRoleEdit: Story = {
  render: () => <ModalWrapper user={mockUser} mode="edit" allowRoleEdit={false} />,
  parameters: {
    docs: {
      description: {
        story: "Role field is disabled (e.g., when user doesn't have permission).",
      },
    },
  },
}

/**
 * Without status editing
 */
export const WithoutStatusEdit: Story = {
  render: () => <ModalWrapper user={mockUser} mode="edit" allowStatusEdit={false} />,
  parameters: {
    docs: {
      description: {
        story: "Status buttons are hidden.",
      },
    },
  },
}

/**
 * Minimal permissions
 */
export const MinimalPermissions: Story = {
  render: () => (
    <ModalWrapper
      user={mockUser}
      mode="edit"
      allowRoleEdit={false}
      allowStatusEdit={false}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Edit with minimal permissions - only display name and avatar can be changed.",
      },
    },
  },
}

/**
 * All user states comparison
 */
export const AllUserStates: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
    const [mode, setMode] = useState<"edit" | "create">("create")
    const [open, setOpen] = useState(false)

    const openModal = (user: AdminUser | null, editMode: "edit" | "create") => {
      setSelectedUser(user)
      setMode(editMode)
      setOpen(true)
    }

    return (
      <Box>
        <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
          <Button variant="contained" onClick={() => openModal(null, "create")}>
            Create New
          </Button>
          <Button variant="outlined" onClick={() => openModal(mockUser, "edit")}>
            Edit Active
          </Button>
          <Button variant="outlined" onClick={() => openModal(inactiveUser, "edit")}>
            Edit Inactive
          </Button>
          <Button variant="outlined" onClick={() => openModal(pendingUser, "edit")}>
            Edit Pending
          </Button>
          <Button variant="outlined" onClick={() => openModal(adminUser, "edit")}>
            Edit Admin
          </Button>
        </Stack>
        <AdminUserEditModal
          open={open}
          user={selectedUser}
          mode={mode}
          availableRoles={availableRoles}
          onSave={async (data) => {
            console.log("Saved:", data)
            await new Promise((resolve) => setTimeout(resolve, 500))
            setOpen(false)
          }}
          onClose={() => setOpen(false)}
        />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo showing all user states and create mode.",
      },
    },
  },
}

/**
 * Form validation
 */
export const ValidationDemo: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <AdminUserEditModal
          open={open}
          user={null}
          mode="create"
          availableRoles={availableRoles}
          onSave={async (data) => {
            // Simulate validation
            if (!data.displayName || data.displayName.length < 2) {
              throw new Error("Display name must be at least 2 characters")
            }
            if (!data.email || !data.email.includes("@")) {
              throw new Error("Valid email is required")
            }
            await new Promise((resolve) => setTimeout(resolve, 500))
            alert("User created successfully!")
            setOpen(false)
          }}
          onClose={() => setOpen(false)}
        />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates form validation behavior.",
      },
    },
  },
}

/**
 * User with long data
 */
export const LongUserData: Story = {
  render: () => (
    <ModalWrapper
      user={{
        ...mockUser,
        displayName: "Alexandria Bartholomew Constantine the Third",
        email: "alexandria.bartholomew.constantine@verylongdomainname.example.com",
      }}
      mode="edit"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Tests layout with very long user data.",
      },
    },
  },
}

/**
 * Custom roles list
 */
export const CustomRoles: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <Box>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <AdminUserEditModal
          open={open}
          user={mockUser}
          mode="edit"
          availableRoles={["Student", "Premium Student", "Teacher", "Lead Teacher", "Admin", "Super Admin"]}
          onSave={async (data) => {
            console.log("Saved:", data)
            setOpen(false)
          }}
          onClose={() => setOpen(false)}
        />
      </Box>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Modal with extended role options.",
      },
    },
  },
}
