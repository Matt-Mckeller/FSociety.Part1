/**
 * Auth GraphQL Mutations
 * 
 * @module core/api/auth
 */

import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      user {
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
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      user {
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
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input)
  }
`;

export const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`;
