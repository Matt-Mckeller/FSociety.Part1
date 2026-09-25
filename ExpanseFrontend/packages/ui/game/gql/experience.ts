import { gql } from "@apollo/client"

export const EXPERIENCE_SUBSCRIPTION = gql`
  subscription OnExperienceChange($userID: string!) {
    experienceChanged(user: $userID) {
      userID
      currentExperienceForLevel
      totalExperienceEarned
      totalExperienceForLevel
    }
  }
`
