import { Typography, Box, Grid } from '@mui/material';
import MermaidDiagram from '../components/MermaidDiagram';
import { allArchitectureDiagrams } from '../data/architecture';

export default function ArchitecturePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
        System Architecture
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Architectural diagrams showing how the authentication system is structured.
      </Typography>

      <Grid container spacing={3}>
        {allArchitectureDiagrams.map((diagram, i) => (
          <Grid size={{ xs: 12, lg: i === 5 ? 12 : 6 }} key={i}>
            <MermaidDiagram 
              chart={diagram.chart} 
              title={diagram.title}
              description={diagram.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
