import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, Avatar, Alert, List, ListItem, ListItemText, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
  Psychology as PsychologyIcon,
  Description as DocumentIcon,
  ExpandMore as ExpandMoreIcon,
  LocalHospital as HealthIcon,
  AttachMoney as MoneyIcon,
  Home as HomeIcon,
  Lightbulb as InsightIcon,
} from '@mui/icons-material';
import backgroundData from '../../../src/data/background.json';

const { background } = backgroundData;
const { narratorProfile, personalHistory, familyBackground, financialContext, securityContext, timelineContext, documentationStatus } = background;

export default function Background() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Background Context
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Understanding why this situation may have occurred. This page provides context on the narrator's history, profile characteristics, and circumstances that may explain why different parties (criminal, government, or business) could have had interest in observing or engaging with the narrator.
      </Typography>

      <Grid container spacing={3}>
        {/* Narrator Profile */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                <PersonIcon />
              </Avatar>
              <Box>
                <Typography variant="h5">{narratorProfile.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {narratorProfile.occupation}
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              <HomeIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 18 }} />
              Location
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {narratorProfile.fullAddress}
            </Typography>

            <Typography variant="subtitle2" gutterBottom>
              Nicknames
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {narratorProfile.nicknames.map((nick, i) => (
                <Chip key={i} size="small" label={nick} />
              ))}
            </Stack>

            <Typography variant="subtitle2" gutterBottom>
              Skills
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
              {narratorProfile.skills.map((skill, i) => (
                <Chip key={i} size="small" label={skill} variant="outlined" />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Personality Traits */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <PsychologyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Personality Traits
            </Typography>
            <List dense>
              {narratorProfile.personalityTraits.map((trait, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemText primary={trait} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Previous Employment */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Previous Employment
            </Typography>
            <Grid container spacing={2}>
              {narratorProfile.previousEmployment.map((job, i) => (
                <Grid key={i} size={{ xs: 12, md: 6 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {job.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {job.role}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {job.relevance}
                      </Typography>
                      {job.notes && (
                        <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                          {job.notes.slice(0, 3).map((note, j) => (
                            <Chip key={j} size="small" label={note} sx={{ fontSize: '0.65rem' }} />
                          ))}
                        </Stack>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Current Projects */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Current Projects
            </Typography>
            <Grid container spacing={2}>
              {narratorProfile.currentProjects.map((project, i) => (
                <Grid key={i} size={{ xs: 12, md: 4 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {project.name}
                      </Typography>
                      <Chip size="small" label={project.category} sx={{ mb: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {narratorProfile.businessContext && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Business Context:</strong> {narratorProfile.businessContext.investorRelevance}
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Personal History */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <HealthIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Personal History
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Mental Health Journey</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {personalHistory.mentalHealthJourney}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Financial History</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {personalHistory.financialHistory}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Club Habit</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {personalHistory.clubHabit}
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle2">Security Knowledge</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" color="text.secondary">
                  {personalHistory.securityKnowledge}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>

        {/* Family Background */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Family Background
            </Typography>
            
            {familyBackground.father && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Father</Typography>
                <Typography variant="body2">{familyBackground.father.description}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>Relevance:</strong> {familyBackground.father.relevance}
                </Typography>
              </Alert>
            )}
          </Paper>
        </Grid>

        {/* Why This May Have Generated Interest - Key Summary Section */}
        {personalHistory.interestGeneratingFactors && (
          <Grid size={12}>
            <Paper sx={{ p: 3, bgcolor: 'warning.light', border: '2px solid', borderColor: 'warning.main' }}>
              <Typography variant="h6" gutterBottom>
                <InsightIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Why This May Have Generated Interest
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {personalHistory.interestGeneratingFactors.summary}
              </Typography>
              <List dense>
                {personalHistory.interestGeneratingFactors.factors.map((factor: string, i: number) => (
                  <ListItem key={i} disableGutters>
                    <ListItemText 
                      primary={factor}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
              <Alert severity="info" sx={{ mt: 2 }}>
                {personalHistory.interestGeneratingFactors.note}
              </Alert>
            </Paper>
          </Grid>
        )}

        {/* Financial Context */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <MoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Financial Context
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>Casino Activity</Typography>
            <List dense>
              {financialContext.casinoActivity.map((activity, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemText 
                    primary={`${activity.location} - ${activity.date}`}
                    secondary={activity.withdrawal}
                  />
                </ListItem>
              ))}
            </List>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {financialContext.cryptocurrencyInterest && (
                <Chip size="small" label="Crypto Interest" color="primary" />
              )}
              {financialContext.investmentInterest && (
                <Chip size="small" label="Investment Interest" color="primary" />
              )}
            </Stack>
          </Paper>
        </Grid>

        {/* Security Context */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Security Context
            </Typography>
            
            <Typography variant="subtitle2" gutterBottom>
              Awareness Level: <Chip size="small" label={securityContext.awarenessLevel} color="warning" />
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>Measures Implemented</Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5} sx={{ mb: 2 }}>
              {securityContext.measuresImplemented.map((measure, i) => (
                <Chip key={i} size="small" label={measure} variant="outlined" sx={{ fontSize: '0.65rem' }} />
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>Suspected Surveillance</Typography>
            <List dense>
              {securityContext.suspectedSurveillance.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Timeline Context */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <TimelineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Timeline Context
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Duration: {timelineContext.durationDays} days ({timelineContext.startDate} to {timelineContext.endDate})
            </Typography>

            <Grid container spacing={2}>
              {timelineContext.keyPhases.map((phase, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" color="primary">
                        {phase.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {phase.dates}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {phase.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Documentation Status */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <DocumentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Documentation Status
            </Typography>
            
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Photos/Video</Typography>
                <List dense>
                  {documentationStatus.photosVideo.map((item, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Digital Records</Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                  {documentationStatus.digitalRecords.map((item, i) => (
                    <Chip key={i} size="small" label={item} variant="outlined" />
                  ))}
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Typography variant="subtitle2" gutterBottom>Camera Evidence Locations</Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                  {documentationStatus.cameraEvidence.map((item, i) => (
                    <Chip key={i} size="small" label={item} variant="outlined" color="success" />
                  ))}
                </Stack>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>Physical Evidence</Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
              {documentationStatus.physicalEvidence.map((item, i) => (
                <Chip key={i} size="small" label={item} />
              ))}
            </Stack>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>Witnesses</Typography>
            <Stack direction="row" spacing={0.5}>
              {documentationStatus.witnesses.map((item, i) => (
                <Chip key={i} size="small" label={item} color="primary" />
              ))}
            </Stack>
          </Paper>
        </Grid>


      </Grid>
    </Box>
  );
}
