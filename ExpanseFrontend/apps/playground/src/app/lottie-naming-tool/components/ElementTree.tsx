"use client"

/**
 * Element Tree Component
 * Displays the hierarchical structure of Lottie animation elements
 */

import { useState } from "react"
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Chip,
  Stack,
  Tooltip,
  Button,
  ButtonGroup,
} from "@mui/material"
import {
  ExpandMore,
  ChevronRight,
  Edit,
  Check,
  Close,
  Circle,
  UnfoldMore,
  UnfoldLess,
} from "@mui/icons-material"
import { ComponentNode } from "../types/types"
import { getComponentTypeLabel } from "../utils/lottieParser"
import ColorBadge from "./ColorBadge"
import MetadataBadges from "./MetadataBadges"

interface ElementTreeProps {
  tree: ComponentNode[]
  expandedPaths: Set<string>
  selectedPath?: string
  onExpand: (path: string) => void
  onSelect: (path: string) => void
  onNameChange: (path: string, newName: string) => void
  onApprove: (path: string) => void
  onExpandAll?: () => void
  onCollapseAll?: () => void
  onExpandNamed?: () => void
}

export default function ElementTree({
  tree,
  expandedPaths,
  selectedPath,
  onExpand,
  onSelect,
  onNameChange,
  onApprove,
  onExpandAll,
  onCollapseAll,
  onExpandNamed,
}: ElementTreeProps) {
  const [editingPath, setEditingPath] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")

  // Count named elements
  const countNamedElements = (nodes: ComponentNode[]): number => {
    let count = 0
    const walk = (items: ComponentNode[]) => {
      items.forEach((node) => {
        if (node.suggestedName) count++
        if (node.children.length > 0) walk(node.children)
      })
    }
    walk(nodes)
    return count
  }

  // Count total elements
  const countTotalElements = (nodes: ComponentNode[]): number => {
    let count = 0
    const walk = (items: ComponentNode[]) => {
      items.forEach((node) => {
        count++
        if (node.children.length > 0) walk(node.children)
      })
    }
    walk(nodes)
    return count
  }

  const namedCount = countNamedElements(tree)
  const totalCount = countTotalElements(tree)

  const handleEditStart = (node: ComponentNode) => {
    setEditingPath(node.path)
    setEditValue(node.suggestedName || node.currentName || "")
  }

  const handleEditSave = (path: string) => {
    if (editValue.trim()) {
      onNameChange(path, editValue.trim())
    }
    setEditingPath(null)
  }

  const handleEditCancel = () => {
    setEditingPath(null)
    setEditValue("")
  }

  const renderNode = (node: ComponentNode, depth: number = 0) => {
    const isExpanded = expandedPaths.has(node.path)
    const isSelected = selectedPath === node.path
    const isEditing = editingPath === node.path
    const hasChildren = node.children.length > 0

    const displayName = node.suggestedName || node.currentName || "<unnamed>"
    const nameColor = node.suggestedName
      ? node.approved
        ? "success.main"
        : "warning.main"
      : node.currentName
        ? "text.primary"
        : "text.disabled"

    return (
      <Box key={node.path}>
        {/* Node Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            pl: depth * 2,
            py: 0.5,
            bgcolor: isSelected ? "action.selected" : "transparent",
            "&:hover": { bgcolor: "action.hover" },
            cursor: "pointer",
          }}
          onClick={() => onSelect(node.path)}
        >
          {/* Main Row */}
          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            {/* Expand/Collapse Icon */}
            {hasChildren ? (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation()
                  onExpand(node.path)
                }}
                sx={{ p: 0.5 }}
              >
                {isExpanded ? (
                  <ExpandMore fontSize="small" />
                ) : (
                  <ChevronRight fontSize="small" />
                )}
              </IconButton>
            ) : (
              <Box sx={{ width: 28 }} />
            )}

            {/* Themeable Indicator */}
            {node.isThemeable && (
              <Tooltip title="Themeable element">
                <Circle sx={{ fontSize: 8, color: "primary.main", mr: 1 }} />
              </Tooltip>
            )}

            {/* Name Field */}
            {isEditing ? (
              <TextField
                size="small"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSave(node.path)
                  if (e.key === "Escape") handleEditCancel()
                }}
                onClick={(e) => e.stopPropagation()}
                autoFocus
                sx={{ flex: 1, mr: 1 }}
              />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  flex: 1,
                  color: nameColor,
                  fontWeight: node.suggestedName ? 600 : 400,
                  fontStyle:
                    !node.currentName && !node.suggestedName
                      ? "italic"
                      : "normal",
                }}
              >
                {displayName}
              </Typography>
            )}

            {/* Type Badge */}
            <Chip
              label={node.type}
              size="small"
              variant="outlined"
              sx={{ fontSize: "0.7rem", height: 20, mr: 1 }}
            />

            {/* Action Buttons */}
            {isEditing ? (
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditSave(node.path)
                  }}
                  color="primary"
                >
                  <Check fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditCancel()
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row" spacing={0.5}>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEditStart(node)
                  }}
                >
                  <Edit fontSize="small" />
                </IconButton>
                {node.suggestedName && !node.approved && (
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      onApprove(node.path)
                    }}
                    color="success"
                  >
                    <Check fontSize="small" />
                  </IconButton>
                )}
              </Stack>
            )}
          </Box>

          {/* Metadata Row - Color and Role/Level Badges */}
          {(node.originalColor ||
            node.roleFunction ||
            node.visualLevel ||
            node.semanticRole) && (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                ml: hasChildren ? 4 : 3.5,
                mt: 0.5,
                flexWrap: "wrap",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ColorBadge originalColor={node.originalColor} size="small" />
              <MetadataBadges
                roleFunction={node.roleFunction}
                visualLevel={node.visualLevel}
                semanticRole={node.semanticRole}
                size="small"
              />
            </Box>
          )}
        </Box>

        {/* Children */}
        {isExpanded && hasChildren && (
          <Box>
            {node.children.map((child) => renderNode(child, depth + 1))}
          </Box>
        )}
      </Box>
    )
  }

  if (tree.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="body2" color="text.secondary">
          No elements found
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header with controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">Element Tree</Typography>
          <Chip
            label={`${namedCount} named`}
            size="small"
            color={namedCount > 0 ? "success" : "default"}
            variant="outlined"
          />
          <Chip label={`${totalCount} total`} size="small" variant="outlined" />
        </Box>

        {/* Expansion controls */}
        <ButtonGroup size="small" variant="outlined">
          {onExpandNamed && namedCount > 0 && (
            <Tooltip title="Expand all AI-named elements">
              <Button onClick={onExpandNamed} startIcon={<UnfoldMore />}>
                Named
              </Button>
            </Tooltip>
          )}
          {onCollapseAll && (
            <Tooltip title="Collapse all">
              <Button onClick={onCollapseAll} startIcon={<UnfoldLess />}>
                Collapse
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          border: 1,
          borderColor: "divider",
          borderRadius: 1,
          p: 1,
        }}
      >
        {tree.map((node) => renderNode(node, 0))}
      </Box>
    </Box>
  )
}
