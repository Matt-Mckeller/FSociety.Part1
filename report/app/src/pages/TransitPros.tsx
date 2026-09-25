import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, Alert, List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import {
  LocalShipping as TowingIcon,
  Warning as WarningIcon,
  Security as SecurityIcon,
  Business as BusinessIcon,
  Help as QuestionIcon,
  Lightbulb as IdeaIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  Gavel as CriminalIcon,
  AccountBalance as GovernmentIcon,
  School as LearningIcon,
} from '@mui/icons-material';

// TransitPros data - could be moved to JSON later
const transitProsData = {
  company: {
    name: "TransitPros",
    type: "Towing Software Company",
    primaryApp: "Secondary",
    primaryClient: "Copart",
    assumedReality: "Poorly ran organization that had no idea how to build software. This type of organization and industry needs to be re-invented and requires knowledge that may be a security concern for the nation and the world. Could make for a good story and example of how to improve critical infrastructure",
  },
  securityConcerns: [
    "Accounting was separated from Software (possibly good practice, but unusual)",
    "Overall security was terrible",
    "Code quality was terrible",
    "Sending gift cards instead of actual payments",
    "Form entry was terrible",
    "Had EIN information for tons of towing vendors with insecure systems",
    "Potential threat to national security due to data exposure",
  ],
  legitimacyQuestions: [
    "Was TransitPros even a real organization?",
    "Only saw a few employees (could have worked remotely)",
    "Gift cards being sent instead of payments",
    "Did not see actual users on observability implementation when released to production",
    "Many odd things in general",
  ],
  perspectives: [
    {
      type: "random",
      title: "Poorly Run Organization",
      description: "Just a disorganized company with poor security practices and inexperienced management. Gift cards may have been due to accounting/security issues rather than malice.",
      likelihood: "high",
      icon: <BusinessIcon />,
      color: "#757575",
    },
    {
      type: "criminal",
      title: "Money Laundering Front",
      description: "Gift cards being sent, separated accounting, lack of visible users could indicate money laundering operation or shell company.",
      likelihood: "low",
      icon: <CriminalIcon />,
      color: "#d32f2f",
      evidence: [
        "Gift cards instead of real payments",
        "No visible users on production observability",
        "Separated accounting from software",
      ],
    },
    {
      type: "government",
      title: "Government Entity / Observation",
      description: "Towing industry connection could provide national security interest. Company may have been used for observation purposes.",
      likelihood: "low",
      icon: <GovernmentIcon />,
      color: "#388e3c",
      evidence: [
        "Towing industry has national security implications",
        "Access to EIN data for many vendors",
        "Connection to potential Talcove work",
      ],
    },
  ],
  learnings: [
    "Engagement and motivation strategies",
    "Education technology approaches",
    "Call center operations",
    "AI implementation patterns",
    "Observability and monitoring",
    "What NOT to do in software development",
    "Importance of security practices",
  ],
  towingAppOpportunity: {
    problem: "Towing industry has significant confusion, fraud, and poor technology. This impacts insurance industry and causes stress during already stressful times.",
    proposedSolution: "Police towing auto dispatch App marketplace with vision AI, location-based coordinates, and LLM querying. Create a solution for Police forces that enforces industry standard pricing while delivering a really good user experience.",
    potentialPartner: "Talcove - could combine and merge into innovative platform, or serve as alternative replacement. TransitPros has existing data which could be purchased, plus specialized knowledge for heavy equipment towing.",
    benefits: [
      "Reduce confusion in towing industry",
      "Combat fraud",
      "Improve insurance industry efficiency",
      "Reduce stress for people during difficult situations",
      "Modernize outdated systems",
    ],
    requirements: [
      "Application modernization",
      "Improved security architecture",
      "Proper payment system (no gift cards)",
      "Better culture and management",
      "External guidance and oversight",
    ],
  },
  connection: {
    toMainStory: "Doubt this was connected to casino events, but interesting data point during same time period",
    cultureEmail: "Mentioned laughter/smiley faces - possible connection to Crow Coffee/Whole Foods smiley face hats",
  },
};

export default function TransitPros() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <TowingIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography variant="h4">TransitPros</Typography>
      </Stack>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Employer details, security concerns, and potential opportunity analysis.
      </Typography>

      {/* Assumed Reality Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2">Assumed Reality</Typography>
        <Typography variant="body2">
          {transitProsData.company.assumedReality}. Regardless, learned a lot here. Thankful for that.
        </Typography>
      </Alert>

      {/* Towing App Opportunity - Moved to Top */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: 'rgba(25, 118, 210, 0.05)', border: '1px solid', borderColor: 'primary.light' }}>
        <Typography variant="h6" gutterBottom color="primary">
          <IdeaIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Towing App Opportunity
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          If TransitPros is a legitimate company (not connected to criminal activity), there may be significant opportunity.
        </Typography>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">The Problem</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary">
              {transitProsData.towingAppOpportunity.problem}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Proposed Solution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {transitProsData.towingAppOpportunity.proposedSolution}
            </Typography>
            <Typography variant="body2">
              <strong>Potential Partner:</strong> {transitProsData.towingAppOpportunity.potentialPartner}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Benefits</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {transitProsData.towingAppOpportunity.benefits.map((b, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckIcon color="success" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={b} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">Requirements</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {transitProsData.towingAppOpportunity.requirements.map((r, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CancelIcon color="warning" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={r} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>

      <Grid container spacing={3}>
        {/* Company Overview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Company Overview
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Company Name" secondary={transitProsData.company.name} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Type" secondary={transitProsData.company.type} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Primary Application" secondary={transitProsData.company.primaryApp} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Primary Client" secondary={transitProsData.company.primaryClient} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Security Concerns */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%', borderLeft: '4px solid', borderColor: 'error.main' }}>
            <Typography variant="h6" gutterBottom color="error">
              <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Security Concerns
            </Typography>
            <List dense>
              {transitProsData.securityConcerns.map((concern, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <WarningIcon color="error" sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText primary={concern} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Legitimacy Questions */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              <QuestionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Legitimacy Questions
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {transitProsData.legitimacyQuestions.map((q, i) => (
                <Chip
                  key={i}
                  label={q}
                  variant="outlined"
                  color="warning"
                  icon={<QuestionIcon />}
                />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Perspectives */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Interpretation Perspectives
            </Typography>
            <Grid container spacing={2}>
              {transitProsData.perspectives.map((persp, i) => (
                <Grid key={i} size={{ xs: 12, md: 4 }}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      height: '100%',
                      borderLeft: '4px solid',
                      borderLeftColor: persp.color,
                    }}
                  >
                    <CardContent>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Box sx={{ color: persp.color }}>{persp.icon}</Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {persp.title}
                        </Typography>
                      </Stack>
                      <Chip 
                        size="small" 
                        label={`${persp.likelihood} likelihood`}
                        sx={{ 
                          mb: 1,
                          backgroundColor: persp.likelihood === 'high' ? '#4caf50' : 
                                          persp.likelihood === 'medium' ? '#ff9800' : '#f44336',
                          color: 'white',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {persp.description}
                      </Typography>
                      {persp.evidence && (
                        <>
                          <Typography variant="caption" fontWeight="bold">Evidence:</Typography>
                          <List dense disablePadding>
                            {persp.evidence.map((e, j) => (
                              <ListItem key={j} disableGutters sx={{ py: 0 }}>
                                <ListItemText 
                                  primary={`• ${e}`} 
                                  primaryTypographyProps={{ variant: 'caption' }} 
                                />
                              </ListItem>
                            ))}
                          </List>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* What I Learned */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              <LearningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              What I Learned
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Despite the concerns, this experience provided valuable learning opportunities.
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
              {transitProsData.learnings.map((learning, i) => (
                <Chip key={i} size="small" label={learning} color="primary" variant="outlined" />
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Connection to Main Story */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Connection to Main Events
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              {transitProsData.connection.toMainStory}
            </Alert>
            <Typography variant="body2" color="text.secondary">
              <strong>Culture Email Note:</strong> {transitProsData.connection.cultureEmail}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
