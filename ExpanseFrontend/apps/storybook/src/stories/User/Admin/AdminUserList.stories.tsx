import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Box } from "@mui/material"
import {
  AdminUserList,
  AdminUser,
} from "../../../../../../packages/ui/user/components/admin/AdminUserList"
import { STATIC_ASSETS } from "expanse.staticAssets"

/**
 * AdminUserList component provides an admin interface for managing users
 * with sorting, filtering, pagination, and bulk actions.
 */
const meta: Meta<typeof AdminUserList> = {
  title: "User/Admin/AdminUserList",
  component: AdminUserList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive admin user management table with sorting, filtering, pagination, selection, and row actions.",
      },
    },
  },
  argTypes: {
    selectable: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: "100%", minHeight: 600 }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AdminUserList>

// =============================================================================
// Mock Data
// =============================================================================

const generateMockUsers = (count: number): AdminUser[] => {
  const roles = ["Student", "Teacher", "Admin"] as const
  const statuses = ["active", "inactive", "pending"] as const
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Edward",
    "Fiona",
    "George",
    "Hannah",
    "Ivan",
    "Julia",
  ]
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
  ]

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[i % firstNames.length]
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length]
    const daysAgo = Math.floor(Math.random() * 365)
    const createdDaysAgo = daysAgo + Math.floor(Math.random() * 365)

    return {
      id: `user-${i + 1}`,
      displayName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      avatarUrl:
        i % 3 === 0 ? STATIC_ASSETS.images.profileDarkerLines : undefined,
      createdAt: new Date(Date.now() - createdDaysAgo * 24 * 60 * 60 * 1000),
      lastLoginAt:
        statuses[i % statuses.length] === "pending"
          ? undefined
          : new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
    }
  })
}

const mockUsers = generateMockUsers(25)
const smallUserList = generateMockUsers(5)

// =============================================================================
// Handler Functions
// =============================================================================

const handlers = {
  onEdit: (user: AdminUser) => {
    alert(`Edit user: ${user.displayName}`)
  },
  onDelete: (user: AdminUser) => {
    alert(`Delete user: ${user.displayName}`)
  },
  onView: (user: AdminUser) => {
    alert(`View user: ${user.displayName}`)
  },
  onToggleStatus: (user: AdminUser) => {
    alert(`Toggle status for: ${user.displayName} (currently ${user.status})`)
  },
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Default user list with pagination
 */
export const Default: Story = {
  args: {
    users: mockUsers,
    ...handlers,
  },
}

/**
 * Small user list - no pagination needed
 */
export const SmallList: Story = {
  args: {
    users: smallUserList,
    ...handlers,
  },
}

/**
 * Selectable rows for bulk actions
 */
export const Selectable: Story = {
  args: {
    users: mockUsers,
    selectable: true,
    onBulkAction: (action: string, userIds: (string | number)[]) => {
      alert(`${action} selected users: ${userIds.join(", ")}`)
    },
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Enable row selection for bulk operations like delete or status change.",
      },
    },
  },
}

/**
 * Empty state - no users
 */
export const Empty: Story = {
  args: {
    users: [],
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Display when no users match the filter criteria.",
      },
    },
  },
}

/**
 * Only active users
 */
export const ActiveUsersOnly: Story = {
  args: {
    users: mockUsers.filter((u) => u.status === "active"),
    ...handlers,
  },
}

/**
 * Only pending users
 */
export const PendingUsersOnly: Story = {
  args: {
    users: mockUsers.filter((u) => u.status === "pending"),
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Users awaiting activation or approval.",
      },
    },
  },
}

/**
 * Teachers only
 */
export const TeachersOnly: Story = {
  args: {
    users: mockUsers.filter((u) => u.role === "Teacher"),
    ...handlers,
  },
}

/**
 * Interactive with state management
 */
export const Interactive: Story = {
  render: () => {
    const InteractiveList = () => {
      const [users, setUsers] = useState(mockUsers)

      const handleDelete = (user: AdminUser) => {
        if (window.confirm(`Delete ${user.displayName}?`)) {
          setUsers(users.filter((u) => u.id !== user.id))
        }
      }

      const handleToggleStatus = (user: AdminUser) => {
        setUsers(
          users.map((u) =>
            u.id === user.id
              ? { ...u, status: u.status === "active" ? "inactive" : "active" }
              : u
          ) as AdminUser[]
        )
      }

      const handleBulkAction = (action: string, userIds: (string | number)[]) => {
        if (action === "delete") {
          if (window.confirm(`Delete ${userIds.length} users?`)) {
            setUsers(users.filter((u) => !userIds.includes(u.id)))
          }
        } else if (action === "deactivate") {
          setUsers(
            users.map((u) =>
              userIds.includes(u.id) ? { ...u, status: "inactive" } : u
            ) as AdminUser[]
          )
        }
      }

      return (
        <AdminUserList
          users={users}
          selectable
          onEdit={(user) => alert(`Edit: ${user.displayName}`)}
          onDelete={handleDelete}
          onView={(user) => alert(`View: ${user.displayName}`)}
          onToggleStatus={handleToggleStatus}
          onBulkAction={handleBulkAction}
        />
      )
    }
    return <InteractiveList />
  },
  parameters: {
    docs: {
      description: {
        story:
          "Fully interactive example with working delete, status toggle, and bulk actions.",
      },
    },
  },
}

/**
 * Without view action
 */
export const WithoutViewAction: Story = {
  args: {
    users: smallUserList,
    onEdit: handlers.onEdit,
    onDelete: handlers.onDelete,
    onToggleStatus: handlers.onToggleStatus,
    // No onView - hides view option
  },
}

/**
 * Read-only list
 */
export const ReadOnly: Story = {
  args: {
    users: mockUsers,
    onView: handlers.onView,
    // No edit, delete, or toggle handlers
  },
  parameters: {
    docs: {
      description: {
        story: "Read-only view with only the view action available.",
      },
    },
  },
}

/**
 * Custom page size
 */
export const CustomPageSize: Story = {
  args: {
    users: mockUsers,
    defaultRowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15],
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Custom pagination with 5 rows per page default.",
      },
    },
  },
}

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    users: [],
    isLoading: true,
    ...handlers,
  },
  parameters: {
    docs: {
      description: {
        story: "Loading indicator while fetching users.",
      },
    },
  },
}
