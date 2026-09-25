import { gql } from "@apollo/client"

export const SUBMIT_CONTACT = gql`
  mutation contact(
    $fullName: String!
    $email: String!
    $phoneNumber: String!
    $description: String!
  ) {
    registerContact(
      input: {
        fullName: $fullName
        email: $email
        phoneNumber: $phoneNumber
        description: $description
      }
    ) {
      success
    }
  }
`
