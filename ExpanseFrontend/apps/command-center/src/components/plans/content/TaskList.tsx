import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Chip,
  Box,
} from '@mui/material';
import type { Task, TaskGroup } from '../../../types/plans';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  onToggle?: (taskId: string) => void;
}

export function TaskList({ tasks, title, onToggle }: TaskListProps) {
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ my: 1.5 }}>
      {title && (
        <Typography variant="h6" sx={{ p: 2, pb: 0 }}>
          {title}
        </Typography>
      )}
      <List dense>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            disablePadding
            secondaryAction={
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {task.priority && (
                  <Chip
                    size="small"
                    label={task.priority}
                    color={getPriorityColor(task.priority)}
                    variant="outlined"
                  />
                )}
                {task.module && (
                  <Chip size="small" label={task.module} variant="outlined" />
                )}
              </Box>
            }
          >
            <ListItemButton onClick={() => onToggle?.(task.id)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  disableRipple
                  size="small"
                />
              </ListItemIcon>
              <ListItemText
                primary={task.title}
                secondary={task.notes}
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

interface TaskGroupListProps {
  groups: TaskGroup[];
  onToggle?: (taskId: string) => void;
}

export function TaskGroupList({ groups, onToggle }: TaskGroupListProps) {
  return (
    <>
      {groups.map((group) => (
        <Box key={group.id} sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {group.title}
          </Typography>
          {group.description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {group.description}
            </Typography>
          )}
          <TaskList tasks={group.tasks} onToggle={onToggle} />
        </Box>
      ))}
    </>
  );
}
