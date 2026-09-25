import { gql } from "@apollo/client"

export const GET_MY_CLASSES = gql`
  query GetMyClasses {
    myClasses {
      id
      elId
      name
      enrollments {
        elId
        role
      }
    }
  }
`

// export const GET_STUDENT_REWARDABLE_EVENTS_FOR_MY_ASSIGNMENTS = gql`
//   query GetStudentRewardableEventsForAssignments(
//     $assignmentIdAndClassIdInput: [AssignmentIdAndClassIdInput]
//   ) {
//     studentRewardableEventsForAssignments(
//       assignmentIdAndClassIdInput: $assignmentIdAndClassIdInput
//     ) {
//       id
//       status
//       submissionElId
//       studentElId
//     }
//   }
// `
export const GET_SUBMISSIONS_AND_REWARDABLE_EVENTS_FOR_MY_ASSIGNMENTS = gql`
  query GetSubmissionsAndRewardableEventsForMyAssignments(
    $elAssignmentIdWithClassId: [AssignmentIdAndClassIdInput!]!
  ) {
    submissionsAndRewardableEventsForMyAssignments(
      elAssignmentIdWithClassId: $elAssignmentIdWithClassId
    ) {
      submission {
        id
        state
        submissionElId
        rewardableEventId
        personElId
        assignmentElId
        gradePoints
        grade
      }

      rewardableEvent {
        id
        status
        submissionElId
        studentElId
        assignmentId
        elAssignmentId
      }

      assignmentId
      elAssignmentId
    }
  }
`

export const GET_ASSIGNMENTS_FOR_MY_CLASSES = gql`
  query GetAssignmentsForMyClasses($elClassIds: [String!]!) {
    assignmentsForMyClasses(elClassIds: $elClassIds) {
      id
      elId
      title
      dueDate
      elClassId
    }
  }
`
