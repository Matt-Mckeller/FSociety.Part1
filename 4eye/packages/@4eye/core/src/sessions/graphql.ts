import { gql } from '@apollo/client';

// ========================================
// TRANSCRIPT FRAGMENTS
// ========================================

export const TRANSCRIPT_SEGMENT_FRAGMENT = gql`
  fragment TranscriptSegmentFields on TranscriptSegment {
    id
    transcriptId
    sequenceIndex
    startTimeMs
    endTimeMs
    text
    speakerLabel
    confidence
    isFinal
    wordTimings
    createdAt
  }
`;

export const TRANSCRIPT_FRAGMENT = gql`
  fragment TranscriptFields on Transcript {
    id
    sessionId
    status
    sourceLanguage
    segmentCount
    durationMs
    sttProvider
    errorMessage
    createdAt
    updatedAt
  }
`;

export const TRANSCRIPT_WITH_SEGMENTS_FRAGMENT = gql`
  ${TRANSCRIPT_FRAGMENT}
  ${TRANSCRIPT_SEGMENT_FRAGMENT}
  fragment TranscriptWithSegmentsFields on Transcript {
    ...TranscriptFields
    segments {
      ...TranscriptSegmentFields
    }
  }
`;

// ========================================
// QUERIES
// ========================================

export const TRANSCRIPT_BY_SESSION_QUERY = gql`
  ${TRANSCRIPT_WITH_SEGMENTS_FRAGMENT}
  query TranscriptBySession($sessionId: ID!) {
    transcriptBySession(sessionId: $sessionId) {
      ...TranscriptWithSegmentsFields
    }
  }
`;

export const TRANSCRIPT_QUERY = gql`
  ${TRANSCRIPT_WITH_SEGMENTS_FRAGMENT}
  query Transcript($id: ID!) {
    transcript(id: $id) {
      ...TranscriptWithSegmentsFields
    }
  }
`;

export const TRANSCRIPT_FULL_TEXT_QUERY = gql`
  query TranscriptFullText($transcriptId: ID!) {
    transcriptFullText(transcriptId: $transcriptId)
  }
`;

// ========================================
// MUTATIONS
// ========================================

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

// ========================================
// SUBSCRIPTIONS
// ========================================

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
