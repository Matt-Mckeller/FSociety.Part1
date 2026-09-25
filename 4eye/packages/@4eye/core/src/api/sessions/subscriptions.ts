/**
 * Sessions/Transcript GraphQL Subscriptions
 * 
 * @module core/api/sessions
 */

import { gql } from '@apollo/client';
import { TRANSCRIPT_FRAGMENT, TRANSCRIPT_SEGMENT_FRAGMENT } from './fragments';

export const TRANSCRIPT_SEGMENT_ADDED_SUBSCRIPTION = gql`
  ${TRANSCRIPT_SEGMENT_FRAGMENT}
  subscription TranscriptSegmentAdded($sessionId: ID!) {
    transcriptSegmentAdded(sessionId: $sessionId) {
      ...TranscriptSegmentFields
    }
  }
`;

export const TRANSCRIPT_COMPLETED_SUBSCRIPTION = gql`
  ${TRANSCRIPT_FRAGMENT}
  subscription TranscriptCompleted($sessionId: ID!) {
    transcriptCompleted(sessionId: $sessionId) {
      ...TranscriptFields
    }
  }
`;
