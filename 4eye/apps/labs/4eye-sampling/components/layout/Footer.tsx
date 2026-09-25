'use client';

import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import { Twitter, LinkedIn, YouTube } from '@mui/icons-material';
import Link from 'next/link';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Use Cases', href: '#use-cases' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.100',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="desktop">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { zero: '1fr', tablet: 'repeat(2, 1fr)', laptop: 'repeat(4, 1fr)' },
            gap: 4,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h6" color="primary" gutterBottom sx={{
              fontWeight: 700
            }}>
              4eye.ai
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 2
              }}>
              AI-powered learning that transforms any audio into personalized learning experiences.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                component="a"
                href="https://twitter.com/4eye_ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="https://linkedin.com/company/4eye-ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                component="a"
                href="https://youtube.com/@4eye_ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{
              fontWeight: 600
            }}>
              Product
            </Typography>
            <Stack spacing={1}>
              {footerLinks.product.map((link) => (
                <MuiLink
                  key={link.href}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    fontSize: '0.875rem'
                  }}>
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{
              fontWeight: 600
            }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {footerLinks.company.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    fontSize: '0.875rem'
                  }}>
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{
              fontWeight: 600
            }}>
              Legal
            </Typography>
            <Stack spacing={1}>
              {footerLinks.legal.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  underline="hover"
                  sx={{
                    color: "text.secondary",
                    fontSize: '0.875rem'
                  }}>
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            textAlign: "center"
          }}>
          © {new Date().getFullYear()} 4eye.ai. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
