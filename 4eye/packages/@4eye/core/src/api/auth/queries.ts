/**
 * Auth GraphQL Queries
 * 
 * @module core/api/auth
 */

import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      name
      avatarUrl
      role
      readingLevel
      preferredLanguage
      emailVerifiedAt
      createdAt
    }
  }
`;
