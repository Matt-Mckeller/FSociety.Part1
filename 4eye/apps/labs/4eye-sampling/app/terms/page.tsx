import { Box, Container, Typography, Paper } from '@mui/material';
import { Navbar, Footer } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - 4eye.ai',
  description: 'Terms of Service for 4eye.ai - AI-powered learning platform',
};

export default function TermsPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="laptop" sx={{ pt: 12, pb: 6 }}>
        <Paper sx={{ p: { zero: 3, laptop: 5 } }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{
            fontWeight: 700
          }}>
            Terms of Service
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 4
            }}>
            Last updated: March 18, 2026
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            1. Acceptance of Terms
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            By accessing or using 4eye.ai (&quot;Service&quot;), you agree to be bound by these Terms of Service.
            If you disagree with any part of these terms, you may not access the Service.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            2. Description of Service
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            4eye.ai is an AI-powered learning platform that provides:
          </Typography>
          <ul>
            <li>Real-time audio transcription</li>
            <li>Language translation</li>
            <li>AI-generated learning aids (summaries, quizzes, visuals)</li>
            <li>Recording and playback capabilities</li>
            <li>Collaborative learning rooms</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            3. User Accounts
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            To use certain features, you must create an account. You are responsible for:
          </Typography>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and current information</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            4. Acceptable Use
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            You agree not to:
          </Typography>
          <ul>
            <li>Use the Service for any illegal purpose</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Upload malicious code or interfere with the Service</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Attempt to gain unauthorized access to the Service</li>
            <li>Use the Service to generate harmful, misleading, or illegal content</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            5. Content and Recordings
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 2
            }}>
            5.1 Your Content
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            You retain ownership of content you create or upload. By using the Service, you grant
            us a license to process, store, and display your content as necessary to provide the Service.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 2
            }}>
            5.2 Recording Consent
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            If you host a room with recording enabled, you are responsible for:
          </Typography>
          <ul>
            <li>Obtaining consent from all participants before recording</li>
            <li>Complying with applicable recording laws in your jurisdiction</li>
            <li>Clearly notifying participants that recording is in progress</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            6. Subscription and Payment
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Some features require a paid subscription. Payment terms:
          </Typography>
          <ul>
            <li>Subscriptions are billed in advance on a monthly or annual basis</li>
            <li>You authorize us to charge your payment method for all applicable fees</li>
            <li>Prices may change with 30 days notice to existing subscribers</li>
            <li>Refunds are handled according to our refund policy</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            7. Intellectual Property
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            The Service, including its design, features, and content created by 4eye.ai, is protected
            by intellectual property laws. You may not copy, modify, or distribute our intellectual
            property without permission.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            8. AI-Generated Content
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Content generated by our AI features (summaries, quizzes, translations, visuals) is
            provided for educational purposes. While we strive for accuracy:
          </Typography>
          <ul>
            <li>AI-generated content may contain errors or inaccuracies</li>
            <li>You should verify important information independently</li>
            <li>We are not liable for decisions made based on AI-generated content</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            9. Disclaimers
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL
            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, AND NON-INFRINGEMENT.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            10. Limitation of Liability
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, 4EYE.AI SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
            REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            11. Termination
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We may terminate or suspend your account immediately, without prior notice, for any
            reason, including breach of these Terms. Upon termination, your right to use the
            Service will cease immediately.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            12. Changes to Terms
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We reserve the right to modify these terms at any time. We will notify users of
            material changes via email or prominent notice on the Service. Continued use after
            changes constitutes acceptance of the new terms.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            13. Governing Law
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            These Terms shall be governed by the laws of the State of Delaware, United States,
            without regard to its conflict of law provisions.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            14. Contact Us
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            If you have questions about these Terms, please contact us at:
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Email: legal@4eye.ai
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
