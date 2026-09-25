import { Typography, Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import MermaidDiagram from '../components/MermaidDiagram';
import { allFlows } from '../data/flows';

export default function FlowsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
        Authentication Flows
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Sequence diagrams showing how each authentication method works step-by-step.
      </Typography>

      <Tabs 
        value={tab} 
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ 
          mb: 3,
          '& .MuiTab-root': { textTransform: 'none' },
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        {allFlows.map((flow, i) => (
          <Tab key={i} label={flow.title.replace(' Flow', '')} />
        ))}
      </Tabs>

      {allFlows.map((flow, i) => (
        <Box key={i} sx={{ display: tab === i ? 'block' : 'none' }}>
          <MermaidDiagram 
            chart={flow.chart} 
            title={flow.title}
            description={flow.description}
          />
        </Box>
      ))}
    </Box>
  );
}
