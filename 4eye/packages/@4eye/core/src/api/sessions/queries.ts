/**
 * Sessions/Transcript GraphQL Queries
 * 
 * @module core/api/sessions
 */

import { gql } from '@apollo/client';
import { TRANSCRIPT_WITH_SEGMENTS_FRAGMENT } from './fragments';

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
