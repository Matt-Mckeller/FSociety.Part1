'use client';

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { ChevronRight, MeetingRoom } from '@mui/icons-material';
import { Room } from '@4eye/core';

interface RoomListProps {
  rooms: Room[];
  onRoomClick: (room: Room) => void;
}

export function RoomList({ rooms, onRoomClick }: RoomListProps) {
  if (rooms.length === 0) {
    return <RoomListEmpty />;
  }

  return (
    <Paper>
      <List disablePadding>
        {rooms.map((room, index) => (
          <RoomListItem
            key={room.id}
            room={room}
            showDivider={index < rooms.length - 1}
            onClick={() => onRoomClick(room)}
          />
        ))}
      </List>
    </Paper>
  );
}

interface RoomListItemProps {
  room: Room;
  showDivider: boolean;
  onClick: () => void;
}

function RoomListItem({ room, showDivider, onClick }: RoomListItemProps) {
  return (
    <ListItem
      divider={showDivider}
      sx={{
        cursor: 'pointer',
        '&:hover': { bgcolor: 'action.hover' },
      }}
      onClick={onClick}
    >
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {room.name}
            <Chip
              size="small"
              label={room.isActive ? 'Active' : 'Inactive'}
              color={room.isActive ? 'success' : 'default'}
            />
          </Box>
        }
        secondary={room.description || `Invite code: ${room.inviteCode}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onClick}>
          <ChevronRight />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export function RoomListEmpty() {
  return (
    <Paper sx={{ p: 4, textAlign: 'center' }}>
      <MeetingRoom sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        No rooms yet
      </Typography>
      <Typography
        sx={{
          color: "text.secondary",
          mb: 2
        }}>
        Create your first room to start hosting sessions.
      </Typography>
    </Paper>
  );
}
