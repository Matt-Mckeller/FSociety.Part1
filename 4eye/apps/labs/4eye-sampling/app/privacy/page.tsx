import { Box, Container, Typography, Paper } from '@mui/material';
import { Navbar, Footer } from '@/components/layout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - 4eye.ai',
  description: 'Privacy Policy for 4eye.ai - AI-powered learning platform',
};

export default function PrivacyPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container maxWidth="laptop" sx={{ pt: 12, pb: 6 }}>
        <Paper sx={{ p: { zero: 3, laptop: 5 } }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{
            fontWeight: 700
          }}>
            Privacy Policy
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
            1. Introduction
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            4eye.ai (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you use our AI-powered learning platform.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            2. Information We Collect
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 2
            }}>
            2.1 Personal Information
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We may collect personal information that you voluntarily provide to us when you:
          </Typography>
          <ul>
            <li>Create an account (name, email address)</li>
            <li>Subscribe to our services (payment information via Stripe)</li>
            <li>Contact us for support</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 2
            }}>
            2.2 Audio and Transcript Data
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            When you use our transcription services, we process audio data to generate transcripts.
            This data is processed in accordance with your consent and room settings. You control
            whether recordings are saved or deleted after processing.
          </Typography>

          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 2
            }}>
            2.3 Usage Data
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We automatically collect certain information when you access our services, including
            device information, IP address, browser type, and usage patterns. This helps us improve
            our services and detect security issues.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            3. How We Use Your Information
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We use the information we collect to:
          </Typography>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative notifications and updates</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Protect against fraudulent or unauthorized activity</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            4. AI Processing
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Our services use artificial intelligence to:
          </Typography>
          <ul>
            <li>Transcribe audio to text</li>
            <li>Translate content between languages</li>
            <li>Generate summaries, quizzes, and learning aids</li>
            <li>Create visual representations of content</li>
          </ul>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            AI processing is performed on secure servers. We do not use your personal content
            to train AI models without explicit consent.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            5. Data Sharing
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We do not sell your personal information. We may share your data with:
          </Typography>
          <ul>
            <li>Service providers who assist in operating our platform (hosting, payments, analytics)</li>
            <li>Law enforcement when required by law</li>
            <li>Other users only as you direct (e.g., sharing rooms)</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            6. Data Retention
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We retain your personal information for as long as your account is active or as needed
            to provide services. You can request deletion of your data at any time through your
            account settings or by contacting us.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            7. Your Rights
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Depending on your location, you may have rights including:
          </Typography>
          <ul>
            <li>Access to your personal data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data (right to be forgotten)</li>
            <li>Data portability</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            8. Security
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            We implement appropriate technical and organizational measures to protect your data,
            including encryption in transit and at rest, access controls, and regular security audits.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            9. Children&apos;s Privacy
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Our services are not directed to children under 13. If you believe a child has provided
            us with personal information, please contact us immediately.
          </Typography>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 600,
              mt: 4
            }}>
            10. Contact Us
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            If you have questions about this Privacy Policy, please contact us at:
          </Typography>
          <Typography sx={{
            marginBottom: "16px"
          }}>
            Email: privacy@4eye.ai
          </Typography>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}
