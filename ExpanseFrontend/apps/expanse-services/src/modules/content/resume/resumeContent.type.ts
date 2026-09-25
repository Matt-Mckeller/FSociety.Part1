export type ExecutiveSummary = {
  sectionLabel: string
  value: string
}

export type InfrastructureAndCloud = {
  label: string
  aws: { label: string; values: string[] }
  googleCloud: { label: string; values: string[] }
  general: { label: string; values: string[] }
}

export type TechnicalSkillHighlights = {
  sectionLabel: string
  subsections: {
    frameworksAndLibraries: {
      sectionLabel: string
      values: string[]
    }
    languages: {
      sectionLabel: string
      values: string[]
    }
    apis: {
      sectionLabel: string
      values: string[]
    }
    databasesAndData: {
      sectionLabel: string
      values: string[]
    }
    infrastructureAndCloud: InfrastructureAndCloud
    testing: {
      sectionLabel: string
      values: string[]
    }
  }
}

export type ProductSkillHighlights = {
  sectionLabel: string
  subsections: {
    coreProductManagement: {
      sectionLabel: string
      values: string[]
    }
    researchPlanningAndReporting: {
      sectionLabel: string
      values: string[]
    }
    technicalDocumentationAndUserDocumentation: {
      sectionLabel: string
      values: string[]
    }
    productivityAndCollaborativeTools: {
      sectionLabel: string
      values: string[]
    }
    databasesAndData: {
      sectionLabel: string
      values: string[]
    }
    designAndUserExperience: {
      sectionLabel: string
      values: string[]
    }
    technicalProductExpertise: {
      sectionLabel: string
      values: string[]
    }
    testingAndQualityAssurance: {
      sectionLabel: string
      values: string[]
    }
    infrastructureAndCloud: {
      sectionLabel: string
      values: string[]
    }
    aiAndMachineLearning: {
      sectionLabel: string
      values: string[]
    }
  }
}

export type WorkExperienceItemDescription = {
  label: string
  text: string
  nestLevel: number
}

export type WorkExperienceItem = {
  company: string
  location: string
  startDate?: string
  endDate?: string
  dates?: string
  title: string
  summary: string
  description: WorkExperienceItemDescription[]
}

export type WorkExperience = {
  sectionLabel: string
  values: WorkExperienceItem[]
}

export type Education = {
  sectionLabel: string
  school: string
  location: string
  startYear: string
  endYear: string
  degree: string
  additionalCourses: string
}

export type ComputerScienceFundamentals = {
  label: string
  values: string[]
}

export type Principles = {
  label: string
  values: string[]
}

export type ApplicationArchitecturePatterns = {
  label: string
  values: string[]
}

export type WebAndApplicationConcepts = {
  label: string
  values: string[]
}

export type DevelopmentTools = {
  label: string
  values: string[]
}

export type VisualsAndDesign = {
  label: string
  values: string[]
}

export type JavaScriptLibrariesCssFrameworks = {
  label: string
  values: string[]
}

export type OtherComputerCliAndOsFunctionality = {
  label: string
  values: string[]
}

export type BasicNetworking = {
  label: string
  values: string[]
}

export type PrivacyAndSecurity = {
  label: string
  values: string[]
}

export type CollaborationTools = {
  label: string
  values: string[]
}

export type AdditionalTechnicalSkillsAndKnowledge = {
  sectionLabel: string
  subsections: {
    computerScienceFundamentals: ComputerScienceFundamentals
    principles: Principles
    applicationArchitecturePatterns: ApplicationArchitecturePatterns
    webAndApplicationConcepts: WebAndApplicationConcepts
    developmentTools: DevelopmentTools
    visualsAndDesign: VisualsAndDesign
    javascriptLibrariesCssFrameworks: JavaScriptLibrariesCssFrameworks
    otherComputerCliAndOsFunctionality: OtherComputerCliAndOsFunctionality
    networkingBasic: BasicNetworking
    privacyAndSecurity: PrivacyAndSecurity
    collaborationTools: CollaborationTools
  }
}

export type DeveloperSections = {
  executiveSummary: ExecutiveSummary
  technicalSkillHighlights: TechnicalSkillHighlights
  workExperience: WorkExperience
  education: Education
  additionalTechnicalSkillsAndKnowledge: AdditionalTechnicalSkillsAndKnowledge
}

export type ProductSections = {
  executiveSummary: ExecutiveSummary
  productSkillHighlights: ProductSkillHighlights
  workExperience: WorkExperience
  education: Education
  // additionalTechnicalSkillsAndKnowledge: AdditionalTechnicalSkillsAndKnowledge
}

export type DeveloperResumeContent = {
  sections: DeveloperSections
}
export type ProductResumeContent = {
  sections: ProductSections
}
