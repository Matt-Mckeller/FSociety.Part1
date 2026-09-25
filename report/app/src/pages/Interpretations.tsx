import { Box, Paper, Typography, Chip, Stack, Card, CardContent, Grid, Alert, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
  Gavel as CriminalIcon,
  TrendingUp as BusinessIcon,
  AccountBalance as GovernmentIcon,
  Help as RandomIcon,
  CheckCircle as SupportIcon,
  Cancel as ContradictIcon,
  Lightbulb as ImplicationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

// Interpretation summaries from requests-and-status.md
const interpretationsData = {
  criminal: {
    title: "Criminal Organization",
    icon: <CriminalIcon />,
    color: "#d32f2f",
    likelihood: "High",
    likelihoodPercent: 70,
    summary: "Accidentally got entangled in a money laundering/organized criminal group by going to a casino, telling stories, and accidentally uncovering a system for laundering money through poker using nonverbals. Multiple events suggest people are following and listening from my apartment. They likely want me to launder money - this is open ended and possible, but I have nothing to launder, nothing to sell, nothing illegal.",
    implications: [
      "Could be mistaken for someone with criminal connections due to background (father's history, bankruptcy, cash lifestyle)",
      "May have accidentally built trust by teaching/communicating through nonverbals and leading + personality",
      "Left situation open-ended which could be used for follow-up",
    ],
    supportingEvidence: [
      "Mac Properties ticket returned at casino",
      "Dealer knew about father's criminal history",
      "Banker made cryptic investment offer ('coins man, do you want me to invest?')",
      "Apartment entry evidence ($20 in ones, moved folders, pot smell)",
      "Logan's 'Lysol' comment proving surveillance",
      "Pick Pocketed ID at Tin Roof",
    ],
  },
  business: {
    title: "Business/Investor",
    icon: <BusinessIcon />,
    color: "#1976d2",
    likelihood: "Medium",
    likelihoodPercent: 40,
    summary: "My knowledge, story, and combination of skills, background, and other factors could have attracted interest including my business plans and focus areas/purpose and innovative methods combined with AI. Additionally, there are other reasons to believe large organizations are observing but this seems separate from the actual concerns and is likely a combination factor I am still trying to figure out. Its one of the reasons I want a good linux setup but also the fucking mac touchpad is so nice. Also, the quality of interaction difference between the crime events mentioned here and those were on completely different levels and non threatening more educational and supportive.",
    implications: [
      "Intelligence, interesting story, great purpose, fantastic and uncommon skill combinations",
      "Sent emails to Google, Kahoot, and higher level PMs regarding company plans",
      "Utilize AI for my business plans. However switched to primarily use claude for this and the fact that its REALLY good at coding.",
      "Q and Bar Rec could have been supportive data for Expanse.",
    ],
    supportingEvidence: [
      "Personal Evidence: Knowledge, tons of plans, a brand, etc",
      "Clubs opening with themes matching my work/brand (gamification, Q logo similarity)",
      "Learning opportunities provided",
      "Other unmentioned strange events",
    ],
  },
  government: {
    title: "Government Entity",
    icon: <GovernmentIcon />,
    color: "#388e3c",
    likelihood: "Low",
    likelihoodPercent: 15,
    summary: "Could have been government observation due to TransitPros work, SCIF research, financial activity patterns ( bankruptcy, not paying taxes ), personality, behavior, habits, family history/father, etc. Some events could indicate testing or observation. Possibly trying to set me up, test me, or teach me, idk.",
    implications: [
      "TransitPros had connections to towing industry (potential national security interest)",
      "SCIF research and speaking about it in potentially tapped apartment",
      "Smiley face hats at Crow and Whole Foods could relate to TransitPros/Google email and Expanse",
    ],
    supportingEvidence: [
      "Little to none",
      "Interactions with people that look like Talcove and cookies",
      "Hats with Draft Kings and Otto written on them ( like 7 of them ) after an email. Could have also been google.",
    ],
  },
  random: {
    title: "Random/Coincidence",
    icon: <RandomIcon />,
    color: "#757575",
    likelihood: "Partial",
    likelihoodPercent: 20,
    summary: "Some events are likely unrelated. The threshold for coincidence is exceeded when multiple specific, personalized references occur in sequence.",
    mostLikelyRandom: [
      "Bitcoin backpack girl (common item)",
      "Towing truck with small house",
      "Cigarette positioning",
      "Some club interactions",
    ],
    leastLikelyRandom: [
      "Two dealers named Matthew and Shane (first + middle name)",
      "Lysol mentioned by Logan (was on nightstand where the 1$ bills were)",
      "Mac Properties ticket appearing at casino",
      "$20 in ones after 'break into small pieces' conversation",
    ],
  },
  whatIBelieve: {
    summary: "Accidentally attracted attention at casino through storytelling and discovered/participated in nonverbal signaling system. Was observed and tested. Mac Properties appears connected to casinos. Apartment was under surveillance. The situation was left open-ended for potential follow-up, but I have no illegal activities, nothing to hide (except business IP), and just want to work on my companies. Although did play along and engage to an extent to learn more and see what was happening. Overall believe criminal organization involvement is most likely with potential business/investor interest secondary and government observation least likely with a setup for follow-up on all angles depending on what is real.",
  },
  potentialOutcomes: {
    bestCase: [
      "Everything is fine, no ongoing threat",
      "Can use story for marketing/company launches and teaching",
      "Learn from experience and improve security knowledge",
      "Unicorn support",
      "Learn from experience and develop nonverbal teaching tools for EDU while also building reports and recaping events",
      "Making movies and content about the experience",
      "More speaking power",
      "I get the recordings",
      "Lessons and stories for how to repeat accross the country.",
    ],
    averageCase: [
      "Everything is fine, no ongoing threat",
      "Can use story for marketing/company launches and teaching",
      "Learn from experience and improve security knowledge",
      "Investigations into Westport Area including Tin Roof, The Tatoo Area, Casinos, etc",
      
      "Unicorn support",
      "Misunderstanding from government agencies",
      "Sharing opinions on the state of the government operations and recommending improvements",
      "I teach, and I learn",
    ],
    worstCase: [
      "Ongoing threat from criminal organization",
      "Identity compromised, potential framing attempts",
      "Need significant lifestyle changes for safety",
      "Potential for framing",
      "Potential for video editing",
      "Potential for buyouts from the women if they can figure out who they are",
      "Potential for identity theft",
      "Potential for physical harm",
      "Potential for device compromise including usbs",
      "May have accidentally spoken about observability methods into tapped mic, but not in full detail. However, AI and web has knowledge which is where I got most of it.",
    ],
  },
};

export default function Interpretations() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        High-Level Interpretations
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Analysis of events through different perspective lenses, with supporting evidence and implications.
      </Typography>

      {/* What I Believe Summary */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>What I Believe Happened</Typography>
        <Typography variant="body2">{interpretationsData.whatIBelieve.summary}</Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Criminal Perspective */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%', borderLeft: '6px solid', borderColor: interpretationsData.criminal.color }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ color: interpretationsData.criminal.color, display: 'flex' }}>
                    {interpretationsData.criminal.icon}
                  </Box>
                  <Typography variant="h5">{interpretationsData.criminal.title}</Typography>
                </Stack>
                <Chip 
                  label={`${interpretationsData.criminal.likelihood} (${interpretationsData.criminal.likelihoodPercent}%)`}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(211, 47, 47, 0.15)',
                    color: '#d32f2f',
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {interpretationsData.criminal.summary}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <ImplicationIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                Implication Potential
              </Typography>
              <List dense disablePadding sx={{ mb: 2 }}>
                {interpretationsData.criminal.implications.map((imp, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <PersonIcon sx={{ fontSize: 14, color: interpretationsData.criminal.color }} />
                    </ListItemIcon>
                    <ListItemText primary={imp} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <SupportIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5, color: 'success.main' }} />
                Supporting Evidence
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {interpretationsData.criminal.supportingEvidence.map((ev, i) => (
                  <Chip key={i} size="small" label={ev} variant="outlined" sx={{ fontSize: '0.7rem' }} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Perspective */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%', borderLeft: '6px solid', borderColor: interpretationsData.business.color }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ color: interpretationsData.business.color, display: 'flex' }}>
                    {interpretationsData.business.icon}
                  </Box>
                  <Typography variant="h5">{interpretationsData.business.title}</Typography>
                </Stack>
                <Chip 
                  label={`${interpretationsData.business.likelihood} (${interpretationsData.business.likelihoodPercent}%)`}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(25, 118, 210, 0.15)',
                    color: '#1976d2',
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {interpretationsData.business.summary}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <ImplicationIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                Implication Potential
              </Typography>
              <List dense disablePadding sx={{ mb: 2 }}>
                {interpretationsData.business.implications.map((imp, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <PersonIcon sx={{ fontSize: 14, color: interpretationsData.business.color }} />
                    </ListItemIcon>
                    <ListItemText primary={imp} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <SupportIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5, color: 'success.main' }} />
                Supporting Evidence
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {interpretationsData.business.supportingEvidence.map((ev, i) => (
                  <Chip key={i} size="small" label={ev} variant="outlined" sx={{ fontSize: '0.7rem' }} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Government Perspective */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%', borderLeft: '6px solid', borderColor: interpretationsData.government.color }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ color: interpretationsData.government.color, display: 'flex' }}>
                    {interpretationsData.government.icon}
                  </Box>
                  <Typography variant="h5">{interpretationsData.government.title}</Typography>
                </Stack>
                <Chip 
                  label={`${interpretationsData.government.likelihood} (${interpretationsData.government.likelihoodPercent}%)`}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(56, 142, 60, 0.15)',
                    color: '#388e3c',
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {interpretationsData.government.summary}
              </Typography>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <ImplicationIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5 }} />
                Implication Potential
              </Typography>
              <List dense disablePadding sx={{ mb: 2 }}>
                {interpretationsData.government.implications.map((imp, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 24 }}>
                      <PersonIcon sx={{ fontSize: 14, color: interpretationsData.government.color }} />
                    </ListItemIcon>
                    <ListItemText primary={imp} primaryTypographyProps={{ variant: 'body2' }} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                <SupportIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 0.5, color: 'success.main' }} />
                Supporting Evidence
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                {interpretationsData.government.supportingEvidence.map((ev, i) => (
                  <Chip key={i} size="small" label={ev} variant="outlined" sx={{ fontSize: '0.7rem' }} />
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Random/Coincidence Perspective */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: '100%', borderLeft: '6px solid', borderColor: interpretationsData.random.color }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ color: interpretationsData.random.color, display: 'flex' }}>
                    {interpretationsData.random.icon}
                  </Box>
                  <Typography variant="h5">{interpretationsData.random.title}</Typography>
                </Stack>
                <Chip 
                  label={`${interpretationsData.random.likelihood} (${interpretationsData.random.likelihoodPercent}%)`}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(117, 117, 117, 0.15)',
                    color: '#757575',
                    fontWeight: 600,
                  }}
                />
              </Stack>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {interpretationsData.random.summary}
              </Typography>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Most Likely Random
                  </Typography>
                  <List dense disablePadding>
                    {interpretationsData.random.mostLikelyRandom.map((item, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                        <ListItemText primary={`• ${item}`} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid size={6}>
                  <Typography variant="subtitle2" color="error" sx={{ mb: 1 }}>
                    Least Likely Random
                  </Typography>
                  <List dense disablePadding>
                    {interpretationsData.random.leastLikelyRandom.map((item, i) => (
                      <ListItem key={i} disableGutters sx={{ py: 0.25 }}>
                        <ListItemText primary={`• ${item}`} primaryTypographyProps={{ variant: 'body2' }} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Potential Outcomes */}
        <Grid size={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Potential Outcomes
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '100%', backgroundColor: 'rgba(76, 175, 80, 0.05)', border: '1px solid', borderColor: 'success.light' }}>
            <Typography variant="h6" color="success.main" gutterBottom>
              ✓ Best Case
            </Typography>
            <List dense>
              {interpretationsData.potentialOutcomes.bestCase.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <SupportIcon color="success" sx={{ fontSize: 16 }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '100%', backgroundColor: 'rgba(255, 152, 0, 0.05)', border: '1px solid', borderColor: 'warning.light' }}>
            <Typography variant="h6" color="warning.main" gutterBottom>
              ~ Average Case
            </Typography>
            <List dense>
              {interpretationsData.potentialOutcomes.averageCase.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <SupportIcon color="warning" sx={{ fontSize: 16 }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, height: '100%', backgroundColor: 'rgba(244, 67, 54, 0.05)', border: '1px solid', borderColor: 'error.light' }}>
            <Typography variant="h6" color="error.main" gutterBottom>
              ✗ Worst Case
            </Typography>
            <List dense>
              {interpretationsData.potentialOutcomes.worstCase.map((item, i) => (
                <ListItem key={i} disableGutters>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    <ContradictIcon color="error" sx={{ fontSize: 16 }} />
                  </ListItemIcon>
                  <ListItemText primary={item} primaryTypographyProps={{ variant: 'body2' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
