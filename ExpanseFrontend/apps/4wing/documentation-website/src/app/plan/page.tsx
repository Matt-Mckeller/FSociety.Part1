'use client';

import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ScheduleIcon from '@mui/icons-material/Schedule';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const statusIcons: Record<string, React.ReactNode> = {
  '✅ Complete': <CheckCircleIcon sx={{ color: '#10B981' }} />,
  '🔄 In Progress': <AutorenewIcon sx={{ color: '#F59E0B' }} />,
  '⏳ Not Started': <ScheduleIcon sx={{ color: '#6B7280' }} />,
};

const phases = [
  { phase: 'Requirements & Planning', status: '✅ Complete' },
  { phase: 'Screen Design', status: '🔄 In Progress' },
  { phase: 'Architecture Design', status: '🔄 In Progress' },
  { phase: 'Development', status: '⏳ Not Started' },
  { phase: 'Demo & Pitch', status: '⏳ Not Started' },
];

const phase1Tasks = [
  { task: 'Define requirements and product modes', done: true },
  { task: 'Define technology stack', done: true },
  { task: 'Define screens and user flows', done: true },
  { task: 'Document privacy/security approach', done: true },
];

const phase2Tasks = [
  { task: 'Finalize screen wireframes', done: false },
  { task: 'Create robot character design', done: false },
  { task: 'Design system architecture diagram', done: false },
  { task: 'Create pitch deck outline', done: false },
];

const phase3Tasks = [
  { task: 'Set up project repository', done: false },
  { task: 'Build backend API (transcription, summaries)', done: false },
  { task: 'Build counselor dashboard (live session view)', done: false },
  { task: 'Build client app (at-home mode)', done: false },
  { task: 'Integrate robot device (or mockup)', done: false },
];

const phase4Tasks = [
  { task: 'Create demo script', done: false },
  { task: 'Build pitch presentation', done: false },
  { task: 'Practice run-through', done: false },
  { task: 'Prepare Q&A responses', done: false },
];

const websiteDeliverables = [
  { deliverable: 'Landing Page', priority: 'P0', status: '⏳' },
  { deliverable: 'Waitlist / Signup', priority: 'P1', status: '⏳' },
];

const softwareDeliverables = [
  { deliverable: 'Live Session View', priority: 'P0', status: '⏳' },
  { deliverable: 'Summary Generator', priority: 'P0', status: '⏳' },
  { deliverable: 'Alert Engine', priority: 'P0', status: '⏳' },
  { deliverable: 'Client App (At-Home)', priority: 'P1', status: '⏳' },
];

const robotDeliverables = [
  { deliverable: 'Character Design', priority: 'P0', status: '⏳' },
  { deliverable: '3D Render', priority: 'P0', status: '⏳' },
  { deliverable: 'Prototype / Mockup', priority: 'P1', status: '⏳' },
];

const productQuestions = [
  'Robot: physical prototype for hackathon or render only?',
  'Demo: real counseling session or scripted scenario?',
  'Name for the robot companion?',
];

const businessQuestions = [
  'Monetization: SaaS per seat, per session, or enterprise?',
  'Target market: private practices, clinics, or telehealth?',
  'Pricing strategy?',
];

const technicalQuestions = [
  'Local processing vs cloud for privacy-sensitive deployments?',
  'Mobile-first or web-first for client app?',
  'Integration priorities (EHR systems, calendars)?',
];

const timeline = [
  { day: '1', focus: 'Finalize design, set up repo' },
  { day: '2-3', focus: 'Build core backend (transcription, summaries)' },
  { day: '4-5', focus: 'Build counselor dashboard' },
  { day: '6', focus: 'Polish, robot render, demo prep' },
  { day: '7', focus: 'Pitch practice, final touches' },
];

function TaskList({ tasks, title }: { tasks: { task: string; done: boolean }[]; title: string }) {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <List dense>
          {tasks.map((item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Checkbox checked={item.done} disabled size="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.task}
                sx={{ textDecoration: item.done ? 'line-through' : 'none' }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

function DeliverableTable({
  deliverables,
  title,
}: {
  deliverables: { deliverable: string; priority: string; status: string }[];
  title: string;
}) {
  const priorityColors: Record<string, string> = {
    P0: '#10B981',
    P1: '#F59E0B',
    P2: '#6B7280',
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Deliverable</TableCell>
              <TableCell align="center">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliverables.map((row) => (
              <TableRow key={row.deliverable}>
                <TableCell>
                  <Typography fontWeight={500}>{row.deliverable}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={row.priority}
                    size="small"
                    sx={{ backgroundColor: priorityColors[row.priority], color: 'white' }}
                  />
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default function PlanPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Project Plan
      </Typography>

      {/* Status Overview */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Status
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phase</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {phases.map((row) => (
                <TableRow key={row.phase}>
                  <TableCell>
                    <Typography fontWeight={500}>{row.phase}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {statusIcons[row.status]}
                      <Typography>{row.status}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Tasks */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Tasks
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TaskList tasks={phase1Tasks} title="Phase 1: Planning ✅" />
            <TaskList tasks={phase2Tasks} title="Phase 2: Design" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TaskList tasks={phase3Tasks} title="Phase 3: Development" />
            <TaskList tasks={phase4Tasks} title="Phase 4: Demo & Pitch" />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Deliverables */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Deliverables
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <DeliverableTable deliverables={websiteDeliverables} title="Website" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DeliverableTable deliverables={softwareDeliverables} title="Software" />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DeliverableTable deliverables={robotDeliverables} title="Robot" />
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Open Questions */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Open Questions
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
                  Product
                </Typography>
                <List dense>
                  {productQuestions.map((q, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <HelpOutlineIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={q} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#EC4899' }}>
                  Business
                </Typography>
                <List dense>
                  {businessQuestions.map((q, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <HelpOutlineIcon sx={{ color: '#EC4899' }} fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={q} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#10B981' }}>
                  Technical
                </Typography>
                <List dense>
                  {technicalQuestions.map((q, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <HelpOutlineIcon sx={{ color: '#10B981' }} fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={q} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Timeline */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Timeline (Hackathon)
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 100 }}>Day</TableCell>
                <TableCell>Focus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeline.map((row) => (
                <TableRow key={row.day}>
                  <TableCell>
                    <Chip label={`Day ${row.day}`} size="small" color="primary" />
                  </TableCell>
                  <TableCell>{row.focus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
