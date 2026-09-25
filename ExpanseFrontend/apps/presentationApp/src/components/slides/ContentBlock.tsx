'use client';

import { Box, Typography, Paper, Button, Chip, Stack, Alert } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import type { ContentBlock, QuizAnswer } from '../../types';
import { useState } from 'react';
import { useUserStore, useQuestStore } from '../../store';

interface ContentBlockRendererProps {
  block: ContentBlock;
}

export function ContentBlockRenderer({ block }: ContentBlockRendererProps) {
  switch (block.type) {
    case 'text':
      return <TextBlock content={block.baseContent} />;
    case 'code':
      return <CodeBlock content={block.baseContent} />;
    case 'quiz':
      return <QuizBlock content={block.baseContent} />;
    case 'media':
      return <MediaBlock content={block.baseContent} />;
    default:
      return (
        <Typography color="text.secondary">
          Unknown block type: {block.type}
        </Typography>
      );
  }
}

// === TEXT BLOCK ===

function TextBlock({ content }: { content: ContentBlock['baseContent'] }) {
  const markdown = content.markdown || content.text || '';

  return (
    <Box
      sx={{
        '& h1': { fontSize: '2rem', fontWeight: 700, mb: 2, mt: 0 },
        '& h2': { fontSize: '1.5rem', fontWeight: 600, mb: 2, mt: 3 },
        '& h3': { fontSize: '1.25rem', fontWeight: 600, mb: 1.5, mt: 2 },
        '& p': { mb: 2, lineHeight: 1.7 },
        '& ul, & ol': { mb: 2, pl: 3 },
        '& li': { mb: 0.5 },
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          mb: 2,
        },
        '& th, & td': {
          border: 1,
          borderColor: 'divider',
          p: 1.5,
          textAlign: 'left',
        },
        '& th': {
          bgcolor: 'action.hover',
          fontWeight: 600,
        },
        '& code': {
          bgcolor: 'action.hover',
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
          fontFamily: 'monospace',
          fontSize: '0.9em',
        },
        '& strong': { fontWeight: 600 },
      }}
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Box>
  );
}

// === CODE BLOCK ===

function CodeBlock({ content }: { content: ContentBlock['baseContent'] }) {
  const code = content.code || '';
  const language = content.language || 'typescript';

  return (
    <Paper
      sx={{
        p: 2,
        bgcolor: '#1e1e1e',
        borderRadius: 2,
        overflow: 'auto',
      }}
      elevation={0}
    >
      <Chip
        label={language}
        size="small"
        sx={{ mb: 1, bgcolor: 'action.hover' }}
      />
      <Box
        component="pre"
        sx={{
          m: 0,
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          lineHeight: 1.6,
          color: '#d4d4d4',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        <code>{code}</code>
      </Box>
    </Paper>
  );
}

// === QUIZ BLOCK ===

function QuizBlock({ content }: { content: ContentBlock['baseContent'] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const addXp = useUserStore((s) => s.addXp);
  const addCoins = useUserStore((s) => s.addCoins);
  const updateProgress = useQuestStore((s) => s.updateProgress);

  const question = content.question || '';
  const answers = content.answers || [];

  const handleSubmit = () => {
    setSubmitted(true);
    const selectedAnswer = answers.find((a) => a.id === selected);
    if (selectedAnswer?.isCorrect) {
      addXp(50);
      addCoins(15);
      updateProgress('q3', 1); // Update "Complete quiz" quest
    }
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  const correctAnswer = answers.find((a) => a.isCorrect);
  const isCorrect = selected === correctAnswer?.id;

  return (
    <Paper sx={{ p: 3, bgcolor: 'background.default' }} elevation={0}>
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        ❓ Quiz
      </Typography>
      
      <Typography sx={{ mb: 3 }}>{question}</Typography>

      <Stack spacing={1} sx={{ mb: 3 }}>
        {answers.map((answer: QuizAnswer) => {
          const isSelected = selected === answer.id;
          const showResult = submitted;
          const isAnswerCorrect = answer.isCorrect;

          let bgcolor = 'action.hover';
          let borderColor = 'transparent';
          
          if (showResult) {
            if (isAnswerCorrect) {
              bgcolor = 'success.dark';
              borderColor = 'success.main';
            } else if (isSelected && !isAnswerCorrect) {
              bgcolor = 'error.dark';
              borderColor = 'error.main';
            }
          } else if (isSelected) {
            bgcolor = 'primary.dark';
            borderColor = 'primary.main';
          }

          return (
            <Button
              key={answer.id}
              variant="outlined"
              onClick={() => !submitted && setSelected(answer.id)}
              disabled={submitted}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                px: 2,
                bgcolor,
                borderColor,
                color: 'text.primary',
                textTransform: 'none',
                '&:hover': {
                  bgcolor: submitted ? bgcolor : 'action.selected',
                },
                '&.Mui-disabled': {
                  color: 'text.primary',
                },
              }}
            >
              {answer.text}
            </Button>
          );
        })}
      </Stack>

      {submitted ? (
        <Stack spacing={2}>
          <Alert severity={isCorrect ? 'success' : 'error'}>
            {isCorrect
              ? '🎉 Correct! +50 XP, +15 coins'
              : `Not quite. The correct answer is: ${correctAnswer?.text}`}
          </Alert>
          <Button variant="outlined" onClick={handleReset}>
            Try Again
          </Button>
        </Stack>
      ) : (
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selected}
        >
          Submit Answer
        </Button>
      )}
    </Paper>
  );
}

// === MEDIA BLOCK ===

function MediaBlock({ content }: { content: ContentBlock['baseContent'] }) {
  const { mediaType, src, alt } = content;

  if (!src) {
    return <Typography color="text.secondary">No media source</Typography>;
  }

  switch (mediaType) {
    case 'image':
      return (
        <Box
          component="img"
          src={src}
          alt={alt || ''}
          sx={{
            maxWidth: '100%',
            borderRadius: 2,
          }}
        />
      );
    case 'video':
      return (
        <Box
          component="video"
          src={src}
          controls
          sx={{
            maxWidth: '100%',
            borderRadius: 2,
          }}
        />
      );
    default:
      return (
        <Typography color="text.secondary">
          Unsupported media type: {mediaType}
        </Typography>
      );
  }
}
