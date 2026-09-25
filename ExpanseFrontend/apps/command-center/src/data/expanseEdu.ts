/**
 * Expanse EDU Financial Data
 * Data extracted from Financial_Information_Expanse_EDU_And_Projections.xlsx
 */
import type { ExpanseEduFinancialsData } from '../types/expanseEdu'
import rawData from './expanseEduFinancials.json'

export const expanseEduFinancials: ExpanseEduFinancialsData = rawData as ExpanseEduFinancialsData

// Convenience exports for individual data sections
export const { 
  studentCounts,
  tam,
  userAcquisitionK12,
  userAcquisitionHigherEd,
  teamAcquisition,
  integrationCosts,
  softwareCosts,
  marketingCosts,
  staffCosts,
  physicalCosts
} = expanseEduFinancials

// Helper function to format large numbers
export const formatLargeNumber = (num: number): string => {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`
  }
  return num.toString()
}

// Helper to get total market size
export const getTotalMarketSize = () => ({
  usStudents: studentCounts.usStudentCounts.total,
  usLmsUsers: studentCounts.lmsUsers.us.total,
  globalLmsUsers: studentCounts.lmsUsers.global.total,
  usTeachers: tam.userCounts.us.teacherK12 + tam.userCounts.us.higherEdTeacher,
  globalTeachers: tam.userCounts.global.teacherK12 + tam.userCounts.global.higherEdTeacher,
})

// Helper to calculate projected revenue at different scales
export const calculateProjectedRevenue = (userCount: number, tier: 'primary' | 'secondary' = 'secondary') => {
  const pricingTier = tam.pricingTiers.find(t => 
    tier === 'primary' ? t.name === 'T1 Primary' : t.name === 'T1 Secondary'
  )
  
  if (!pricingTier) return null
  
  const freemiumRevenue = userCount * pricingTier.freemiumYearly
  const membershipRevenue = userCount * 0.1 * pricingTier.membershipMonthly * 12 // 10% conversion
  
  return {
    freemiumAnnual: freemiumRevenue,
    membershipAnnual: membershipRevenue,
    totalAnnual: freemiumRevenue + membershipRevenue,
  }
}
