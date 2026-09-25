import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Box } from "@mui/material"
import { SectionRenderer } from "./SectionRenderer"
import { DocsNavigation } from "./DocsNavigation"
import { docsNavigation } from "../../data/docs"
import type { NavItem, SectionId } from "./types"

// Helper function to find parent nav ID for a section
function findParentNavId(sectionId: string): string | null {
  const parentMap: Record<string, string> = {
    // Business
    highlights: "business",
    summary: "business",
    pitches: "business",
    "value-propositions": "business",
    goals: "business",
    "growth-strategy": "business",
    // Product
    features: "product",
    // Ideation
    "ideation-overview": "ideation",
    "ideation-security": "ideation",
    "ideation-economy": "ideation",
    "ideation-rewards": "ideation",
    "ideation-social": "ideation",
    "ideation-education": "ideation",
    "ideation-platform": "ideation",
    "ideation-analytics": "ideation",
    "ideation-learning": "ideation",
    "ideation-priority": "ideation",
    // Marketing
    audience: "marketing",
    personas: "marketing",
    channels: "marketing",
    "sales-insights": "marketing",
    // Technology
    "tech-stack": "technology",
    architecture: "technology",
    integrations: "technology",
    security: "technology",
    // Research
    "research-topics": "research",
    statistics: "research",
    sources: "research",
    // Competition
    competitors: "competition",
    differentiators: "competition",
    "market-weaknesses": "competition",
    // Risks
    "risk-analysis": "risks",
    // Funding
    "funding-status": "funding",
    opportunities: "funding",
    advisors: "funding",
    kpis: "funding",
    "research-tasks": "funding",
    // Users
    customers: "users",
    "user-attributes": "users",
    "target-segments": "users",
    // Psychology
    dopamine: "psychology",
    "positive-reinforcement": "psychology",
    "social-development": "psychology",
    "self-efficacy": "psychology",
    // Mental Health
    "mental-health-stats": "mental-health",
    interventions: "mental-health",
    // Rewards
    "reward-system": "rewards",
    "real-life-rewards": "rewards",
    "in-game-rewards": "rewards",
    // Legal
    compliance: "legal",
    "privacy-security": "legal",
    "legal-risks": "legal",
    // Business Operations
    revenue: "operations",
    "funding-rounds": "operations",
    exits: "operations",
    engagement: "operations",
    gamification: "operations",
    // Go to Market
    "gtm-strategy": "go-to-market",
    "gtm-channels": "go-to-market",
    "gtm-branding": "go-to-market",
    // Case Studies
    "kcps-state-of-education": "case-studies",
    "kcps-overview": "case-studies",
    "kcps-events": "case-studies",
    "kcps-narratives": "case-studies",
    "kcps-personas": "case-studies",
    "kcps-special-ed": "case-studies",
    "kcps-engagement": "case-studies",
    "kcps-classroom-management": "case-studies",
    "kcps-lessons": "case-studies",
    "kcps-recommendations": "case-studies",
    // Game Mechanics
    "game-overview": "game-mechanics",
    "game-currencies": "game-mechanics",
    "game-progression": "game-mechanics",
    "game-quests": "game-mechanics",
    "game-battles": "game-mechanics",
    "game-personalization": "game-mechanics",
    "game-profiles": "game-mechanics",
    "game-stores": "game-mechanics",
    "game-social": "game-mechanics",
    "game-journeys": "game-mechanics",
    "game-rewards": "game-mechanics",
    "game-goals": "game-mechanics",
    "game-rankings": "game-mechanics",
    "game-recognition": "game-mechanics",
    "game-expansions": "game-mechanics",
    "game-negative": "game-mechanics",
    "game-history": "game-mechanics",
    "game-games": "game-mechanics",
    // Monetization
    "monetization-overview": "monetization",
    "monetization-subscriptions": "monetization",
    "monetization-payments": "monetization",
    "monetization-purchases": "monetization",
    "monetization-scholarships": "monetization",
    "monetization-sponsorships": "monetization",
    // Communication
    "comm-overview": "communication",
    "comm-notifications": "communication",
    "comm-parent": "communication",
    "comm-auth": "communication",
    "comm-accounts": "communication",
    // Research Extensions
    "college-readiness": "research-extensions",
    "parent-engagement": "research-extensions",
    "social-media": "research-extensions",
    "social-dynamics": "research-extensions",
    "purpose-motivation": "research-extensions",
    "employee-satisfaction": "research-extensions",
    "survey-strategies": "research-extensions",
    "engagement-research": "research-extensions",
    "gaming-research": "research-extensions",
    "further-reading": "research-extensions",
    // Design Notes
    sdt: "design-notes",
    "design-decisions": "design-notes",
    "motivation-theory": "design-notes",
    "reward-research": "design-notes",
    "ai-usage": "design-notes",
    "inspirational-quotes": "design-notes",
    "reward-examples": "design-notes",
    "future-research": "design-notes",
    // Learning Science
    "attention-science": "learning-science",
    "feedback-systems": "learning-science",
    "learning-reinforcement": "learning-science",
    "learning-agility": "learning-science",
    "progress-tracking": "learning-science",
    "reward-psychology": "learning-science",
    "purpose-mission": "learning-science",
    "content-philosophy": "learning-science",
    "health-focus": "learning-science",
    // Branding
    "brand-logo": "branding",
    "brand-presentation": "branding",
    "brand-characters": "branding",
  }
  return parentMap[sectionId] || null
}

export function DocsView() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam) {
      return sectionParam as SectionId
    }
    return "highlights"
  })
  const [expandedNav, setExpandedNav] = useState<string[]>(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam) {
      const parentId = findParentNavId(sectionParam)
      if (parentId) {
        return ["business", parentId]
      }
    }
    return ["business"]
  })

  // Sync active section with URL parameter
  useEffect(() => {
    const sectionParam = searchParams.get("section")
    if (sectionParam && sectionParam !== activeSection) {
      setActiveSection(sectionParam as SectionId)
      const parentId = findParentNavId(sectionParam)
      if (parentId && !expandedNav.includes(parentId)) {
        setExpandedNav((prev) => [...prev, parentId])
      }
    }
  }, [searchParams, activeSection, expandedNav])

  // Update URL when section changes
  const handleSectionChange = (sectionId: SectionId) => {
    setActiveSection(sectionId)
    setSearchParams({ section: sectionId })
  }

  const handleNavToggle = (id: string) => {
    setExpandedNav((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  return (
    <Box sx={{ display: "flex", gap: 3, p: 3 }}>
      {/* Sidebar Navigation */}
      <DocsNavigation
        navigation={docsNavigation as NavItem[]}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        expandedNav={expandedNav}
        onNavToggle={handleNavToggle}
      />

      {/* Content - All sections now use lazy-loaded components */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <SectionRenderer sectionId={activeSection} />
      </Box>
    </Box>
  )
}
