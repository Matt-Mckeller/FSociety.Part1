/**
 * Section Registry - Lazy Loading Hub for Docs Sections
 *
 * This registry enables code-splitting by lazily importing section components
 * only when they're needed. Each section is a separate chunk.
 */

import { lazy, ComponentType } from "react"
import type { SectionId } from "../types"

// Type for section components
export type SectionComponent = ComponentType<Record<string, never>>

// Registry entry with metadata
interface SectionRegistryEntry {
  component: ReturnType<typeof lazy>
  category: string
  title: string
  icon?: string
}

/**
 * Lazy import helper with chunk naming
 */
export const lazySection = (
  importFn: () => Promise<{ default: ComponentType<Record<string, never>> }>,
) => lazy(importFn)

/**
 * Section Registry - Maps section IDs to lazy-loaded components
 *
 * As sections are migrated, add entries here.
 * The legacy renderContent() switch statement will fall back for unmigrated sections.
 */
export const sectionRegistry: Partial<Record<SectionId, SectionRegistryEntry>> =
  {
    // ===========================================
    // Business (Phase 3 - Pilot) ✅
    // ===========================================
    highlights: {
      component: lazySection(() => import("../sections/business/Highlights")),
      category: "business",
      title: "Expanse EDU Highlights",
      icon: "⭐",
    },
    summary: {
      component: lazySection(() => import("../sections/business/Summary")),
      category: "business",
      title: "Business Summary",
      icon: "💼",
    },
    pitches: {
      component: lazySection(() => import("../sections/business/Pitches")),
      category: "business",
      title: "Elevator Pitches",
      icon: "🎤",
    },
    "value-propositions": {
      component: lazySection(
        () => import("../sections/business/ValuePropositions"),
      ),
      category: "business",
      title: "Value Propositions",
      icon: "💎",
    },
    goals: {
      component: lazySection(() => import("../sections/business/Goals")),
      category: "business",
      title: "Goals & Mission",
      icon: "🚀",
    },
    "growth-strategy": {
      component: lazySection(
        () => import("../sections/business/GrowthStrategy"),
      ),
      category: "business",
      title: "Growth Strategy",
      icon: "📈",
    },

    // ===========================================
    // Product ✅
    // ===========================================
    features: {
      component: lazySection(() => import("../sections/product/Features")),
      category: "product",
      title: "Product Features",
      icon: "📦",
    },

    // ===========================================
    // Marketing ✅
    // ===========================================
    audience: {
      component: lazySection(() => import("../sections/marketing/Audience")),
      category: "marketing",
      title: "Target Audiences",
      icon: "👥",
    },
    personas: {
      component: lazySection(() => import("../sections/marketing/Personas")),
      category: "marketing",
      title: "User Personas",
      icon: "🎭",
    },
    channels: {
      component: lazySection(() => import("../sections/marketing/Channels")),
      category: "marketing",
      title: "Marketing Channels",
      icon: "📣",
    },
    "sales-insights": {
      component: lazySection(
        () => import("../sections/marketing/SalesInsights"),
      ),
      category: "marketing",
      title: "Sales Insights",
      icon: "💰",
    },

    // ===========================================
    // Technology ✅
    // ===========================================
    "tech-stack": {
      component: lazySection(() => import("../sections/technology/TechStack")),
      category: "technology",
      title: "Tech Stack",
      icon: "💻",
    },
    architecture: {
      component: lazySection(
        () => import("../sections/technology/Architecture"),
      ),
      category: "technology",
      title: "Architecture",
      icon: "🏛️",
    },
    integrations: {
      component: lazySection(
        () => import("../sections/technology/Integrations"),
      ),
      category: "technology",
      title: "Integrations",
      icon: "🔗",
    },
    security: {
      component: lazySection(() => import("../sections/technology/Security")),
      category: "technology",
      title: "Security",
      icon: "🔒",
    },

    // ===========================================
    // Research ✅
    // ===========================================
    "research-topics": {
      component: lazySection(
        () => import("../sections/research/ResearchTopics"),
      ),
      category: "research",
      title: "Research Topics",
      icon: "🔬",
    },
    statistics: {
      component: lazySection(() => import("../sections/research/Statistics")),
      category: "research",
      title: "Key Statistics",
      icon: "📊",
    },
    sources: {
      component: lazySection(() => import("../sections/research/Sources")),
      category: "research",
      title: "Research Sources",
      icon: "📚",
    },

    // ===========================================
    // Competition ✅
    // ===========================================
    competitors: {
      component: lazySection(
        () => import("../sections/competition/Competitors"),
      ),
      category: "competition",
      title: "Competition Analysis",
      icon: "🏆",
    },
    differentiators: {
      component: lazySection(
        () => import("../sections/competition/Differentiators"),
      ),
      category: "competition",
      title: "Differentiators",
      icon: "✨",
    },
    "market-weaknesses": {
      component: lazySection(
        () => import("../sections/competition/MarketWeaknesses"),
      ),
      category: "competition",
      title: "Market Weaknesses",
      icon: "🎯",
    },

    // ===========================================
    // Risks ✅
    // ===========================================
    "risk-analysis": {
      component: lazySection(() => import("../sections/risks/RiskAnalysis")),
      category: "risks",
      title: "Risk Analysis",
      icon: "⚠️",
    },

    // ===========================================
    // Funding ✅
    // ===========================================
    "funding-status": {
      component: lazySection(() => import("../sections/funding/FundingStatus")),
      category: "funding",
      title: "Funding Status",
      icon: "💰",
    },
    opportunities: {
      component: lazySection(() => import("../sections/funding/Opportunities")),
      category: "funding",
      title: "Funding Opportunities",
      icon: "🎯",
    },
    advisors: {
      component: lazySection(() => import("../sections/funding/Advisors")),
      category: "funding",
      title: "Advisors & Mentors",
      icon: "🧠",
    },
    kpis: {
      component: lazySection(() => import("../sections/funding/KPIs")),
      category: "funding",
      title: "KPIs & Goals",
      icon: "📊",
    },
    "research-tasks": {
      component: lazySection(() => import("../sections/funding/ResearchTasks")),
      category: "funding",
      title: "Research Tasks",
      icon: "🔬",
    },

    // ===========================================
    // Users ✅
    // ===========================================
    customers: {
      component: lazySection(() => import("../sections/users/Customers")),
      category: "users",
      title: "Customer Types",
      icon: "👥",
    },
    "user-attributes": {
      component: lazySection(() => import("../sections/users/UserAttributes")),
      category: "users",
      title: "User Attributes",
      icon: "🎯",
    },
    "target-segments": {
      component: lazySection(() => import("../sections/users/TargetSegments")),
      category: "users",
      title: "Target Segments",
      icon: "🎯",
    },

    // ===========================================
    // Psychology ✅
    // ===========================================
    dopamine: {
      component: lazySection(() => import("../sections/psychology/Dopamine")),
      category: "psychology",
      title: "Dopamine & Motivation",
      icon: "🧠",
    },
    "positive-reinforcement": {
      component: lazySection(
        () => import("../sections/psychology/PositiveReinforcement"),
      ),
      category: "psychology",
      title: "Positive Reinforcement",
      icon: "✨",
    },
    "social-development": {
      component: lazySection(
        () => import("../sections/psychology/SocialDevelopment"),
      ),
      category: "psychology",
      title: "Social Development",
      icon: "🤝",
    },
    "self-efficacy": {
      component: lazySection(
        () => import("../sections/psychology/SelfEfficacy"),
      ),
      category: "psychology",
      title: "Self-Efficacy",
      icon: "💪",
    },

    // ===========================================
    // Mental Health ✅
    // ===========================================
    "mental-health-stats": {
      component: lazySection(
        () => import("../sections/mental-health/MentalHealthStats"),
      ),
      category: "mental-health",
      title: "Mental Health Statistics",
      icon: "💚",
    },
    interventions: {
      component: lazySection(
        () => import("../sections/mental-health/Interventions"),
      ),
      category: "mental-health",
      title: "Positive Interventions",
      icon: "🌟",
    },

    // ===========================================
    // Rewards ✅
    // ===========================================
    "reward-system": {
      component: lazySection(() => import("../sections/rewards/RewardSystem")),
      category: "rewards",
      title: "Reward System",
      icon: "🎁",
    },
    "real-life-rewards": {
      component: lazySection(
        () => import("../sections/rewards/RealLifeRewards"),
      ),
      category: "rewards",
      title: "Real Life Rewards",
      icon: "🌍",
    },
    "in-game-rewards": {
      component: lazySection(() => import("../sections/rewards/InGameRewards")),
      category: "rewards",
      title: "In-Game Rewards",
      icon: "🎮",
    },

    // ===========================================
    // Legal ✅
    // ===========================================
    compliance: {
      component: lazySection(() => import("../sections/legal/Compliance")),
      category: "legal",
      title: "Compliance Requirements",
      icon: "⚖️",
    },
    "privacy-security": {
      component: lazySection(() => import("../sections/legal/PrivacySecurity")),
      category: "legal",
      title: "Privacy & Security",
      icon: "🔒",
    },
    "legal-risks": {
      component: lazySection(() => import("../sections/legal/LegalRisks")),
      category: "legal",
      title: "Legal Risks",
      icon: "⚠️",
    },

    // ===========================================
    // Operations ✅
    // ===========================================
    revenue: {
      component: lazySection(() => import("../sections/operations/Revenue")),
      category: "operations",
      title: "Revenue & Profit",
      icon: "💰",
    },
    "funding-rounds": {
      component: lazySection(
        () => import("../sections/operations/FundingRounds"),
      ),
      category: "operations",
      title: "Funding Rounds",
      icon: "💵",
    },
    exits: {
      component: lazySection(() => import("../sections/operations/Exits")),
      category: "operations",
      title: "Exit Strategy",
      icon: "🚪",
    },
    engagement: {
      component: lazySection(() => import("../sections/operations/Engagement")),
      category: "operations",
      title: "Engagement",
      icon: "📈",
    },
    gamification: {
      component: lazySection(
        () => import("../sections/operations/Gamification"),
      ),
      category: "operations",
      title: "Gamification",
      icon: "🎮",
    },

    // ===========================================
    // Go-to-Market ✅
    // ===========================================
    "gtm-strategy": {
      component: lazySection(
        () => import("../sections/go-to-market/GTMStrategy"),
      ),
      category: "go-to-market",
      title: "GTM Strategy",
      icon: "🚀",
    },
    "gtm-channels": {
      component: lazySection(
        () => import("../sections/go-to-market/GTMChannels"),
      ),
      category: "go-to-market",
      title: "GTM Channels",
      icon: "📢",
    },
    "gtm-branding": {
      component: lazySection(
        () => import("../sections/go-to-market/GTMBranding"),
      ),
      category: "go-to-market",
      title: "GTM Branding",
      icon: "🎨",
    },

    // ===========================================
    // Case Studies ✅
    // ===========================================
    "kcps-state-of-education": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSStateOfEducation"),
      ),
      category: "case-studies",
      title: "State of Education",
      icon: "🔥",
    },
    "kcps-overview": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSOverview"),
      ),
      category: "case-studies",
      title: "KCPS Overview",
      icon: "📚",
    },
    "kcps-narratives": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSNarratives"),
      ),
      category: "case-studies",
      title: "KCPS Narratives",
      icon: "📖",
    },
    "kcps-personas": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSPersonas"),
      ),
      category: "case-studies",
      title: "KCPS Personas",
      icon: "👥",
    },
    "kcps-events": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSEvents"),
      ),
      category: "case-studies",
      title: "In the Field",
      icon: "📅",
    },
    "kcps-special-ed": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSSpecialEd"),
      ),
      category: "case-studies",
      title: "Special Education Insights",
      icon: "🧠",
    },
    "kcps-engagement": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSEngagement"),
      ),
      category: "case-studies",
      title: "Engagement Insights",
      icon: "⚡",
    },
    "kcps-classroom-management": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSClassroomManagement"),
      ),
      category: "case-studies",
      title: "Classroom Management",
      icon: "🧭",
    },
    "kcps-lessons": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSLessons"),
      ),
      category: "case-studies",
      title: "KCPS Lessons",
      icon: "💡",
    },
    "kcps-recommendations": {
      component: lazySection(
        () => import("../sections/case-studies/KCPSRecommendations"),
      ),
      category: "case-studies",
      title: "Recommendations",
      icon: "🛠️",
    },

    // ===========================================
    // Game Mechanics ✅
    // ===========================================
    "game-overview": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameOverview"),
      ),
      category: "game-mechanics",
      title: "Game Overview",
      icon: "🎮",
    },
    "game-currencies": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameCurrencies"),
      ),
      category: "game-mechanics",
      title: "Currencies",
      icon: "💰",
    },
    "game-progression": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameProgression"),
      ),
      category: "game-mechanics",
      title: "Progression",
      icon: "📈",
    },
    "game-quests": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameQuests"),
      ),
      category: "game-mechanics",
      title: "Quests",
      icon: "🎯",
    },
    "game-battles": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameBattles"),
      ),
      category: "game-mechanics",
      title: "Battles",
      icon: "⚔️",
    },
    "game-personalization": {
      component: lazySection(
        () => import("../sections/game-mechanics/GamePersonalization"),
      ),
      category: "game-mechanics",
      title: "Personalization",
      icon: "🎨",
    },
    "game-profiles": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameProfiles"),
      ),
      category: "game-mechanics",
      title: "Profiles",
      icon: "👤",
    },
    "game-stores": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameStores"),
      ),
      category: "game-mechanics",
      title: "Stores",
      icon: "🛒",
    },
    "game-social": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameSocial"),
      ),
      category: "game-mechanics",
      title: "Social",
      icon: "🤝",
    },
    "game-journeys": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameJourneys"),
      ),
      category: "game-mechanics",
      title: "Journeys",
      icon: "🗺️",
    },
    "game-rewards": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameRewards"),
      ),
      category: "game-mechanics",
      title: "Rewards",
      icon: "🎁",
    },
    "game-goals": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameGoals"),
      ),
      category: "game-mechanics",
      title: "Goals",
      icon: "🎯",
    },
    "game-rankings": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameRankings"),
      ),
      category: "game-mechanics",
      title: "Rankings",
      icon: "🏆",
    },
    "game-recognition": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameRecognition"),
      ),
      category: "game-mechanics",
      title: "Recognition",
      icon: "🌟",
    },
    "game-expansions": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameExpansions"),
      ),
      category: "game-mechanics",
      title: "Expansions",
      icon: "🚀",
    },
    "game-negative": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameNegative"),
      ),
      category: "game-mechanics",
      title: "Negative Mechanics",
      icon: "⚠️",
    },
    "game-history": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameHistory"),
      ),
      category: "game-mechanics",
      title: "History",
      icon: "📜",
    },
    "game-games": {
      component: lazySection(
        () => import("../sections/game-mechanics/GameGames"),
      ),
      category: "game-mechanics",
      title: "Games",
      icon: "🎲",
    },

    // ===========================================
    // Monetization ✅
    // ===========================================
    "monetization-overview": {
      component: lazySection(
        () => import("../sections/monetization/MonetizationOverview"),
      ),
      category: "monetization",
      title: "Monetization Overview",
      icon: "💰",
    },
    "monetization-subscriptions": {
      component: lazySection(
        () => import("../sections/monetization/MonetizationSubscriptions"),
      ),
      category: "monetization",
      title: "Subscriptions",
      icon: "📅",
    },
    "monetization-payments": {
      component: lazySection(
        () => import("../sections/monetization/MonetizationPayments"),
      ),
      category: "monetization",
      title: "Payments",
      icon: "💳",
    },
    "monetization-purchases": {
      component: lazySection(
        () => import("../sections/monetization/MonetizationPurchases"),
      ),
      category: "monetization",
      title: "Purchases",
      icon: "🛒",
    },
    "monetization-scholarships": {
      component: lazySection(
        () => import("../sections/monetization/MonetizationScholarships"),
      ),
      category: "monetization",
      title: "Scholarships",
      icon: "🎓",
    },
    "monetization-sponsorships": {
      component: lazySection(
        () => import("../sections/monetization/MonetizationSponsorships"),
      ),
      category: "monetization",
      title: "Sponsorships",
      icon: "🤝",
    },

    // ===========================================
    // Communication ✅
    // ===========================================
    "comm-overview": {
      component: lazySection(
        () => import("../sections/communication/CommOverview"),
      ),
      category: "communication",
      title: "Communication Overview",
      icon: "📢",
    },
    "comm-notifications": {
      component: lazySection(
        () => import("../sections/communication/CommNotifications"),
      ),
      category: "communication",
      title: "Notifications",
      icon: "🔔",
    },
    "comm-parent": {
      component: lazySection(
        () => import("../sections/communication/CommParent"),
      ),
      category: "communication",
      title: "Parent Communication",
      icon: "👨‍👩‍👧",
    },
    "comm-auth": {
      component: lazySection(
        () => import("../sections/communication/CommAuth"),
      ),
      category: "communication",
      title: "Authentication",
      icon: "🔐",
    },
    "comm-accounts": {
      component: lazySection(
        () => import("../sections/communication/CommAccounts"),
      ),
      category: "communication",
      title: "Accounts",
      icon: "👤",
    },

    // ===========================================
    // Research Extensions ✅
    // ===========================================
    "college-readiness": {
      component: lazySection(
        () => import("../sections/research-extensions/CollegeReadiness"),
      ),
      category: "research-extensions",
      title: "College Readiness",
      icon: "🎓",
    },
    "parent-engagement": {
      component: lazySection(
        () => import("../sections/research-extensions/ParentEngagement"),
      ),
      category: "research-extensions",
      title: "Parent Engagement",
      icon: "👨‍👩‍👧",
    },
    "social-media": {
      component: lazySection(
        () => import("../sections/research-extensions/SocialMedia"),
      ),
      category: "research-extensions",
      title: "Social Media",
      icon: "📱",
    },
    "social-dynamics": {
      component: lazySection(
        () => import("../sections/research-extensions/SocialDynamics"),
      ),
      category: "research-extensions",
      title: "Social Dynamics",
      icon: "🤝",
    },
    "purpose-motivation": {
      component: lazySection(
        () => import("../sections/research-extensions/PurposeMotivation"),
      ),
      category: "research-extensions",
      title: "Purpose & Motivation",
      icon: "🎯",
    },
    "employee-satisfaction": {
      component: lazySection(
        () => import("../sections/research-extensions/EmployeeSatisfaction"),
      ),
      category: "research-extensions",
      title: "Employee Satisfaction",
      icon: "😊",
    },
    "survey-strategies": {
      component: lazySection(
        () => import("../sections/research-extensions/SurveyStrategies"),
      ),
      category: "research-extensions",
      title: "Survey Strategies",
      icon: "📋",
    },
    "engagement-research": {
      component: lazySection(
        () => import("../sections/research-extensions/EngagementResearch"),
      ),
      category: "research-extensions",
      title: "Engagement Research",
      icon: "📈",
    },
    "gaming-research": {
      component: lazySection(
        () => import("../sections/research-extensions/GamingResearch"),
      ),
      category: "research-extensions",
      title: "Gaming Research",
      icon: "🎮",
    },
    "further-reading": {
      component: lazySection(
        () => import("../sections/research-extensions/FurtherReading"),
      ),
      category: "research-extensions",
      title: "Further Reading",
      icon: "📚",
    },

    // ===========================================
    // Design Notes ✅
    // ===========================================
    sdt: {
      component: lazySection(() => import("../sections/design-notes/SDT")),
      category: "design-notes",
      title: "Self-Determination Theory",
      icon: "🧠",
    },
    "design-decisions": {
      component: lazySection(
        () => import("../sections/design-notes/DesignDecisions"),
      ),
      category: "design-notes",
      title: "Design Decisions",
      icon: "🎨",
    },
    "motivation-theory": {
      component: lazySection(
        () => import("../sections/design-notes/MotivationTheory"),
      ),
      category: "design-notes",
      title: "Motivation Theory",
      icon: "💡",
    },
    "reward-research": {
      component: lazySection(
        () => import("../sections/design-notes/RewardResearch"),
      ),
      category: "design-notes",
      title: "Reward Research",
      icon: "🏆",
    },
    "ai-usage": {
      component: lazySection(() => import("../sections/design-notes/AIUsage")),
      category: "design-notes",
      title: "AI Usage",
      icon: "🤖",
    },
    "inspirational-quotes": {
      component: lazySection(
        () => import("../sections/design-notes/InspirationalQuotes"),
      ),
      category: "design-notes",
      title: "Inspirational Quotes",
      icon: "💬",
    },
    "reward-examples": {
      component: lazySection(
        () => import("../sections/design-notes/RewardExamples"),
      ),
      category: "design-notes",
      title: "Reward Examples",
      icon: "🎯",
    },
    "future-research": {
      component: lazySection(
        () => import("../sections/design-notes/FutureResearch"),
      ),
      category: "design-notes",
      title: "Future Research",
      icon: "🔍",
    },

    // ===========================================
    // Learning Science ✅
    // ===========================================
    "attention-science": {
      component: lazySection(
        () => import("../sections/learning-science/AttentionScience"),
      ),
      category: "learning-science",
      title: "Attention Science",
      icon: "🧠",
    },
    "feedback-systems": {
      component: lazySection(
        () => import("../sections/learning-science/FeedbackSystems"),
      ),
      category: "learning-science",
      title: "Feedback Systems",
      icon: "📣",
    },
    "learning-reinforcement": {
      component: lazySection(
        () => import("../sections/learning-science/LearningReinforcement"),
      ),
      category: "learning-science",
      title: "Learning Reinforcement",
      icon: "✅",
    },
    "learning-agility": {
      component: lazySection(
        () => import("../sections/learning-science/LearningAgility"),
      ),
      category: "learning-science",
      title: "Learning Agility",
      icon: "🔄",
    },
    "progress-tracking": {
      component: lazySection(
        () => import("../sections/learning-science/ProgressTracking"),
      ),
      category: "learning-science",
      title: "Progress Tracking",
      icon: "📈",
    },
    "reward-psychology": {
      component: lazySection(
        () => import("../sections/learning-science/RewardPsychology"),
      ),
      category: "learning-science",
      title: "Reward Psychology",
      icon: "🎁",
    },
    "purpose-mission": {
      component: lazySection(
        () => import("../sections/learning-science/PurposeMission"),
      ),
      category: "learning-science",
      title: "Purpose & Mission",
      icon: "🚀",
    },
    "content-philosophy": {
      component: lazySection(
        () => import("../sections/learning-science/ContentPhilosophy"),
      ),
      category: "learning-science",
      title: "Content Philosophy",
      icon: "📖",
    },
    "health-focus": {
      component: lazySection(
        () => import("../sections/learning-science/HealthFocus"),
      ),
      category: "learning-science",
      title: "Health & Focus",
      icon: "🏥",
    },

    // ===========================================
    // Branding ✅
    // ===========================================
    "brand-logo": {
      component: lazySection(() => import("../sections/branding/BrandLogo")),
      category: "branding",
      title: "Logo Evolution",
      icon: "🎨",
    },
    "brand-presentation": {
      component: lazySection(
        () => import("../sections/branding/BrandPresentation"),
      ),
      category: "branding",
      title: "Presentation Style",
      icon: "🎬",
    },
    "brand-characters": {
      component: lazySection(
        () => import("../sections/branding/BrandCharacters"),
      ),
      category: "branding",
      title: "Character Strategy",
      icon: "🎭",
    },

    // ===========================================
    // Ideation ✅
    // ===========================================
    "ideation-overview": {
      component: lazySection(
        () => import("../sections/ideation/IdeationOverview"),
      ),
      category: "ideation",
      title: "Ideation Overview",
      icon: "💡",
    },
    "ideation-priority": {
      component: lazySection(
        () => import("../sections/ideation/IdeationPriorityMatrix"),
      ),
      category: "ideation",
      title: "Priority Matrix",
      icon: "📊",
    },
    "ideation-security": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationSecurity,
        })),
      ),
      category: "ideation",
      title: "Security & Safety",
      icon: "🔐",
    },
    "ideation-economy": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationEconomy,
        })),
      ),
      category: "ideation",
      title: "Economy & Financial",
      icon: "💰",
    },
    "ideation-rewards": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationRewards,
        })),
      ),
      category: "ideation",
      title: "Rewards & Engagement",
      icon: "🎁",
    },
    "ideation-social": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationSocial,
        })),
      ),
      category: "ideation",
      title: "Social & Community",
      icon: "👥",
    },
    "ideation-education": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationEducation,
        })),
      ),
      category: "ideation",
      title: "Education & Career",
      icon: "📚",
    },
    "ideation-platform": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationPlatform,
        })),
      ),
      category: "ideation",
      title: "Platform & Integration",
      icon: "🔌",
    },
    "ideation-analytics": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationAnalytics,
        })),
      ),
      category: "ideation",
      title: "Analytics & Observability",
      icon: "📊",
    },
    "ideation-learning": {
      component: lazySection(() =>
        import("../sections/ideation/IdeationCategory").then((m) => ({
          default: m.IdeationLearning,
        })),
      ),
      category: "ideation",
      title: "Learning & Content",
      icon: "📖",
    },

    // ===========================================
    // 4eye Product - To be migrated
    // ===========================================
    // "4eye-learning-modes": {
    //   component: lazySection(() => import("../sections/4eye/LearningModes")),
    //   category: "4eye",
    //   title: "Learning Modes",
    //   icon: "🎓",
    // },

    // ... (more sections will be added as they're migrated)
  }

/**
 * Check if a section has been migrated to the new architecture
 */
export const isSectionMigrated = (sectionId: SectionId): boolean => {
  return sectionId in sectionRegistry
}

/**
 * Get section metadata
 */
export const getSectionMeta = (
  sectionId: SectionId,
): SectionRegistryEntry | undefined => {
  return sectionRegistry[sectionId]
}

/**
 * Get all migrated sections
 */
export const getMigratedSections = (): SectionId[] => {
  return Object.keys(sectionRegistry) as SectionId[]
}

/**
 * Get sections by category
 */
export const getSectionsByCategory = (
  category: string,
): Array<{ id: SectionId; meta: SectionRegistryEntry }> => {
  return Object.entries(sectionRegistry)
    .filter(([, entry]) => entry?.category === category)
    .map(([id, meta]) => ({ id: id as SectionId, meta: meta! }))
}
