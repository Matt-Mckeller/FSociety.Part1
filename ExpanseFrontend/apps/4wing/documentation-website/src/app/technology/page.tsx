'use client';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloudIcon from '@mui/icons-material/Cloud';

const stackOverview = [
  { layer: 'Language', choice: 'TypeScript' },
  { layer: 'Frontend', choice: 'Next.js + React + MUI' },
  { layer: 'Backend', choice: 'Nest.js + GraphQL' },
  { layer: 'Speech-to-Text', choice: 'OpenAI Whisper v3' },
  { layer: 'LLM', choice: 'GPT-5 / Claude 4 Opus' },
  { layer: 'Video Analysis', choice: 'MediaPipe (P2)' },
  { layer: 'Database', choice: 'PostgreSQL + Redis' },
  { layer: 'Hosting', choice: 'Vercel / AWS' },
];

const components = [
  {
    name: 'Language: TypeScript',
    icon: <CodeIcon />,
    color: '#3178C6',
    details: ['Full-stack TypeScript for type safety, shared types between frontend and backend.'],
  },
  {
    name: 'Frontend: Next.js + React + MUI',
    icon: <WebIcon />,
    color: '#000000',
    details: [
      'Next.js for SSR, routing, API routes',
      'React for component architecture',
      'MUI (Material UI) for design system',
      'Apollo Client for GraphQL',
    ],
  },
  {
    name: 'Backend: Nest.js + GraphQL',
    icon: <StorageIcon />,
    color: '#E0234E',
    details: [
      'Nest.js framework for scalable Node.js backend',
      'GraphQL API (Apollo Server)',
      'WebSocket subscriptions for real-time transcription',
      'JWT + OAuth2 authentication',
    ],
  },
  {
    name: 'Speech-to-Text: Whisper v3',
    icon: <RecordVoiceOverIcon />,
    color: '#10B981',
    details: [
      'Real-time transcription with speaker diarization.',
      'Alternatives: Deepgram, AssemblyAI.',
    ],
  },
  {
    name: 'LLM: GPT-5 / Claude 4 Opus',
    icon: <SmartToyIcon />,
    color: '#7C3AED',
    details: [
      'Session summarization, alert generation, insight extraction.',
      'Fallback: Llama 3, Mistral for on-prem.',
    ],
  },
  {
    name: 'Video Analysis: MediaPipe (P2)',
    icon: <VideocamIcon />,
    color: '#F59E0B',
    details: [
      'Face mesh for emotion detection, pose estimation for body language.',
      'Runs client-side for privacy.',
    ],
  },
  {
    name: 'Database',
    icon: <StorageIcon />,
    color: '#336791',
    details: [
      'PostgreSQL: Users, sessions, transcripts, summaries',
      'Redis: Real-time caching, session state, pub/sub',
      'Prisma ORM for type-safe database access',
    ],
  },
  {
    name: 'Hosting',
    icon: <CloudIcon />,
    color: '#FF9900',
    details: [
      'Vercel: Next.js frontend, edge functions',
      'AWS: Nest.js backend (ECS), database (RDS), storage (S3)',
    ],
  },
];

const devTools = [
  { tool: 'Node.js', version: '20+' },
  { tool: 'TypeScript', version: '5.x' },
  { tool: 'pnpm', version: 'Package manager' },
  { tool: 'Docker', version: 'Local services' },
  { tool: 'CI/CD', version: 'GitHub Actions' },
];

export default function TechnologyPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h1" gutterBottom>
        Technology Stack
      </Typography>

      {/* Overview Table */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Overview
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Layer</TableCell>
                <TableCell>Choice</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stackOverview.map((row) => (
                <TableRow key={row.layer}>
                  <TableCell>
                    <Typography fontWeight={500}>{row.layer}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={row.choice} size="small" color="primary" variant="outlined" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Components */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Components
        </Typography>
        <Grid container spacing={3}>
          {components.map((component) => (
            <Grid size={{ xs: 12, md: 6 }} key={component.name}>
              <Card sx={{ height: '100%', borderTop: `4px solid ${component.color}` }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ color: component.color }}>{component.icon}</Box>
                    <Typography variant="h6" fontWeight={600}>
                      {component.name}
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ pl: 2, m: 0, '& li': { mb: 0.5 } }}>
                    {component.details.map((detail, index) => (
                      <li key={index}>
                        <Typography variant="body2" color="text.secondary">
                          {detail}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Architecture */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Architecture
        </Typography>
        <Paper sx={{ p: 4, backgroundColor: '#1E1E1E', overflow: 'auto' }}>
          <Box
            component="pre"
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.85rem',
              color: '#E0E0E0',
              margin: 0,
              whiteSpace: 'pre',
            }}
          >
            {`┌─────────────┐                        ┌─────────────┐
│   Robot     │───────────────────────▶│   Backend   │
│ (mic + cam) │                        │  (Nest.js)  │
└─────────────┘                        └──────┬──────┘
                                              │ GraphQL
              ┌─────────────┐                 │
              │   App UI    │─────────────────┤
              │  (Next.js)  │                 │
              └─────────────┘                 │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │  Whisper    │           │   GPT-5     │           │  Database   │
             │   (STT)     │           │ (Summaries) │           │ (PostgreSQL)│
             └─────────────┘           └─────────────┘           └─────────────┘`}
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Development Tools */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Development
        </Typography>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tool</TableCell>
                <TableCell>Version</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devTools.map((row) => (
                <TableRow key={row.tool}>
                  <TableCell>
                    <Typography fontWeight={500}>{row.tool}</Typography>
                  </TableCell>
                  <TableCell>{row.version}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
