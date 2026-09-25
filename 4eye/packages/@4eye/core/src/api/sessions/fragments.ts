/**
 * Sessions/Transcript GraphQL Fragments
 * 
 * @module core/api/sessions
 */

import { gql } from '@apollo/client';

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
