"use client";

import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputBase,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

import { MarkdownPreview } from "@4eye/web/Tiles/journal/components/MarkdownPreview";
import {
  parseProcessExpression,
  type ProcessEntry,
  type ProcessGroup,
} from "../model/processes";

export function ProcessFormDialog({
  open,
  onClose,
  entry,
  groups,
  onSave,
  onCreateGroup,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  entry: ProcessEntry | null;
  groups: ProcessGroup[];
  onSave: (draft: Omit<ProcessEntry, "id" | "updatedAt" | "logs"> & { id?: string }) => void;
  onCreateGroup?: (group: Omit<ProcessGroup, "id" | "sortOrder"> & { id?: string }) => ProcessGroup | void;
  onDelete?: (id: string) => void;
}) {
  const isEdit = Boolean(entry?.id);
  const [expression, setExpression] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagDraft, setTagDraft] = React.useState("");
  const [active, setActive] = React.useState(true);
  const [groupId, setGroupId] = React.useState<string>("");
  const [mode, setMode] = React.useState<"write" | "preview">("write");
  const [newGroupNs, setNewGroupNs] = React.useState("");
  const [newGroupName, setNewGroupName] = React.useState("");
  const [showNewGroup, setShowNewGroup] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setExpression(entry?.expression ?? "");
    setDescription(entry?.description ?? "");
    setTags(entry?.tags ?? []);
    setTagDraft("");
    setActive(entry?.active ?? true);
    setGroupId(entry?.groupId ?? groups[0]?.id ?? "");
    setMode("write");
    setShowNewGroup(false);
    setNewGroupNs("");
    setNewGroupName("");
  }, [open, entry, groups]);

  const parsed = React.useMemo(() => parseProcessExpression(expression), [expression]);
  const canSave = expression.trim().length > 0;

  const addTag = () => {
    const t = tagDraft.trim();
    if (t && !tags.includes(t)) setTags([...tags, t]);
    setTagDraft("");
  };

  const createGroup = () => {
    if (!onCreateGroup || !newGroupNs.trim() || !newGroupName.trim()) return;
    const created = onCreateGroup({
      namespace: newGroupNs.trim(),
      name: newGroupName.trim(),
      tags: [],
      description: undefined,
    });
    if (created?.id) setGroupId(created.id);
    setShowNewGroup(false);
    setNewGroupNs("");
    setNewGroupName("");
  };

  const handleSave = () => {
    if (!canSave) return;
    const { namespace, name, autoPlay } = parseProcessExpression(expression);
    onSave({
      id: entry?.id,
      expression: expression.trim(),
      namespace,
      name,
      autoPlay,
      tags,
      description,
      active,
      groupId: groupId || undefined,
      sortOrder: entry?.sortOrder ?? 999,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="tablet" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "flex-start", gap: 1, pb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, flex: 1, lineHeight: 1.25 }}>
          {isEdit ? "Edit process" : "Add process"}
        </Typography>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack sx={{ gap: 1.5, pt: 0.5 }}>
          <TextField
            label="Expression"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="Scripts.PlanA(Power++).AutoPlay()"
            fullWidth
            multiline
            minRows={2}
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.85rem",
              },
            }}
            helperText={
              parsed.autoPlay
                ? `${parsed.namespace}.${parsed.name}(…) · AutoPlay detected`
                : `${parsed.namespace}.${parsed.name}(…)`
            }
          />

          <Stack sx={{ gap: 0.75 }}>
            <TextField
              select
              label="Group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              fullWidth
              slotProps={{ select: { native: true } }}
            >
              <option value="">None</option>
              {groups.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.namespace}.{g.name}
                </option>
              ))}
            </TextField>
            {onCreateGroup && (
              <>
                <Button size="small" onClick={() => setShowNewGroup((v) => !v)} sx={{ alignSelf: "flex-start" }}>
                  {showNewGroup ? "Cancel new group" : "New group"}
                </Button>
                {showNewGroup && (
                  <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 1, alignItems: { sm: "center" } }}>
                    <TextField
                      size="small"
                      label="Namespace"
                      value={newGroupNs}
                      onChange={(e) => setNewGroupNs(e.target.value)}
                      placeholder="Aion"
                      sx={{ flex: 1 }}
                    />
                    <TextField
                      size="small"
                      label="Name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="SelfImprovement"
                      sx={{ flex: 1 }}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={createGroup}
                      disabled={!newGroupNs.trim() || !newGroupName.trim()}
                    >
                      Create
                    </Button>
                  </Stack>
                )}
              </>
            )}
          </Stack>

          <FormControlLabel
            control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} size="small" />}
            label="Active"
          />

          <Stack direction="row" sx={{ alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
            {tags.map((t) => (
              <Chip
                key={t}
                label={t}
                size="small"
                onDelete={() => setTags(tags.filter((x) => x !== t))}
              />
            ))}
            <InputBase
              value={tagDraft}
              onChange={(e) => setTagDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="+ tag"
              sx={{ fontSize: 12, width: 80, "& input": { p: 0 } }}
            />
          </Stack>

          <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
              Description (markdown)
            </Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={mode}
              onChange={(_, v) => v && setMode(v)}
            >
              <ToggleButton value="write" sx={{ px: 1, py: 0.25 }}>
                <EditRoundedIcon sx={{ fontSize: 14, mr: 0.4 }} />
                Write
              </ToggleButton>
              <ToggleButton value="preview" sx={{ px: 1, py: 0.25 }}>
                <VisibilityRoundedIcon sx={{ fontSize: 14, mr: 0.4 }} />
                Preview
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          {mode === "write" ? (
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              minRows={6}
              fullWidth
              placeholder="What does this process do?"
            />
          ) : (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
                minHeight: 140,
              }}
            >
              {description.trim() ? (
                <MarkdownPreview source={description} />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Nothing to preview yet.
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {isEdit && onDelete && entry && (
          <Button color="error" onClick={() => onDelete(entry.id)} sx={{ mr: "auto" }}>
            Delete
          </Button>
        )}
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!canSave}>
          {isEdit ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
