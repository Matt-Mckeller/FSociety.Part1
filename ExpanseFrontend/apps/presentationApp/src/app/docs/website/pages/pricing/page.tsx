'use client';

import { 
  Typography, 
  Box, 
  Paper,
  Grid,
  Stack,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// ============================================================================
// Data
// ============================================================================

const pageInfo = {
  name: 'Pricing',
  path: '/pricing',
  status: 'not-started' as const,
  progress: 0,
  priority: 'P0' as const,
};

const pageGoals = [
  { goal: 'Clearly present pricing tiers and what\'s included', complete: false },
  { goal: 'Make it easy to compare plans', complete: false },
  { goal: 'Minimize friction to sign up or contact sales', complete: false },
  { goal: 'Address common pricing objections in FAQ', complete: false },
];

const sections = [
  {
    name: 'Pricing Hero',
    description: 'Simple headline with plan toggle (monthly/annual)',
    status: 'planned',
    content: [
      'Clear, simple headline',
      'Monthly/Annual toggle with savings highlight',
      'Optional: "Most popular" or social proof',
    ],
  },
  {
    name: 'Pricing Cards',
    description: 'Plan comparison cards',
    status: 'planned',
    content: [
      'Plan name and price',
      'Key features list (5-8 items)',
      'CTA button per plan',
      'Highlight recommended plan',
      'Enterprise: "Contact Sales"',
    ],
  },
  {
    name: 'Feature Comparison Table',
    description: 'Detailed feature availability by plan',
    status: 'planned',
    content: [
      'All features in rows',
      'Check/X for each plan column',
      'Collapsible feature categories',
    ],
  },
  {
    name: 'FAQ Section',
    description: 'Common pricing and billing questions',
    status: 'planned',
    content: [
      'Can I switch plans?',
      'What payment methods do you accept?',
      'Is there a free trial?',
      'Can I cancel anytime?',
      'Do you offer refunds?',
    ],
  },
  {
    name: 'Enterprise CTA',
    description: 'Custom enterprise solution section',
    status: 'planned',
    content: [
      'Enterprise benefits summary',
      'Contact sales form or link',
      'Trust badges/compliance logos',
    ],
  },
];

const pricingTiers = [
  { name: 'Starter', price: '$XX/mo', target: 'Small teams', features: 5 },
  { name: 'Professional', price: '$XX/mo', target: 'Growing businesses', features: 10, recommended: true },
  { name: 'Enterprise', price: 'Custom', target: 'Large organizations', features: 'All' },
];

// ============================================================================
// Main Page
// ============================================================================

export default function PricingPlanningPage() {
  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: '#dcfce7', borderRadius: 2 }}>
            <AttachMoneyIcon sx={{ fontSize: 32, color: '#10b981' }} />
          </Paper>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {pageInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Path: <code>{pageInfo.path}</code> • Priority: {pageInfo.priority}
            </Typography>
          </Box>
        </Box>

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>Progress</Typography>
            <Chip label={pageInfo.status.replace('-', ' ')} size="small" sx={{ bgcolor: '#f1f5f9', textTransform: 'capitalize' }} />
          </Box>
          <LinearProgress variant="determinate" value={pageInfo.progress} sx={{ height: 8, borderRadius: 4 }} />
        </Paper>
      </Box>

      {/* Pricing Tiers Overview */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Planned Pricing Tiers</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {pricingTiers.map((tier, i) => (
          <Grid item xs={12} sm={4} key={i}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                borderColor: tier.recommended ? '#3b82f6' : undefined,
                borderWidth: tier.recommended ? 2 : 1,
              }}
            >
              {tier.recommended && (
                <Chip label="Recommended" size="small" sx={{ bgcolor: '#3b82f6', color: 'white', mb: 1 }} />
              )}
              <Typography variant="h6" fontWeight={700}>{tier.name}</Typography>
              <Typography variant="h5" fontWeight={700} color="primary" sx={{ my: 1 }}>{tier.price}</Typography>
              <Typography variant="body2" color="text.secondary">{tier.target}</Typography>
              <Typography variant="caption" color="text.secondary">{tier.features} features</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Goals */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Page Goals</Typography>
      <Paper variant="outlined" sx={{ p: 2, mb: 4 }}>
        <Stack spacing={1}>
          {pageGoals.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <RadioButtonUncheckedIcon sx={{ color: '#cbd5e1', fontSize: 20 }} />
              <Typography variant="body2">{item.goal}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Sections */}
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Page Sections</Typography>
      <Box sx={{ mb: 4 }}>
        {sections.map((section, i) => (
          <Accordion key={i} sx={{ border: '1px solid #e2e8f0', '&:before': { display: 'none' }, borderRadius: '8px !important', mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fafafa' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <RadioButtonUncheckedIcon sx={{ color: '#cbd5e1' }} />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>{section.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{section.description}</Typography>
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="caption" fontWeight={600} display="block" sx={{ mb: 1 }}>Content Requirements</Typography>
              <Stack spacing={0.5}>
                {section.content.map((item, j) => (
                  <Typography key={j} variant="body2" color="text.secondary">• {item}</Typography>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}
