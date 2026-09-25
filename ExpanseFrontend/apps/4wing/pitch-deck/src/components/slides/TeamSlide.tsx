'use client';

import { Box, Typography, Grid, Card, CardContent, Stack, Avatar, Chip } from '@mui/material';
import SlideLayout from '../SlideLayout';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const team = [
  {
    name: 'Matthew McKeller',
    role: 'Co-Founder & CEO',
    background: 'Full-stack engineer, 10+ years in startups',
    expertise: ['Product', 'Engineering', 'AI/ML'],
    color: '#7C3AED',
    initials: 'MM',
  },
  {
    name: 'Wren Support',
    role: 'Co-Founder & CTO',
    background: 'ML engineer, ex-FAANG',
    expertise: ['Machine Learning', 'NLP', 'Systems'],
    color: '#EC4899',
    initials: 'LW',
  },
  {
    name: 'Mixed Berries',
    role: 'Co-Founder & CPO',
    background: 'Product designer, mental health advocate',
    expertise: ['UX Design', 'Mental Health', 'Strategy'],
    color: '#10B981',
    initials: 'JZ',
  },
];

const advisors = [
  'Licensed Clinical Psychologist (Advisory)',
  'Healthcare SaaS Veteran',
  'AI Ethics Researcher',
];

export default function TeamSlide() {
  return (
    <SlideLayout background="gradient">
      <Box sx={{ textAlign: 'center', mb: 4, width: '100%' }}>
        <Typography
          variant="h2"
          sx={{
            mb: 1.5,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
          }}
        >
          The Team
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: 'text.secondary', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}
        >
          Passionate builders with complementary skills
        </Typography>
      </Box>

      <Grid container spacing={2.5} sx={{ maxWidth: 960, mb: 3, width: '100%' }}>
        {team.map((member, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Card
              sx={{
                height: '100%',
                background: '#FFFFFF',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${member.color}20`,
                  border: `1px solid ${member.color}50`,
                },
              }}
            >
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}80 100%)`,
                    boxShadow: `0 8px 24px ${member.color}40`,
                  }}
                >
                  {member.initials}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: member.color, fontWeight: 600, mb: 1.5 }}
                >
                  {member.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', mb: 2 }}
                >
                  {member.background}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" useFlexGap>
                  {member.expertise.map((skill, i) => (
                    <Chip
                      key={i}
                      label={skill}
                      size="small"
                      sx={{
                        background: `${member.color}20`,
                        color: member.color,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Advisors */}
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, textAlign: 'center' }}>
            Advisory Board
          </Typography>
          <Stack spacing={1.5}>
            {advisors.map((advisor, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {advisor}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </SlideLayout>
  );
}
