"use client";

import * as React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { TileContainer } from "@expanse/hud";
import { LoginScreen } from "./login/LoginScreen";
import { RlPersonalBar } from "./rl/RlPersonalBar";

import {
  encryptPermissions,
  decryptPermissions,
  hasStoredPermissions,
  clearStoredPermissions,
} from "./utils/crypto";
import { notifyAiPermissionsChanged } from "./hooks/useAiPermissionsDisplay";
import {
  PRESET_AI_PERMISSIONS,
  PERMISSION_LEVEL_COLORS,
  PERMISSION_LEVEL_INK,
  PERMISSION_LEVEL_LABELS,
  categoryMatches,
  displayCategoryLabel,
  displaySectionLabel,
  getCategoryOrder,
  getSections,
  sectionMatches,
  type AiPermission,
  type AiPermissionsData,
  type PermissionLevel,
} from "./model/ai-permissions";
import {
  PermissionCategoryIcon,
  PermissionLevelIcon,
  PermissionSectionIcon,
} from "./model/ai-permission-icons";

const ENV_PASSPHRASE = process.env.NEXT_PUBLIC_AI_PERMISSIONS_PASSPHRASE ?? "";

// ── Inline rename field ──────────────────────────────────────────────────────

function InlineRename({
  value,
  onCommit,
  onCancel,
  placeholder,
}: {
  value: string;
  onCommit: (v: string) => void;
  onCancel: () => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState(value);
  return (
    <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
      <TextField
        autoFocus
        size="small"
        variant="standard"
        value={draft}
        placeholder={placeholder}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && draft.trim()) onCommit(draft.trim());
          if (e.key === "Escape") onCancel();
        }}
        sx={{ minWidth: 120 }}
      />
      <IconButton size="small" disabled={!draft.trim()} onClick={() => onCommit(draft.trim())}>
        <CheckRoundedIcon sx={{ fontSize: 14 }} />
      </IconButton>
      <IconButton size="small" onClick={onCancel}>
        <CloseRoundedIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Stack>
  );
}

// ── Permission row ───────────────────────────────────────────────────────────

function PermissionRow({
  permission,
  onChange,
  onDelete,
}: {
  permission: AiPermission;
  onChange: (updated: AiPermission) => void;
  onDelete: () => void;
}) {
  const [editingLabel, setEditingLabel] = React.useState(false);
  const [editingDesc, setEditingDesc] = React.useState(false);
  const color = permission.level !== undefined ? PERMISSION_LEVEL_COLORS[permission.level] : "#64748b";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.25,
        px: 1.25,
        py: 0.875,
        borderRadius: 1.5,
        border: "1px solid",
        borderColor: alpha(color, 0.28),
        borderLeft: `3px solid ${color}`,
        bgcolor: alpha(color, 0.07),
        transition: "border-color 0.15s, background 0.15s",
      }}
    >
      <Box
        sx={{
          mt: 0.2,
          color,
          opacity: 0.9,
          display: "flex",
          flexShrink: 0,
        }}
      >
        <PermissionSectionIcon section={permission.section} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        {editingLabel ? (
          <TextField
            autoFocus
            size="small"
            variant="standard"
            value={permission.label}
            onChange={(e) => onChange({ ...permission, label: e.target.value })}
            onBlur={() => setEditingLabel(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingLabel(false)}
            slotProps={{ input: { style: { fontWeight: 700, fontSize: "0.875rem" } } }}
            sx={{ width: "100%" }}
          />
        ) : (
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, lineHeight: 1.3, cursor: "text" }}
            onClick={() => setEditingLabel(true)}
          >
            {permission.label || <span style={{ opacity: 0.35 }}>Label…</span>}
          </Typography>
        )}

        {editingDesc ? (
          <TextField
            autoFocus
            size="small"
            variant="standard"
            value={permission.description}
            onChange={(e) => onChange({ ...permission, description: e.target.value })}
            onBlur={() => setEditingDesc(false)}
            onKeyDown={(e) => e.key === "Enter" && setEditingDesc(false)}
            slotProps={{ input: { style: { fontSize: "0.75rem" } } }}
            sx={{ width: "100%", mt: 0.25 }}
          />
        ) : (
          <Typography
            variant="caption"
            sx={{ color: "text.primary", opacity: 0.72, lineHeight: 1.3, cursor: "text", display: "block" }}
            onClick={() => setEditingDesc(true)}
          >
            {permission.description || <span style={{ opacity: 0.35 }}>Description…</span>}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.5, flexShrink: 0 }}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={permission.level ?? null}
          onChange={(_, v: PermissionLevel | null) =>
            v !== null && onChange({ ...permission, level: v })
          }
          sx={{
            gap: 0.35,
            "& .MuiToggleButtonGroup-grouped": {
              border: "1px solid !important",
              borderRadius: "8px !important",
              mx: 0,
            },
            "& .MuiToggleButton-root": {
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.65rem",
              px: 0.75,
              py: 0.35,
              lineHeight: 1.2,
              minWidth: 52,
              gap: 0.35,
              borderColor: "divider",
              color: "text.secondary",
              bgcolor: "transparent",
              boxShadow: "none",
              "&.Mui-selected": {
                boxShadow: "none",
              },
              "&.Mui-selected:hover": {
                boxShadow: "none",
                filter: "brightness(1.06)",
              },
              "&:hover": {
                boxShadow: "none",
              },
              "&:focus-visible": {
                outline: `2px solid ${color}`,
                outlineOffset: 2,
              },
            },
          }}
        >
          {([0, 1, 2] as PermissionLevel[]).map((lvl) => {
            const selected = permission.level === lvl;
            const lvlColor = PERMISSION_LEVEL_COLORS[lvl];
            return (
              <ToggleButton
                key={lvl}
                value={lvl}
                aria-label={PERMISSION_LEVEL_LABELS[lvl]}
                sx={{
                  borderColor: selected
                    ? `${lvlColor} !important`
                    : `${alpha(lvlColor, 0.35)} !important`,
                  color: selected
                    ? `${PERMISSION_LEVEL_INK[lvl]} !important`
                    : `${alpha(lvlColor, 0.85)} !important`,
                  bgcolor: selected
                    ? `${lvlColor} !important`
                    : `${alpha(lvlColor, 0.08)} !important`,
                }}
              >
                <PermissionLevelIcon level={lvl} />
                {PERMISSION_LEVEL_LABELS[lvl]}
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>

        <Tooltip title="Remove">
          <IconButton
            size="small"
            onClick={onDelete}
            sx={{ opacity: 0.5, "&:hover": { opacity: 1 } }}
          >
            <DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

// ── Section block ────────────────────────────────────────────────────────────

function SectionBlock({
  name,
  permissions,
  onRename,
  onDelete,
  onPermissionChange,
  onPermissionDelete,
  onAddPermission,
}: {
  name: string;
  permissions: AiPermission[];
  onRename: (newName: string) => void;
  onDelete: () => void;
  onPermissionChange: (id: string, updated: AiPermission) => void;
  onPermissionDelete: (id: string) => void;
  onAddPermission: () => void;
}) {
  const [renaming, setRenaming] = React.useState(false);
  const counts = React.useMemo(() => {
    const c: Record<PermissionLevel, number> = { 0: 0, 1: 0, 2: 0 };
    let unset = 0;
    for (const p of permissions) {
      if (p.level === undefined) unset += 1;
      else c[p.level] += 1;
    }
    return { ...c, unset };
  }, [permissions]);

  return (
    <Box>
      {/* Section header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.75,
          gap: 1,
        }}
      >
        {renaming ? (
          <InlineRename
            value={name}
            onCommit={(v) => { onRename(v); setRenaming(false); }}
            onCancel={() => setRenaming(false)}
          />
        ) : (
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", minWidth: 0, flex: 1 }}>
            <Box sx={{ display: "flex", color: "text.secondary", flexShrink: 0 }}>
              <PermissionSectionIcon section={name} />
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                letterSpacing: 0.8,
                textTransform: "uppercase",
                fontSize: "0.68rem",
                color: "text.primary",
              }}
            >
              {name}
            </Typography>
            <Stack direction="row" spacing={0.4} sx={{ flexWrap: "wrap" }}>
              {([2, 1, 0] as PermissionLevel[]).map((lvl) =>
                counts[lvl] > 0 ? (
                  <Box
                    key={lvl}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.25,
                      px: 0.55,
                      py: 0.1,
                      borderRadius: 1,
                      bgcolor: alpha(PERMISSION_LEVEL_COLORS[lvl], 0.16),
                      color: PERMISSION_LEVEL_COLORS[lvl],
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      letterSpacing: 0.2,
                    }}
                  >
                    <PermissionLevelIcon level={lvl} />
                    {counts[lvl]}
                  </Box>
                ) : null,
              )}
              {counts.unset > 0 && (
                <Box
                  sx={{
                    px: 0.55,
                    py: 0.1,
                    borderRadius: 1,
                    bgcolor: alpha("#64748b", 0.14),
                    color: "text.secondary",
                    fontSize: "0.58rem",
                    fontWeight: 800,
                  }}
                >
                  {counts.unset} unset
                </Box>
              )}
            </Stack>
          </Stack>
        )}
        {!renaming && (
          <Stack direction="row" spacing={0} sx={{ opacity: 0.55, "&:hover": { opacity: 1 }, flexShrink: 0 }}>
            <Tooltip title="Rename section">
              <IconButton size="small" onClick={() => setRenaming(true)}>
                <DriveFileRenameOutlineRoundedIcon sx={{ fontSize: 13 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete section">
              <IconButton size="small" color="error" onClick={onDelete}>
                <DeleteOutlineRoundedIcon sx={{ fontSize: 13 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        )}
      </Box>

      {/* Permission rows */}
      <Stack spacing={0.75} sx={{ mb: 0.75 }}>
        {permissions.map((p) => (
          <PermissionRow
            key={p.id}
            permission={p}
            onChange={(updated) => onPermissionChange(p.id, updated)}
            onDelete={() => onPermissionDelete(p.id)}
          />
        ))}
      </Stack>

      {/* Add to section */}
      <Button
        size="small"
        startIcon={<AddRoundedIcon sx={{ fontSize: 13 }} />}
        onClick={onAddPermission}
        sx={{ fontSize: "0.72rem", opacity: 0.75, "&:hover": { opacity: 1 }, ml: 0.5 }}
      >
        Add to {name}
      </Button>
    </Box>
  );
}

// ── Permissions tab editor ───────────────────────────────────────────────────

interface TabEditorProps {
  permissions: AiPermission[];
  categoryOrder: string[];
  onPermissionsChange: (permissions: AiPermission[], categoryOrder: string[]) => void;
}

function PermissionsTabEditor({ permissions, categoryOrder, onPermissionsChange }: TabEditorProps) {
  const allCategories = React.useMemo(() => {
    const raw = [...categoryOrder, ...permissions.map((p) => p.category)];
    const seen = new Set<string>();
    const out: string[] = [];
    for (const c of raw) {
      const label = displayCategoryLabel(c);
      if (!seen.has(label)) {
        seen.add(label);
        out.push(label);
      }
    }
    return out;
  }, [categoryOrder, permissions]);

  const [activeTab, setActiveTab] = React.useState(() => allCategories[0] ?? "");
  const [addingSection, setAddingSection] = React.useState(false);
  const [addingTab, setAddingTab] = React.useState(false);
  const [renamingTab, setRenamingTab] = React.useState(false);

  // Keep activeTab valid when categories change
  React.useEffect(() => {
    if (allCategories.length > 0 && !allCategories.includes(activeTab)) {
      setActiveTab(allCategories[0]);
    }
  }, [allCategories, activeTab]);

  function emit(newPerms: AiPermission[], newOrder: string[] = categoryOrder) {
    onPermissionsChange(newPerms, newOrder);
  }

  // ── Permission mutations ─────────────────────────────────────────────────

  function handlePermissionChange(id: string, updated: AiPermission) {
    emit(permissions.map((p) => (p.id === id ? updated : p)));
  }

  function handlePermissionDelete(id: string) {
    emit(permissions.filter((p) => p.id !== id));
  }

  function handleAddPermission(category: string, section: string) {
    const newPerm: AiPermission = {
      id: `perm-${Date.now()}`,
      label: "",
      description: "",
      level: 1,
      category,
      section,
    };
    emit([...permissions, newPerm]);
  }

  // ── Section mutations ────────────────────────────────────────────────────

  function handleSectionRename(category: string, oldName: string, newName: string) {
    emit(
      permissions.map((p) =>
        p.category === category && p.section === oldName ? { ...p, section: newName } : p
      )
    );
  }

  function handleSectionDelete(category: string, section: string) {
    emit(permissions.filter((p) => !(p.category === category && p.section === section)));
  }

  function handleAddSection(category: string, sectionName: string) {
    if (!sectionName.trim()) return;
    const newPerm: AiPermission = {
      id: `perm-${Date.now()}`,
      label: "",
      description: "",
      level: 1,
      category,
      section: sectionName.trim(),
    };
    emit([...permissions, newPerm]);
    setAddingSection(false);
  }

  // ── Tab mutations ────────────────────────────────────────────────────────

  function handleAddTab(name: string) {
    if (!name.trim() || allCategories.includes(name.trim())) return;
    const newOrder = [...allCategories, name.trim()];
    emit(permissions, newOrder);
    setActiveTab(name.trim());
    setAddingTab(false);
  }

  function handleRenameTab(newName: string) {
    if (!newName.trim() || newName === activeTab) { setRenamingTab(false); return; }
    const newPerms = permissions.map((p) =>
      p.category === activeTab ? { ...p, category: newName.trim() } : p
    );
    const newOrder = allCategories.map((c) => (c === activeTab ? newName.trim() : c));
    emit(newPerms, newOrder);
    setActiveTab(newName.trim());
    setRenamingTab(false);
  }

  function handleDeleteTab(category: string) {
    const newPerms = permissions.filter((p) => p.category !== category);
    const newOrder = allCategories.filter((c) => c !== category);
    emit(newPerms, newOrder);
  }

  // ── Render ───────────────────────────────────────────────────────────────

  const sections = getSections(permissions, activeTab);
  const tabPerms = permissions.filter((p) => categoryMatches(p.category, activeTab));

  return (
    <Box>
      {/* ── Tab bar ───────────────────────────────────────────────────── */}
      <Box sx={{ display: "flex", alignItems: "center", borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={allCategories.includes(activeTab) ? activeTab : false}
          onChange={(_, v: string) => { setActiveTab(v); setAddingSection(false); setRenamingTab(false); }}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            flex: 1,
            minHeight: 38,
            "& .MuiTab-root": {
              minHeight: 38,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.82rem",
              gap: 0,
            },
            "& .MuiTab-iconWrapper": { mb: "0 !important" },
          }}
        >
          {allCategories.map((cat) => (
            <Tab
              key={cat}
              value={cat}
              icon={
                <Box sx={{ display: "flex", mr: 0.5 }}>
                  <PermissionCategoryIcon category={cat} />
                </Box>
              }
              iconPosition="start"
              label={cat}
            />
          ))}
        </Tabs>

        {/* Add-tab button */}
        {addingTab ? (
          <Box sx={{ px: 1 }}>
            <InlineRename
              value=""
              placeholder="Tab name"
              onCommit={handleAddTab}
              onCancel={() => setAddingTab(false)}
            />
          </Box>
        ) : (
          <Tooltip title="Add tab">
            <IconButton size="small" sx={{ mx: 0.5 }} onClick={() => setAddingTab(true)}>
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* ── Tab content ───────────────────────────────────────────────── */}
      <Box sx={{ pt: 2, pb: 1 }}>
        {/* Tab title bar */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
          {renamingTab ? (
            <InlineRename
              value={activeTab}
              onCommit={handleRenameTab}
              onCancel={() => setRenamingTab(false)}
            />
          ) : (
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <Box sx={{ display: "flex", color: "text.secondary" }}>
                <PermissionCategoryIcon category={activeTab} />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.primary" }}>
                {activeTab}
              </Typography>
            </Stack>
          )}
          {!renamingTab && (
            <Stack direction="row" spacing={0.5}>
              <Tooltip title="Rename tab">
                <IconButton size="small" sx={{ opacity: 0.65, "&:hover": { opacity: 1 } }} onClick={() => setRenamingTab(true)}>
                  <DriveFileRenameOutlineRoundedIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete tab and all its permissions">
                <IconButton size="small" color="error" sx={{ opacity: 0.55, "&:hover": { opacity: 1 } }} onClick={() => handleDeleteTab(activeTab)}>
                  <DeleteOutlineRoundedIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
            </Stack>
          )}
        </Box>

        {/* Empty state */}
        {tabPerms.length === 0 && (
          <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic", mb: 2 }}>
            No permissions yet. Add a section to get started.
          </Typography>
        )}

        {/* Section blocks */}
        <Stack spacing={2}>
          {sections.map((section) => {
            const sectionPerms = tabPerms.filter((p) => sectionMatches(p.section, section));
            return (
              <SectionBlock
                key={section}
                name={displaySectionLabel(section)}
                permissions={sectionPerms}
                onRename={(newName) => handleSectionRename(activeTab, section, newName)}
                onDelete={() => handleSectionDelete(activeTab, section)}
                onPermissionChange={handlePermissionChange}
                onPermissionDelete={handlePermissionDelete}
                onAddPermission={() => handleAddPermission(activeTab, section)}
              />
            );
          })}
        </Stack>

        {/* Add section */}
        <Box sx={{ mt: sections.length > 0 ? 2 : 0 }}>
          {addingSection ? (
            <InlineRename
              value=""
              placeholder="Section name"
              onCommit={(name) => handleAddSection(activeTab, name)}
              onCancel={() => setAddingSection(false)}
            />
          ) : (
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddRoundedIcon />}
              onClick={() => setAddingSection(true)}
              sx={{ width: "100%" }}
            >
              Add section
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// ── Passphrase field ─────────────────────────────────────────────────────────

function PassphraseField({
  label,
  value,
  onChange,
  error,
  helperText,
  onEnter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  helperText?: string;
  onEnter?: () => void;
}) {
  const [show, setShow] = React.useState(false);
  return (
    <TextField
      fullWidth
      size="small"
      type={show ? "text" : "password"}
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter?.()}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setShow((s) => !s)} edge="end">
                {show ? (
                  <VisibilityOffRoundedIcon fontSize="small" />
                ) : (
                  <VisibilityRoundedIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

// ── Lock screen ──────────────────────────────────────────────────────────────

function LockScreen({
  onUnlock,
  onReset,
}: {
  onUnlock: (data: AiPermissionsData, passphrase: string) => void;
  onReset: () => void;
}) {
  const [passphrase, setPassphrase] = React.useState(ENV_PASSPHRASE);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleUnlock(pp = passphrase) {
    setLoading(true);
    setError(false);
    const plaintext = await decryptPermissions(pp);
    setLoading(false);
    if (!plaintext) { setError(true); return; }
    try {
      onUnlock(JSON.parse(plaintext) as AiPermissionsData, pp);
    } catch {
      setError(true);
    }
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 320, mx: "auto", pt: 4, alignItems: "center" }}>
      <LockRoundedIcon sx={{ fontSize: 48, opacity: 0.35 }} />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        AI Permissions Locked
      </Typography>
      {ENV_PASSPHRASE ? (
        <>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
            Passphrase loaded from environment.
          </Typography>
          {error && (
            <Typography variant="caption" sx={{ color: "error.main" }}>
              Environment passphrase did not match stored data.
            </Typography>
          )}
        </>
      ) : (
        <>
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
            Enter your passphrase to view and manage AI permission settings.
          </Typography>
          <PassphraseField
            label="Passphrase"
            value={passphrase}
            onChange={setPassphrase}
            error={error}
            helperText={error ? "Incorrect passphrase" : undefined}
            onEnter={passphrase ? () => handleUnlock() : undefined}
          />
        </>
      )}
      <Button
        fullWidth
        variant="contained"
        disabled={(!ENV_PASSPHRASE && !passphrase) || loading}
        onClick={() => handleUnlock()}
        startIcon={loading ? <CircularProgress size={16} /> : <LockOpenRoundedIcon />}
      >
        Unlock
      </Button>
      <Button size="small" color="error" onClick={onReset} sx={{ opacity: 0.55 }}>
        Reset permissions
      </Button>
    </Stack>
  );
}

// ── Setup wizard ─────────────────────────────────────────────────────────────

function SetupWizard({
  onComplete,
}: {
  onComplete: (data: AiPermissionsData, passphrase: string) => void;
}) {
  const [passphrase, setPassphrase] = React.useState(ENV_PASSPHRASE);
  const [confirm, setConfirm] = React.useState(ENV_PASSPHRASE);
  const [permissions, setPermissions] = React.useState<AiPermission[]>(PRESET_AI_PERMISSIONS.permissions);
  const [categoryOrder, setCategoryOrder] = React.useState<string[]>(
    PRESET_AI_PERMISSIONS.categoryOrder ?? []
  );
  const [loading, setLoading] = React.useState(false);

  const [loginOpen, setLoginOpen] = React.useState(false);
  const mismatch = confirm.length > 0 && passphrase !== confirm;
  const canSave = passphrase.length >= 8 && passphrase === confirm;

  async function handleSave() {
    const data: AiPermissionsData = { version: 1, permissions, categoryOrder };
    setLoading(true);
    await encryptPermissions(JSON.stringify(data), passphrase);
    setLoading(false);
    notifyAiPermissionsChanged();
    onComplete(data, passphrase);
  }

  return (
    <Stack spacing={2.5} sx={{ maxWidth: 560, mx: "auto", pt: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Set Up AI Permissions
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Permissions are encrypted client-side with AES-GCM. The passphrase never leaves your device.
      </Typography>

      {ENV_PASSPHRASE ? (
        <Box
          sx={{
            px: 1.5, py: 1, borderRadius: 1.5, border: "1px solid",
            borderColor: alpha("#22c55e", 0.4), bgcolor: alpha("#22c55e", 0.06),
            display: "flex", alignItems: "center", gap: 1,
          }}
        >
          <LockRoundedIcon sx={{ fontSize: 16, color: "success.main" }} />
          <Typography variant="body2" sx={{ color: "success.main", fontWeight: 600 }}>
            Passphrase from <code>NEXT_PUBLIC_AI_PERMISSIONS_PASSPHRASE</code>
          </Typography>
        </Box>
      ) : (
        <>
          <PassphraseField label="Passphrase (min 8 chars)" value={passphrase} onChange={setPassphrase} />
          <PassphraseField
            label="Confirm passphrase"
            value={confirm}
            onChange={setConfirm}
            error={mismatch}
            helperText={mismatch ? "Passphrases do not match" : undefined}
          />
        </>
      )}

      <Divider />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="caption" sx={{ color: "text.primary", fontWeight: 700 }}>
          Permissions
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityRoundedIcon sx={{ fontSize: 16 }} />}
          onClick={() => setLoginOpen(true)}
          sx={{ textTransform: "none", fontWeight: 700 }}
        >
          View login
        </Button>
      </Box>

      <LoginScreen
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        data={{ permissions, categoryOrder }}
      />

      <PermissionsTabEditor
        permissions={permissions}
        categoryOrder={categoryOrder}
        onPermissionsChange={(perms, order) => { setPermissions(perms); setCategoryOrder(order); }}
      />

      <Button
        variant="contained"
        disabled={!canSave || loading}
        onClick={handleSave}
        startIcon={loading ? <CircularProgress size={16} /> : <LockRoundedIcon />}
      >
        Encrypt &amp; Save
      </Button>
    </Stack>
  );
}

// ── Unlocked view ────────────────────────────────────────────────────────────

function UnlockedView({
  data,
  passphrase,
  onLock,
  onReset,
  onDataUpdate,
}: {
  data: AiPermissionsData;
  passphrase: string;
  onLock: () => void;
  onReset: () => void;
  onDataUpdate: (next: AiPermissionsData) => void;
}) {
  const [permissions, setPermissions] = React.useState<AiPermission[]>(data.permissions);
  const [categoryOrder, setCategoryOrder] = React.useState<string[]>(
    getCategoryOrder(data)
  );
  const [dirty, setDirty] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const fromEnv = !!ENV_PASSPHRASE;

  function handleChange(perms: AiPermission[], order: string[]) {
    setPermissions(perms);
    setCategoryOrder(order);
    setDirty(true);
  }

  async function handleSave() {
    const next: AiPermissionsData = { version: data.version, permissions, categoryOrder };
    setSaving(true);
    await encryptPermissions(JSON.stringify(next), passphrase);
    setSaving(false);
    setDirty(false);
    notifyAiPermissionsChanged();
    onDataUpdate(next);
  }

  return (
    <Stack spacing={2}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <LockOpenRoundedIcon sx={{ fontSize: 18, color: "success.main" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            AI Permissions
          </Typography>
          {fromEnv && (
            <Typography variant="caption" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              via env
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<VisibilityRoundedIcon sx={{ fontSize: 16 }} />}
            onClick={() => setLoginOpen(true)}
            sx={{ textTransform: "none", fontWeight: 700, mr: 0.5 }}
          >
            View login
          </Button>
          {!fromEnv && (
            <Tooltip title="Lock">
              <IconButton size="small" onClick={onLock}>
                <LockRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete all permissions">
            <IconButton size="small" color="error" onClick={onReset}>
              <DeleteOutlineRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <LoginScreen
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        data={{ permissions, categoryOrder }}
      />

      <PermissionsTabEditor
        permissions={permissions}
        categoryOrder={categoryOrder}
        onPermissionsChange={handleChange}
      />

      <Collapse in={dirty}>
        <Button
          fullWidth
          variant="contained"
          disabled={saving}
          onClick={handleSave}
          startIcon={saving ? <CircularProgress size={14} /> : <LockRoundedIcon />}
        >
          {saving ? "Saving…" : "Save & re-encrypt"}
        </Button>
      </Collapse>
    </Stack>
  );
}

// ── Root tile ────────────────────────────────────────────────────────────────

type ViewState =
  | { mode: "setup" }
  | { mode: "locked" }
  | { mode: "loading" }
  | { mode: "unlocked"; data: AiPermissionsData; passphrase: string };

export function SettingsTile() {
  const [view, setView] = React.useState<ViewState>(() => {
    if (!hasStoredPermissions()) return { mode: "setup" };
    if (ENV_PASSPHRASE) return { mode: "loading" };
    return { mode: "locked" };
  });

  React.useEffect(() => {
    if (view.mode !== "loading") return;
    decryptPermissions(ENV_PASSPHRASE).then((plaintext) => {
      if (!plaintext) { setView({ mode: "locked" }); return; }
      try {
        setView({ mode: "unlocked", data: JSON.parse(plaintext) as AiPermissionsData, passphrase: ENV_PASSPHRASE });
      } catch {
        setView({ mode: "locked" });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => { clearStoredPermissions(); setView({ mode: "setup" }); };

  return (
    <TileContainer mode="fit">
      <Box sx={{ width: "100%", height: "100%", overflowY: "auto", p: 3, color: "text.primary" }}>

        <Typography
          variant="overline"
          sx={{ color: "text.secondary", fontWeight: 700, letterSpacing: 1, display: "block" }}
        >
          Technical · Settings
        </Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 500, letterSpacing: 0.3 }}>
          imports system foundations.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <RlPersonalBar />
        </Box>

        <Box sx={{ mt: 3 }}>
          {view.mode === "loading" && (
            <Stack spacing={1.5} sx={{ alignItems: "center", pt: 6 }}>
              <CircularProgress size={32} />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>Unlocking…</Typography>
            </Stack>
          )}

          {view.mode === "setup" && (
            <SetupWizard
              onComplete={(data, passphrase) => setView({ mode: "unlocked", data, passphrase })}
            />
          )}

          {view.mode === "locked" && (
            <LockScreen
              onUnlock={(data, passphrase) => setView({ mode: "unlocked", data, passphrase })}
              onReset={handleReset}
            />
          )}

          {view.mode === "unlocked" && (
            <UnlockedView
              data={view.data}
              passphrase={view.passphrase}
              onLock={() => setView({ mode: "locked" })}
              onReset={handleReset}
              onDataUpdate={(next) =>
                setView((v) => v.mode === "unlocked" ? { ...v, data: next } : v)
              }
            />
          )}
        </Box>
      </Box>
    </TileContainer>
  );
}
