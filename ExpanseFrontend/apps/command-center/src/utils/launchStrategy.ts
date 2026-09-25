/**
 * Launch Strategy Utilities
 * 
 * Helper functions for working with mission goals, feature impact,
 * and MVP configuration data.
 */

import type {
  FeatureImpact,
  FeatureImpactData,
  GoalImpactScores,
  GoalCoverageScores,
  ImpactSummary,
  LaunchRequirement,
  MissionGoals,
  MVPConfiguration,
  PillarId,
  PrimaryPillar,
} from '../types/launchStrategy'

// Import data
import missionGoalsData from '../data/missionGoals.json'
import featureImpactData from '../data/featureImpact.json'
import mvpConfigurationsData from '../data/mvpConfigurations.json'
import marketingStagesData from '../data/marketingStages.json'

// Type assertions for JSON imports
export const missionGoals = missionGoalsData as unknown as MissionGoals
export const featureImpact = featureImpactData as unknown as FeatureImpactData
export const mvpConfigurations = mvpConfigurationsData
export const marketingStages = marketingStagesData

/**
 * Get all features as an array
 */
export function getAllFeatures(): FeatureImpact[] {
  return Object.values(featureImpact.features)
}

/**
 * Get feature by storyline ID
 */
export function getFeature(storylineId: string): FeatureImpact | undefined {
  return featureImpact.features[storylineId]
}

/**
 * Get features filtered by launch requirement
 */
export function getFeaturesByRequirement(requirement: LaunchRequirement): FeatureImpact[] {
  return getAllFeatures().filter(f => f.launchRequirement === requirement)
}

/**
 * Get features sorted by impact on a specific goal
 */
export function getFeaturesByGoalImpact(goalId: PillarId): FeatureImpact[] {
  return getAllFeatures().sort((a, b) => {
    const aScore = a.goalImpact[goalId] || 0
    const bScore = b.goalImpact[goalId] || 0
    return bScore - aScore
  })
}

/**
 * Calculate weighted goal coverage for a set of selected features
 */
export function calculateGoalCoverage(
  selectedIds: string[],
  pillars: PrimaryPillar[] = missionGoals.primaryPillars
): GoalCoverageScores {
  const selectedFeatures = selectedIds
    .map(id => featureImpact.features[id])
    .filter(Boolean)

  if (selectedFeatures.length === 0) {
    return {
      engagement: 0,
      'mental-health': 0,
      learning: 0,
      'growth-mindset': 0,
      overall: 0,
    }
  }

  // Calculate max impact for each goal (not average, since features compound)
  const goalScores: GoalImpactScores = {
    engagement: Math.max(...selectedFeatures.map(f => f.goalImpact.engagement)),
    'mental-health': Math.max(...selectedFeatures.map(f => f.goalImpact['mental-health'])),
    learning: Math.max(...selectedFeatures.map(f => f.goalImpact.learning)),
    'growth-mindset': Math.max(...selectedFeatures.map(f => f.goalImpact['growth-mindset'])),
  }

  // Calculate weighted overall score
  const pillarWeights = pillars.reduce((acc, p) => {
    acc[p.id] = p.weight
    return acc
  }, {} as Record<PillarId, number>)

  const overall = 
    goalScores.engagement * (pillarWeights.engagement || 0.25) +
    goalScores['mental-health'] * (pillarWeights['mental-health'] || 0.25) +
    goalScores.learning * (pillarWeights.learning || 0.25) +
    goalScores['growth-mindset'] * (pillarWeights['growth-mindset'] || 0.25)

  return {
    ...goalScores,
    overall: Math.round(overall * 100) / 100,
  }
}

/**
 * Calculate total complexity for selected features
 */
export function calculateTotalComplexity(selectedIds: string[]): number {
  return selectedIds.reduce((total, id) => {
    const feature = featureImpact.features[id]
    return total + (feature?.complexity || 0)
  }, 0)
}

/**
 * Estimate total time in weeks for selected features
 * Parses time estimates like "4-6 weeks" and uses midpoint
 */
export function estimateTotalWeeks(selectedIds: string[]): number {
  return selectedIds.reduce((total, id) => {
    const feature = featureImpact.features[id]
    if (!feature?.timeEstimate) return total
    
    // Parse "X-Y weeks" or "X+ weeks" format
    const match = feature.timeEstimate.match(/(\d+)(?:-(\d+)|\+)?/)
    if (!match) return total
    
    const min = parseInt(match[1], 10)
    const max = match[2] ? parseInt(match[2], 10) : min * 1.5
    return total + (min + max) / 2
  }, 0)
}

/**
 * Get all audiences unlocked by selected features
 */
export function getUnlockedAudiences(selectedIds: string[]): string[] {
  const audiences = new Set<string>()
  
  selectedIds.forEach(id => {
    const feature = featureImpact.features[id]
    feature?.audienceUnlocks?.forEach(a => audiences.add(a))
  })
  
  return Array.from(audiences)
}

/**
 * Check for missing must-have features
 */
export function getMissingMustHaves(selectedIds: string[]): string[] {
  const mustHaves = featureImpact.aggregations.byLaunchRequirement['must-have'] || []
  return mustHaves.filter(id => !selectedIds.includes(id))
}

/**
 * Get unmet dependencies for selected features
 */
export function getUnmetDependencies(selectedIds: string[]): Array<{ feature: string; missing: string[] }> {
  const result: Array<{ feature: string; missing: string[] }> = []
  
  selectedIds.forEach(id => {
    const feature = featureImpact.features[id]
    if (!feature?.dependencies?.length) return
    
    const missing = feature.dependencies.filter(dep => !selectedIds.includes(dep))
    if (missing.length > 0) {
      result.push({ feature: id, missing })
    }
  })
  
  return result
}

/**
 * Calculate comprehensive impact summary for selected features
 */
export function calculateImpactSummary(selectedIds: string[]): ImpactSummary {
  const goalCoverage = calculateGoalCoverage(selectedIds)
  const missingMustHaves = getMissingMustHaves(selectedIds)
  const unmetDeps = getUnmetDependencies(selectedIds)
  
  const recommendations: string[] = []
  
  // Add recommendations based on analysis
  if (missingMustHaves.length > 0) {
    recommendations.push(`Add must-have features: ${missingMustHaves.map(id => featureImpact.features[id]?.name).join(', ')}`)
  }
  
  if (unmetDeps.length > 0) {
    recommendations.push(`Add dependencies: ${unmetDeps.flatMap(d => d.missing).map(id => featureImpact.features[id]?.name).join(', ')}`)
  }
  
  if (goalCoverage.engagement < 0.6) {
    recommendations.push('Consider adding engagement-focused features like AI Chat or Competition')
  }
  
  if (goalCoverage['mental-health'] < 0.5) {
    recommendations.push('Consider adding mental health features for differentiation')
  }
  
  return {
    selectedCount: selectedIds.length,
    totalComplexity: calculateTotalComplexity(selectedIds),
    estimatedWeeks: Math.round(estimateTotalWeeks(selectedIds)),
    goalScores: {
      engagement: goalCoverage.engagement,
      'mental-health': goalCoverage['mental-health'],
      learning: goalCoverage.learning,
      'growth-mindset': goalCoverage['growth-mindset'],
    },
    weightedOverall: goalCoverage.overall,
    audiencesUnlocked: getUnlockedAudiences(selectedIds),
    missingMustHaves,
    recommendations,
  }
}

/**
 * Compare two MVP configurations
 */
export function compareMVPConfigurations(
  config1: MVPConfiguration,
  config2: MVPConfiguration
): {
  featureDiff: { onlyIn1: string[]; onlyIn2: string[]; inBoth: string[] }
  metricsDiff: {
    complexity: number
    time: number
    goalCoverage: {
      engagement: number
      'mental-health': number
      learning: number
      'growth-mindset': number
    }
  }
} {
  const set1 = new Set(config1.selectedFeatures)
  const set2 = new Set(config2.selectedFeatures)
  
  const onlyIn1 = config1.selectedFeatures.filter(f => !set2.has(f))
  const onlyIn2 = config2.selectedFeatures.filter(f => !set1.has(f))
  const inBoth = config1.selectedFeatures.filter(f => set2.has(f))
  
  const coverage1 = calculateGoalCoverage(config1.selectedFeatures)
  const coverage2 = calculateGoalCoverage(config2.selectedFeatures)
  
  return {
    featureDiff: { onlyIn1, onlyIn2, inBoth },
    metricsDiff: {
      complexity: calculateTotalComplexity(config2.selectedFeatures) - calculateTotalComplexity(config1.selectedFeatures),
      time: estimateTotalWeeks(config2.selectedFeatures) - estimateTotalWeeks(config1.selectedFeatures),
      goalCoverage: {
        engagement: coverage2.engagement - coverage1.engagement,
        'mental-health': coverage2['mental-health'] - coverage1['mental-health'],
        learning: coverage2.learning - coverage1.learning,
        'growth-mindset': coverage2['growth-mindset'] - coverage1['growth-mindset'],
      },
    },
  }
}

/**
 * Generate feature recommendations based on goals
 */
export function getRecommendedFeatures(
  currentSelection: string[],
  prioritizeGoal?: PillarId,
  maxComplexity?: number
): FeatureImpact[] {
  const currentSet = new Set(currentSelection)
  const currentComplexity = calculateTotalComplexity(currentSelection)
  
  let candidates = getAllFeatures()
    .filter(f => !currentSet.has(f.storylineId))
    .filter(f => f.launchRequirement !== 'future')
  
  // Filter by complexity budget if specified
  if (maxComplexity) {
    const remainingBudget = maxComplexity - currentComplexity
    candidates = candidates.filter(f => f.complexity <= remainingBudget)
  }
  
  // Sort by priority goal or overall value
  if (prioritizeGoal) {
    candidates.sort((a, b) => b.goalImpact[prioritizeGoal] - a.goalImpact[prioritizeGoal])
  } else {
    // Sort by average impact
    candidates.sort((a, b) => {
      const avgA = (a.goalImpact.engagement + a.goalImpact['mental-health'] + a.goalImpact.learning + a.goalImpact['growth-mindset']) / 4
      const avgB = (b.goalImpact.engagement + b.goalImpact['mental-health'] + b.goalImpact.learning + b.goalImpact['growth-mindset']) / 4
      return avgB - avgA
    })
  }
  
  return candidates.slice(0, 5)
}

/**
 * Get pillar by ID
 */
export function getPillar(pillarId: PillarId): PrimaryPillar | undefined {
  return missionGoals.primaryPillars.find(p => p.id === pillarId)
}

/**
 * Get all pillar IDs
 */
export function getAllPillarIds(): PillarId[] {
  return missionGoals.primaryPillars.map(p => p.id as PillarId)
}

/**
 * Format goal score as percentage string
 */
export function formatGoalScore(score: number): string {
  return `${Math.round(score * 100)}%`
}

/**
 * Get color for goal score (for UI display)
 */
export function getGoalScoreColor(score: number): 'error' | 'warning' | 'success' {
  if (score < 0.4) return 'error'
  if (score < 0.7) return 'warning'
  return 'success'
}

/**
 * Get launch requirement label
 */
export function getLaunchRequirementLabel(requirement: LaunchRequirement): string {
  const labels: Record<LaunchRequirement, string> = {
    'must-have': '🔴 Must Have',
    'should-have': '🟡 Should Have',
    'nice-to-have': '🟢 Nice to Have',
    'future': '⚪ Future',
  }
  return labels[requirement]
}

/**
 * Calculate launch readiness score (0-100)
 */
export function calculateLaunchReadiness(selectedIds: string[]): number {
  const missingMustHaves = getMissingMustHaves(selectedIds)
  const unmetDeps = getUnmetDependencies(selectedIds)
  const goalCoverage = calculateGoalCoverage(selectedIds)
  
  let score = 100
  
  // Penalize for missing must-haves (heavy penalty)
  score -= missingMustHaves.length * 20
  
  // Penalize for unmet dependencies
  score -= unmetDeps.length * 10
  
  // Penalize for low goal coverage
  if (goalCoverage.overall < 0.5) score -= 20
  else if (goalCoverage.overall < 0.7) score -= 10
  
  // Bonus for good coverage across all goals
  const minGoalScore = Math.min(
    goalCoverage.engagement,
    goalCoverage['mental-health'],
    goalCoverage.learning,
    goalCoverage['growth-mindset']
  )
  if (minGoalScore > 0.5) score += 5
  
  return Math.max(0, Math.min(100, score))
}
