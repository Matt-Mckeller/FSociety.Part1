'use client';

import { useState } from 'react';
import { Box, Fade } from '@mui/material';
import { Navbar, Footer } from '@/components/layout';
import {
  HeroSection,
  FeaturesSection,
  UseCasesSection,
  HowItWorksSection,
  PricingSection,
  CTASection,
} from '@/components/landing';
import { IntroFlow } from '@/components/landing/intro';

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <Box>
      {!introDone && <IntroFlow onFinished={() => setIntroDone(true)} />}

      {introDone && (
        <Fade in timeout={400}>
          <Box>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <UseCasesSection />
            <HowItWorksSection />
            <PricingSection />
            <CTASection />
            <Footer />
          </Box>
        </Fade>
      )}
    </Box>
  );
}
