"use client"

import { Box, Container } from "@mui/material"
import {
  QuickWinsAppBar,
  Section,
  OverviewCards,
  ObjectivesList,
  PriorityActions,
  AIGuidanceSection,
  OperationsSection,
  CultureSection,
  KnowledgeSection,
  HowWeLearnSection,
  KPIsSection,
  ImplementationSection,
  QuickWinsFooter,
  Quiz,
  ChatAssistant,
} from "../../modules/quick-wins-guide"
import "../../modules/quick-wins-guide/styles/animations.css"

export default function QuickWinsGuideClient() {
  return (
    <Box>
      <QuickWinsAppBar />

      <Container maxWidth="desktop" sx={{ py: 4 }}>
        {/* Overview */}
        <Section id="overview" title="Overview">
          <OverviewCards />
        </Section>

        {/* Objectives */}
        <Section id="objectives" title="Objectives">
          <ObjectivesList />
        </Section>

        {/* Priority Actions */}
        <Section id="quick-wins" title="Priority Actions">
          <PriorityActions />
        </Section>

        {/* AI Guidance */}
        <AIGuidanceSection />

        {/* Operations */}
        <OperationsSection />

        {/* Culture */}
        <CultureSection />

        {/* Knowledge */}
        <KnowledgeSection />

        {/* How We Learn */}
        <HowWeLearnSection />

        {/* KPIs */}
        <KPIsSection />

        {/* Implementation */}
        <ImplementationSection />

        {/* Quiz */}
        <Quiz />
      </Container>

      <QuickWinsFooter />
      <ChatAssistant />
    </Box>
  )
}

