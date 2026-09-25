/**
 * TypeScript interfaces for Expanse EDU financial and market data
 * Extracted from Financial_Information_Expanse_EDU_And_Projections.xlsx
 */

// ============================================================================
// Market & Student Data
// ============================================================================

export interface LMSProvider {
  name: string;
  users: string;
  regions?: string;
  customers?: string;
  notes?: string;
}

export interface StudentSegment {
  segment: string;
  k12Distribution: number | null;
  totalDistribution: number;
}

export interface LMSUserCounts {
  initialFocus: number;
  secondaryFocus: number;
  total: number;
  higherEd?: number;
}

export interface FreemiumPricing {
  monthly: number;
  yearly: number;
}

export interface PricingStructure {
  freemium: {
    target: FreemiumPricing;
    lower: FreemiumPricing;
  };
  membership: {
    monthly: number;
  };
}

export interface StudentCountsData {
  lmsProviders: LMSProvider[];
  usStudentCounts: {
    total: number;
    higherEd: number;
    k12Public: number;
    k12Private: number;
    lmsUsageRate: number;
  };
  studentDistribution: StudentSegment[];
  lmsUsers: {
    us: LMSUserCounts;
    global: LMSUserCounts;
  };
  pricing: PricingStructure;
}

// ============================================================================
// Total Addressable Market (TAM)
// ============================================================================

export interface MarketUserCounts {
  lmsStudentK12: number;
  teacherK12: number;
  higherEdStudent: number;
  higherEdTeacher: number;
  hsStudent: number;
  hsTeacher: number;
}

export interface PricingTier {
  name: string;
  freemiumMonthly: number;
  freemiumYearly: number;
  membershipMonthly: number;
  teacherMembershipMonthly: number;
  notes?: string;
}

export interface RevenueStream {
  stream: string;
  assumption: string;
}

export interface TAMData {
  userCounts: {
    monthly: MarketUserCounts;
    us: MarketUserCounts;
    global: MarketUserCounts;
  };
  pricingTiers: PricingTier[];
  revenueStreams: RevenueStream[];
  assumedTeacherRatio: string;
}

// ============================================================================
// User Acquisition
// ============================================================================

export interface AcquisitionVariable {
  studentsPerSchool: number;
  schoolsPerDistrict: number;
  studentsPerClassroom: number;
  classesPerDayTeacher: number;
  classroomsPerSchool: number;
  percentStudentsUsingApp: string;
  percentTeachersUsingApp: string;
  percentStudentsForParents: string;
  percentStudentsPerTeacher: string;
}

export interface K12AcquisitionData {
  accuracyLevel: string;
  goals: string[];
  membershipTimeline: {
    earliest: string;
    expected: string;
    latest: string;
  };
  variables: AcquisitionVariable;
  hsVariables: {
    schoolsPerDistrict: number;
    classroomsPerSchool: number;
  };
}

export interface RangeValue {
  min: number;
  max: number;
}

export interface ClassroomSizes {
  introLecture: RangeValue;
  upperLevel: RangeValue;
  graduate: RangeValue;
}

export interface InstitutionCategory {
  name: string;
  description: string;
  studentsPerSchool: RangeValue;
  schoolsPerUniversity: RangeValue;
  classroomSizes: ClassroomSizes;
  classesPerWeek: {
    undergrad: RangeValue;
    grad: RangeValue;
  };
}

export interface HigherEdAcquisitionData {
  institutionCategories: InstitutionCategory[];
}

// ============================================================================
// Team Acquisition / Hiring
// ============================================================================

export interface HiringPhase {
  name: string;
  roles: string[];
}

export interface TeamAcquisitionData {
  phases: HiringPhase[];
}

// ============================================================================
// Costs
// ============================================================================

export interface ScaleCosts {
  users_0_5k: number | string;
  users_5k_10k: number | string;
  users_10k_100k: number | string;
  users_1M: number | string;
  users_25M: number | string;
}

export interface IntegrationCostItem {
  name: string;
  negotiable?: boolean | string;
  baseCost: string;
  byScale?: ScaleCosts;
  accuracy?: string;
  notes?: string;
}

export interface ExampleCalculation {
  students: number;
  costAt10cPerStudent: { monthly: number; yearly: number };
  costAt1cPerStudent: { monthly: number; yearly: number };
  teacherCost16to1: { at10c: { monthly: number; yearly: number } };
  featureFlagCost: { monthly: number; yearly: number };
}

export interface InfrastructureComparisonItem {
  description: string;
  monthlyCost: number;
  notes?: string;
}

export interface IntegrationCostsData {
  items: IntegrationCostItem[];
  exampleCalculations: {
    kcps: ExampleCalculation;
  };
  infrastructureComparison: {
    googleCloud: InfrastructureComparisonItem;
    aws: InfrastructureComparisonItem;
  };
}

export interface SoftwareCostItem {
  category: string;
  examples?: string;
  costPerUserMonth?: string;
  notes?: string;
}

export interface SoftwareCostsData {
  items: SoftwareCostItem[];
}

export interface MarketingCostItem {
  activity: string;
  cost?: string;
  aiAssisted?: boolean | string;
  owner?: string;
  segments?: {
    b2b: number;
    b2teacher: number;
    b2student: number;
    b2parent: number;
  };
}

export interface MarketingStaffNeed {
  role: string;
  notes?: string;
}

export interface MarketingCostsData {
  earlyMvp: MarketingCostItem[];
  earlyMiddle: Array<{ activity: string; cost: string }>;
  staffNeeds: MarketingStaffNeed[];
}

export interface StaffRole {
  title: string;
  gameTerminology?: string;
  seniorUS?: string;
  midUS?: string;
  entryUS?: string;
  seniorOverseas?: string;
  midOverseas?: string;
  entryOverseas?: string;
  notes?: string;
}

export interface StaffCostsData {
  note: string;
  roles: StaffRole[];
}

export interface PhysicalCostItem {
  item: string;
  cost: number | string | null;
  type?: string;
  notes?: string;
}

export interface PhysicalCostsData {
  items: PhysicalCostItem[];
}

// ============================================================================
// Combined Data Structure
// ============================================================================

export interface ExpanseEduFinancialsData {
  studentCounts: StudentCountsData;
  tam: TAMData;
  userAcquisitionK12: K12AcquisitionData;
  userAcquisitionHigherEd: HigherEdAcquisitionData;
  teamAcquisition: TeamAcquisitionData;
  integrationCosts: IntegrationCostsData;
  softwareCosts: SoftwareCostsData;
  marketingCosts: MarketingCostsData;
  staffCosts: StaffCostsData;
  physicalCosts: PhysicalCostsData;
}
