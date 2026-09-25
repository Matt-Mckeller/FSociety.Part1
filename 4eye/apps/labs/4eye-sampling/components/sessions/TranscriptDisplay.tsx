'use client';

import { useRef, useEffect } from 'react';
import { Box, Typography, Stack, Chip, Fade } from '@mui/material';
import { Person, AutoAwesome } from '@mui/icons-material';

interface TranscriptSegment {
  id: string;
  sequenceIndex: number;
  startTimeMs: number;
  endTimeMs: number;
  text: string;
  speakerLabel?: string;
  confidence?: number;
  isFinal: boolean;
}

interface TranscriptDisplayProps {
  segments: TranscriptSegment[];
  isLive?: boolean;
  showTimestamps?: boolean;
  showConfidence?: boolean;
}

/**
 * Format milliseconds to MM:SS format
 */
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Get color for confidence level
 */
function getConfidenceColor(confidence: number | undefined): string {
  if (!confidence) return 'default';
  if (confidence >= 0.9) return 'success';
  if (confidence >= 0.7) return 'warning';
  return 'error';
}

interface SegmentItemProps {
  segment: TranscriptSegment;
  showTimestamp: boolean;
  showConfidence: boolean;
  isLatest: boolean;
}

function SegmentItem({ segment, showTimestamp, showConfidence, isLatest }: SegmentItemProps) {
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          p: 2,
          borderRadius: 1,
          bgcolor: isLatest && !segment.isFinal ? 'action.hover' : 'transparent',
          borderLeft: 3,
          borderColor: segment.isFinal ? 'primary.main' : 'warning.main',
          mb: 1,
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 0.5
          }}>
          <Stack direction="row" spacing={1} sx={{
            alignItems: "center"
          }}>
            {segment.speakerLabel ? (
              <Chip
                icon={<Person fontSize="small" />}
                label={segment.speakerLabel}
                size="small"
                variant="outlined"
              />
            ) : (
              <Chip
                icon={<AutoAwesome fontSize="small" />}
                label="Auto"
                size="small"
                variant="outlined"
                color="default"
              />
            )}
            
            {showTimestamp && (
              <Typography variant="caption" sx={{
                color: "text.secondary"
              }}>
                {formatTime(segment.startTimeMs)}
              </Typography>
            )}
          </Stack>

          {showConfidence && segment.confidence !== undefined && (
            <Chip
              label={`${Math.round(segment.confidence * 100)}%`}
              size="small"
              color={getConfidenceColor(segment.confidence) as any}
              variant="outlined"
            />
          )}
        </Stack>

        <Typography
          variant="body1"
          sx={{
            opacity: segment.isFinal ? 1 : 0.7,
            fontStyle: segment.isFinal ? 'normal' : 'italic',
          }}
        >
          {segment.text}
          {!segment.isFinal && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: 6,
                height: 16,
                bgcolor: 'primary.main',
                ml: 0.5,
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 50%': { opacity: 1 },
                  '51%, 100%': { opacity: 0 },
                },
              }}
            />
          )}
        </Typography>
      </Box>
    </Fade>
  );
}

/**
 * Transcript Display Component
 * 
 * Displays transcript segments with auto-scroll for live transcription.
 * Shows timestamps, speaker labels, and confidence indicators.
 */
export function TranscriptDisplay({
  segments,
  isLive = false,
  showTimestamps = true,
  showConfidence = false,
}: TranscriptDisplayProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  // Auto-scroll to bottom when new segments arrive
  useEffect(() => {
    if (shouldAutoScroll.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [segments]);

  // Detect manual scroll to disable auto-scroll
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    shouldAutoScroll.current = isAtBottom;
  };

  if (segments.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: 'text.secondary',
        }}
      >
        {isLive ? (
          <>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: 3,
                borderColor: 'primary.main',
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
                mb: 2,
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
            <Typography variant="body1">
              Listening for speech...
            </Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Start speaking to see the transcript
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1">
              No transcript available
            </Typography>
            <Typography variant="caption" sx={{
              color: "text.secondary"
            }}>
              Start a recording session to begin transcription
            </Typography>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box
      ref={scrollContainerRef}
      onScroll={handleScroll}
      sx={{
        height: '100%',
        overflow: 'auto',
        pr: 1,
        // Custom scrollbar
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'grey.100',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'grey.400',
          borderRadius: 4,
          '&:hover': {
            bgcolor: 'grey.500',
          },
        },
      }}
    >
      {segments.map((segment, index) => (
        <SegmentItem
          key={segment.id || `segment-${index}`}
          segment={segment}
          showTimestamp={showTimestamps}
          showConfidence={showConfidence}
          isLatest={index === segments.length - 1}
        />
      ))}
    </Box>
  );
}
