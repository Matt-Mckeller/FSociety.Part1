/**
 * Sections Directory
 *
 * This directory contains all migrated section components.
 * Each category has its own subfolder:
 *
 * sections/
 * ├── _template.tsx              # Template for new sections
 * ├── business/ ✅               # 6 sections migrated
 * ├── product/ ✅                # 1 section migrated
 * ├── marketing/ ✅              # 4 sections migrated
 * ├── technology/ ✅             # 4 sections migrated
 * ├── research/ ✅               # 3 sections migrated
 * ├── competition/ ✅            # 3 sections migrated
 * ├── risks/ ✅                  # 1 section migrated
 * ├── funding/ ✅                # 5 sections migrated
 * ├── users/ ✅                  # 3 sections migrated
 * ├── psychology/ ✅             # 4 sections migrated
 * ├── mental-health/ ✅          # 2 sections migrated
 * ├── rewards/ ✅                # 3 sections migrated
 * ├── legal/ ✅                  # 3 sections migrated
 * ├── operations/ ✅             # 5 sections migrated
 * ├── go-to-market/ ✅           # 3 sections migrated
 * ├── case-studies/ ✅           # 4 sections migrated
 * ├── game-mechanics/ ✅         # 18 sections migrated
 * ├── monetization/ ✅           # 6 sections migrated
 * ├── communication/ ✅          # 5 sections migrated
 * ├── research-extensions/ ✅    # 10 sections migrated
 * ├── design-notes/ ✅           # 8 sections migrated
 * ├── learning-science/ ✅       # 9 sections migrated
 * ├── branding/ ✅               # 3 sections migrated
 * └── ideation/ ✅               # 2 sections migrated
 *
 * MIGRATION PROGRESS: ~100 sections migrated / ~100 total (~100%)
 *
 * All sections are lazy-loaded via the sectionRegistry.
 */

// Re-export all section categories for direct imports if needed
export * as business from "./business"
export * as product from "./product"
export * as marketing from "./marketing"
export * as technology from "./technology"
export * as research from "./research"
export * as competition from "./competition"
export * as risks from "./risks"
export * as funding from "./funding"
export * as users from "./users"
export * as psychology from "./psychology"
export * as mentalHealth from "./mental-health"
export * as rewards from "./rewards"
export * as legal from "./legal"
export * as operations from "./operations"
export * as goToMarket from "./go-to-market"
export * as caseStudies from "./case-studies"
export * as gameMechanics from "./game-mechanics"
export * as monetization from "./monetization"
export * as communication from "./communication"
export * as researchExtensions from "./research-extensions"
export * as designNotes from "./design-notes"
export * as learningScience from "./learning-science"
export * as branding from "./branding"
export * as ideation from "./ideation"
