import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Chip,
  Stack,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { lightColors } from '../constants';
import type { ContentType } from '../types';

interface ContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  contentType: ContentType;
  onRegenerate: () => void;
  isGenerating?: boolean;
  wordLimit?: number;
  characterLimit?: number;
}

export function ContentEditor({
  content,
  onContentChange,
  contentType,
  onRegenerate,
  isGenerating = false,
  wordLimit,
  characterLimit,
}: ContentEditorProps) {
  const [isCopied, setIsCopied] = useState(false);
  const textFieldRef = useRef<HTMLTextAreaElement>(null);

  const effectiveWordLimit = wordLimit || contentType.wordLimit || 500;
  const effectiveCharLimit = characterLimit || contentType.characterLimit || 3000;

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const wordProgress = (wordCount / effectiveWordLimit) * 100;
  const charProgress = (charCount / effectiveCharLimit) * 100;

  const isOverWordLimit = wordCount > effectiveWordLimit;
  const isOverCharLimit = charCount > effectiveCharLimit;
  const isNearLimit = wordProgress > 80 || charProgress > 80;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getWordCountColor = () => {
    if (isOverWordLimit) return lightColors.error;
    if (wordProgress > 80) return lightColors.warning;
    return lightColors.text.secondary;
  };

  const getCharCountColor = () => {
    if (isOverCharLimit) return lightColors.error;
    if (charProgress > 80) return lightColors.warning;
    return lightColors.text.secondary;
  };

  return (
    <Card sx={{ bgcolor: lightColors.paper, border: `1px solid ${lightColors.border}`, height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h6" fontWeight={600} color={lightColors.text.primary}>
              Content Editor
            </Typography>
            <Chip
              label={`${contentType.icon} ${contentType.label}`}
              size="small"
              sx={{ bgcolor: lightColors.primaryLight, color: lightColors.primary, fontWeight: 500 }}
            />
          </Box>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title={isCopied ? 'Copied!' : 'Copy content'}>
              <IconButton onClick={handleCopy} size="small">
                {isCopied ? (
                  <CheckCircleIcon sx={{ color: lightColors.success }} />
                ) : (
                  <ContentCopyIcon sx={{ color: lightColors.text.secondary }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Regenerate">
              <IconButton onClick={onRegenerate} disabled={isGenerating} size="small">
                <RefreshIcon sx={{ color: lightColors.text.secondary }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Loading Progress */}
        {isGenerating && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <AutoFixHighIcon sx={{ color: lightColors.primary, fontSize: 18 }} />
              <Typography variant="caption" color={lightColors.primary} fontWeight={500}>
                Generating content...
              </Typography>
            </Box>
            <LinearProgress 
              sx={{ 
                height: 4, 
                borderRadius: 2,
                bgcolor: lightColors.primaryLight,
                '& .MuiLinearProgress-bar': { bgcolor: lightColors.primary },
              }} 
            />
          </Box>
        )}

        {/* Text Editor */}
        <TextField
          multiline
          fullWidth
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          inputRef={textFieldRef}
          placeholder={`Start typing your ${contentType.label.toLowerCase()} content here...`}
          disabled={isGenerating}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              height: '100%',
              alignItems: 'flex-start',
              bgcolor: lightColors.paperHover,
              fontSize: '0.95rem',
              lineHeight: 1.7,
              '& fieldset': {
                borderColor: isOverWordLimit || isOverCharLimit ? lightColors.error : lightColors.border,
              },
              '&:hover fieldset': {
                borderColor: isOverWordLimit || isOverCharLimit ? lightColors.error : lightColors.primary,
              },
              '&.Mui-focused fieldset': {
                borderColor: isOverWordLimit || isOverCharLimit ? lightColors.error : lightColors.primary,
                borderWidth: 2,
              },
            },
            '& .MuiOutlinedInput-input': {
              height: '100% !important',
              overflow: 'auto !important',
            },
          }}
          slotProps={{
            input: {
              sx: { minHeight: 300 },
            },
          }}
        />

        {/* Stats Bar */}
        <Box sx={{ mt: 2 }}>
          {/* Progress Bar */}
          <Box sx={{ position: 'relative', height: 4, mb: 1.5, borderRadius: 2, overflow: 'hidden' }}>
            <Box 
              sx={{ 
                position: 'absolute', 
                inset: 0, 
                bgcolor: lightColors.border,
              }} 
            />
            <Box 
              sx={{ 
                position: 'absolute', 
                inset: 0, 
                width: `${Math.min(wordProgress, 100)}%`,
                bgcolor: isOverWordLimit ? lightColors.error : isNearLimit ? lightColors.warning : lightColors.success,
                transition: 'all 0.3s ease',
              }} 
            />
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" fontWeight={600} color={getWordCountColor()}>
                  {wordCount.toLocaleString()}
                </Typography>
                <Typography variant="caption" color={lightColors.text.muted}>
                  / {effectiveWordLimit.toLocaleString()} words
                </Typography>
                {isOverWordLimit && <WarningAmberIcon sx={{ color: lightColors.error, fontSize: 14 }} />}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="caption" fontWeight={600} color={getCharCountColor()}>
                  {charCount.toLocaleString()}
                </Typography>
                <Typography variant="caption" color={lightColors.text.muted}>
                  / {effectiveCharLimit.toLocaleString()} chars
                </Typography>
                {isOverCharLimit && <WarningAmberIcon sx={{ color: lightColors.error, fontSize: 14 }} />}
              </Box>
            </Stack>

            {/* Quick Actions */}
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="contained"
                disabled={isGenerating || !content.trim()}
                onClick={onRegenerate}
                startIcon={<AutoFixHighIcon />}
                sx={{
                  bgcolor: lightColors.primary,
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  px: 2,
                  '&:hover': { bgcolor: lightColors.primaryHover },
                }}
              >
                Enhance
              </Button>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
