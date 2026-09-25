/**
 * Sessions/Transcript GraphQL Mutations
 * 
 * @module core/api/sessions
 */

import { gql } from '@apollo/client';
import { TRANSCRIPT_FRAGMENT, TRANSCRIPT_SEGMENT_FRAGMENT } from './fragments';

export const CREATE_TRANSCRIPT_MUTATION = gql`
  ${TRANSCRIPT_FRAGMENT}
  mutation CreateTranscript($sessionId: ID!, $language: String) {
    createTranscript(sessionId: $sessionId, language: $language) {
      ...TranscriptFields
    }
  }
`;

export const ADD_TRANSCRIPT_SEGMENT_MUTATION = gql`
  ${TRANSCRIPT_SEGMENT_FRAGMENT}
  mutation AddTranscriptSegment(
    $transcriptId: ID!
    $startTimeMs: Float!
    $endTimeMs: Float!
    $text: String!
    $speakerLabel: String
    $confidence: Float
  ) {
    addTranscriptSegment(
      transcriptId: $transcriptId
      startTimeMs: $startTimeMs
      endTimeMs: $endTimeMs
      text: $text
      speakerLabel: $speakerLabel
      confidence: $confidence
    ) {
      ...TranscriptSegmentFields
    }
  }
`;

export const DELETE_TRANSCRIPT_MUTATION = gql`
  mutation DeleteTranscript($id: ID!) {
    deleteTranscript(id: $id)
  }
`;
