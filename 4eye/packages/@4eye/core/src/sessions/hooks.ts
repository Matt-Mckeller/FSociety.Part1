/**
 * Session/Transcript React Hooks
 * 
 * Custom hooks for fetching and managing transcripts via GraphQL.
 */

import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useCallback, useEffect, useState } from 'react';
import {
  TRANSCRIPT_BY_SESSION_QUERY,
  TRANSCRIPT_QUERY,
  TRANSCRIPT_FULL_TEXT_QUERY,
  CREATE_TRANSCRIPT_MUTATION,
  ADD_TRANSCRIPT_SEGMENT_MUTATION,
  DELETE_TRANSCRIPT_MUTATION,
  TRANSCRIPT_SEGMENT_ADDED_SUBSCRIPTION,
  TRANSCRIPT_COMPLETED_SUBSCRIPTION,
} from './graphql';
import type { Transcript, TranscriptSegment, AddSegmentInput } from './types';

// ========================================
// QUERY HOOKS
// ========================================

/**
 * Fetch transcript for a session
 */
export function useTranscriptBySession(sessionId: string | null) {
  const { data, loading, error, refetch } = useQuery<{
    transcriptBySession: Transcript | null;
  }>(TRANSCRIPT_BY_SESSION_QUERY, {
    variables: { sessionId },
    skip: !sessionId,
  });

  return {
    transcript: data?.transcriptBySession ?? null,
    isLoading: loading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Fetch transcript by ID
 */
export function useTranscript(transcriptId: string | null) {
  const { data, loading, error, refetch } = useQuery<{
    transcript: Transcript | null;
  }>(TRANSCRIPT_QUERY, {
    variables: { id: transcriptId },
    skip: !transcriptId,
  });

  return {
    transcript: data?.transcript ?? null,
    isLoading: loading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Fetch full transcript text
 */
export function useTranscriptFullText(transcriptId: string | null) {
  const { data, loading, error } = useQuery<{
    transcriptFullText: string;
  }>(TRANSCRIPT_FULL_TEXT_QUERY, {
    variables: { transcriptId },
    skip: !transcriptId,
  });

  return {
    fullText: data?.transcriptFullText ?? '',
    isLoading: loading,
    error: error?.message ?? null,
  };
}

// ========================================
// MUTATION HOOKS
// ========================================

/**
 * Create a new transcript for a session
 */
export function useCreateTranscript() {
  const [mutate, { loading, error }] = useMutation<{
    createTranscript: Transcript;
  }>(CREATE_TRANSCRIPT_MUTATION);

  const createTranscript = useCallback(
    async (sessionId: string, language?: string) => {
      const result = await mutate({
        variables: { sessionId, language },
      });
      return result.data?.createTranscript ?? null;
    },
    [mutate],
  );

  return {
    createTranscript,
    isLoading: loading,
    error: error?.message ?? null,
  };
}

/**
 * Add a segment to a transcript
 */
export function useAddTranscriptSegment() {
  const [mutate, { loading, error }] = useMutation<{
    addTranscriptSegment: TranscriptSegment;
  }>(ADD_TRANSCRIPT_SEGMENT_MUTATION);

  const addSegment = useCallback(
    async (input: AddSegmentInput) => {
      const result = await mutate({
        variables: input,
      });
      return result.data?.addTranscriptSegment ?? null;
    },
    [mutate],
  );

  return {
    addSegment,
    isLoading: loading,
    error: error?.message ?? null,
  };
}

/**
 * Delete a transcript
 */
export function useDeleteTranscript() {
  const [mutate, { loading, error }] = useMutation<{
    deleteTranscript: boolean;
  }>(DELETE_TRANSCRIPT_MUTATION);

  const deleteTranscript = useCallback(
    async (transcriptId: string) => {
      const result = await mutate({
        variables: { id: transcriptId },
      });
      return result.data?.deleteTranscript ?? false;
    },
    [mutate],
  );

  return {
    deleteTranscript,
    isLoading: loading,
    error: error?.message ?? null,
  };
}

// ========================================
// SUBSCRIPTION HOOKS
// ========================================

/**
 * Subscribe to real-time transcript segments
 */
export function useTranscriptSegmentSubscription(
  sessionId: string | null,
  onSegment?: (segment: TranscriptSegment) => void,
) {
  const { data, loading, error } = useSubscription<{
    transcriptSegmentAdded: TranscriptSegment;
  }>(TRANSCRIPT_SEGMENT_ADDED_SUBSCRIPTION, {
    variables: { sessionId },
    skip: !sessionId,
    onData: ({ data: subscriptionData }) => {
      if (subscriptionData.data?.transcriptSegmentAdded && onSegment) {
        onSegment(subscriptionData.data.transcriptSegmentAdded);
      }
    },
  });

  return {
    latestSegment: data?.transcriptSegmentAdded ?? null,
    isSubscribed: !loading && !error,
    error: error?.message ?? null,
  };
}

/**
 * Subscribe to transcript completion events
 */
export function useTranscriptCompletedSubscription(
  sessionId: string | null,
  onCompleted?: (transcript: Transcript) => void,
) {
  const { data, loading, error } = useSubscription<{
    transcriptCompleted: Transcript;
  }>(TRANSCRIPT_COMPLETED_SUBSCRIPTION, {
    variables: { sessionId },
    skip: !sessionId,
    onData: ({ data: subscriptionData }) => {
      if (subscriptionData.data?.transcriptCompleted && onCompleted) {
        onCompleted(subscriptionData.data.transcriptCompleted);
      }
    },
  });

  return {
    completedTranscript: data?.transcriptCompleted ?? null,
    isSubscribed: !loading && !error,
    error: error?.message ?? null,
  };
}

// ========================================
// COMBINED HOOKS
// ========================================

/**
 * Combined hook for live transcription with subscription support
 * 
 * Manages both initial transcript fetch and real-time segment updates.
 */
export function useLiveTranscript(sessionId: string | null) {
  const [segments, setSegments] = useState<TranscriptSegment[]>([]);
  
  // Fetch existing transcript
  const { transcript, isLoading, error, refetch } = useTranscriptBySession(sessionId);
  
  // Initialize segments from fetched transcript
  useEffect(() => {
    if (transcript?.segments) {
      setSegments(transcript.segments);
    }
  }, [transcript]);

  // Subscribe to new segments
  const { isSubscribed } = useTranscriptSegmentSubscription(
    sessionId,
    (newSegment) => {
      setSegments((prev) => {
        // Check if segment already exists (by ID or sequence)
        const exists = prev.some(
          (s) => s.id === newSegment.id || s.sequenceIndex === newSegment.sequenceIndex,
        );
        if (exists) {
          // Update existing segment
          return prev.map((s) =>
            s.sequenceIndex === newSegment.sequenceIndex ? newSegment : s,
          );
        }
        // Add new segment
        return [...prev, newSegment].sort((a, b) => a.sequenceIndex - b.sequenceIndex);
      });
    },
  );

  // Subscribe to completion
  const { completedTranscript } = useTranscriptCompletedSubscription(sessionId);

  return {
    transcript,
    segments,
    isLoading,
    error,
    isSubscribed,
    isCompleted: completedTranscript !== null || transcript?.status === 'COMPLETED',
    refetch,
  };
}
