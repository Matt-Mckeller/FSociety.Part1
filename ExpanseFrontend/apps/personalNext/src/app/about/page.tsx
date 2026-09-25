import React from "react"
import { Box, Typography, Container } from "@mui/material"
import { Metadata } from "next"
import { SectionSpacer, TypographyResponsive } from "expanse.ui/theme"

export const metadata: Metadata = {
  title: "About Expanse",
  description: "Learn about Expanse - innovating the future of work through learning, gamification, and engagement.",
}

export default function About() {
  return (
    <Container maxWidth="md">
      <SectionSpacer size="large" />
      
      <TypographyResponsive
        variant="h1"
        desiredLineCount={1}
        sx={{ textAlign: "center", mb: 4 }}
      >
        About Expanse
      </TypographyResponsive>

      <Box mb={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Expanse builds innovative software solutions that transform how people
          learn, work, and engage. We combine cutting-edge technology with deep
          expertise in gamification, user experience, and mental health to create
          products that make a meaningful impact.
        </Typography>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          What We Do
        </Typography>
        <Typography variant="body1" paragraph>
          We specialize in creating engaging digital experiences that drive real
          results. From educational platforms that make learning fun, to productivity
          tools that support wellbeing, our products are designed with purpose.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team brings together expertise in software development, product design,
          and behavioral science to create solutions that truly work for users.
        </Typography>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Our Focus Areas
        </Typography>
        <Typography variant="body1" component="ul" sx={{ pl: 3 }}>
          <li>Learning & Education Technology</li>
          <li>Gamification & Engagement</li>
          <li>Mental Health & Wellbeing</li>
          <li>User Experience Design</li>
          <li>Innovation & Product Development</li>
        </Typography>
      </Box>

      <Box mb={6}>
        <Typography variant="h4" component="h2" gutterBottom>
          Why Expanse?
        </Typography>
        <Typography variant="body1" paragraph>
          We believe technology should empower people, not overwhelm them. Every
          product we build starts with a simple question: how can we make this
          experience better for the people who use it?
        </Typography>
        <Typography variant="body1" paragraph>
          Our commitment to user-centered design, combined with technical excellence,
          means we deliver solutions that are both powerful and intuitive.
        </Typography>
      </Box>

      <SectionSpacer size="large" />
    </Container>
  )
}
