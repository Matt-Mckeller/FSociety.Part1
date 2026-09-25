# W4 — Rooms

> Room CRUD, organization management, static invite links, join flow.

**Status:** Planned
**Source:** [Plan.md](../../Plan.md) | [MasterPlan.md](../../MasterPlan.md) | [decisions.md](../decisions.md)

---

## Routes

| Route | Component | Auth | Role |
|-------|-----------|------|------|
| `/rooms` | RoomListPage | Required | Any |
| `/rooms/new` | CreateRoomPage | Required | HOST/ADMIN |
| `/rooms/:id` | RoomDetailPage | Required | Member |
| `/rooms/:id/settings` | RoomSettingsPage | Required | HOST/ADMIN |
| `/rooms/:id/live` | LiveSessionPage | Required | Member |
| `/join/:code` | JoinRoomPage | Public | — |

---

## Data Model (from C6)

```
Organization ──< OrganizationRoom >── Room
                                        │
                                        └── Session
```

- Room can belong to **multiple organizations** (M:N)
- `isPrimaryOwner` on OrganizationRoom determines billing
- `inviteCode` is unique 8-char alphanumeric

---

## Components

### RoomList
```tsx
<List>
  {rooms.map(room => (
    <ListItem key={room.id}>
      <ListItemText primary={room.name} secondary={room.organization.name} />
      <Chip label={room.isActive ? 'Active' : 'Inactive'} />
      <IconButton href={`/rooms/${room.id}`}><ChevronRight /></IconButton>
    </ListItem>
  ))}
</List>
<Fab href="/rooms/new"><Add /></Fab>  {/* HOST/ADMIN only */}
```

### CreateRoomForm
```tsx
<Box component="form">
  <TextField label="Room Name" required />
  <TextField label="Description" multiline rows={3} />
  <Select label="Organization" required>{orgs}</Select>
  <FormControlLabel control={<Switch defaultChecked />} label="Enable Recording" />
  <FormControlLabel control={<Switch defaultChecked />} label="Enable Chat" />
  <Button type="submit">Create Room</Button>
</Box>
```

### RoomSettings
```tsx
<Box component="form">
  <TextField label="Room Name" value={room.name} />
  <TextField label="Description" value={room.description} />
  <Box>
    <Typography>Invite Link</Typography>
    <TextField value={`4eye.ai/join/${room.inviteCode}`} InputProps={{ readOnly: true }} />
    <IconButton onClick={copyToClipboard}><ContentCopy /></IconButton>
    <Button onClick={regenerateCode}>Regenerate</Button>
  </Box>
  <Switch checked={room.isRecordingEnabled} label="Recording" />
  <Switch checked={room.isChatEnabled} label="Chat" />
  <Switch checked={room.isActive} label="Active" />
  <Button type="submit">Save Changes</Button>
  <Button color="error">Delete Room</Button>
</Box>
```

### InviteCodeDisplay
```tsx
<Card>
  <Typography variant="h6">Invite Link</Typography>
  <Typography variant="h4" fontFamily="monospace">{code}</Typography>
  <Typography color="text.secondary">4eye.ai/join/{code}</Typography>
  <Button startIcon={<ContentCopy />} onClick={copy}>Copy Link</Button>
  <Button startIcon={<QrCode />} onClick={showQR}>Show QR</Button>
</Card>
```

---

## Invite Code Logic

```typescript
// Generate 8-char alphanumeric code
function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1
  return Array.from({ length: 8 }, () => 
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}
```

---

## API Surface

### Queries
- `rooms(organizationId: ID)` → [Room]
- `room(id: ID!)` → Room
- `roomByInviteCode(code: String!)` → Room
- `myOrganizations` → [Organization]

### Mutations
- `createRoom(input: CreateRoomInput!)` → Room
- `updateRoom(id: ID!, input: UpdateRoomInput!)` → Room
- `deleteRoom(id: ID!)` → Boolean
- `regenerateInviteCode(roomId: ID!)` → Room
- `joinRoom(roomId: ID!)` → RoomMembership
- `leaveRoom(roomId: ID!)` → Boolean

---

## Permissions

| Action | MEMBER | HOST | ADMIN |
|--------|--------|------|-------|
| View rooms | ✅ | ✅ | ✅ |
| Join room | ✅ | ✅ | ✅ |
| Create room | ❌ | ✅ | ✅ |
| Edit room | ❌ | ✅ | ✅ |
| Delete room | ❌ | ❌ | ✅ |
| Start session | ❌ | ✅ | ✅ |

---

## Dependencies
- C1 (Database)
- C2 (Auth, role guards)
- C3 (GraphQL)

## Acceptance Criteria
- [ ] Host can create room with name, description, settings
- [ ] Invite code generated automatically (8 chars)
- [ ] Invite code can be regenerated
- [ ] Copy link and QR code work
- [ ] Room settings editable by HOST/ADMIN
- [ ] Members can view rooms they belong to
- [ ] Join via invite code works for members and guests
- [ ] Room can belong to multiple organizations
