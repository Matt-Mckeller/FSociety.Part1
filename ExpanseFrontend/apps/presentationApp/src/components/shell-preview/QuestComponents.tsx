'use client'

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Button,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import StarIcon from '@mui/icons-material/Star'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import TimerIcon from '@mui/icons-material/Timer'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// ============================================================================
// Quest Types
// ============================================================================

export type QuestRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
export type QuestStatus = 'available' | 'active' | 'completed' | 'claimed'
export type QuestCategory = 'learning' | 'exploration' | 'achievement' | 'daily' | 'challenge'

export interface QuestReward {
  type: 'xp' | 'coins' | 'item'
  amount: number
  itemName?: string
}

export interface QuestObjective {
  id: string
  description: string
  current: number
  target: number
  completed: boolean
}

export interface Quest {
  id: string
  title: string
  description: string
  category: QuestCategory
  rarity: QuestRarity
  status: QuestStatus
  objectives: QuestObjective[]
  rewards: QuestReward[]
  timeLimit?: string // e.g., "24h", "7d"
  progress: number // 0-100
}

// ============================================================================
// Quest Data
// ============================================================================

export const sampleQuests: Quest[] = [
  {
    id: 'q1',
    title: 'Complete Introduction',
    description: 'Finish all slides in the Introduction section',
    category: 'learning',
    rarity: 'common',
    status: 'active',
    objectives: [
      { id: 'o1', description: 'View all slides', current: 8, target: 10, completed: false },
      { id: 'o2', description: 'Answer quiz question', current: 1, target: 1, completed: true },
    ],
    rewards: [
      { type: 'xp', amount: 150 },
      { type: 'coins', amount: 50 },
    ],
    progress: 80,
  },
  {
    id: 'q2',
    title: 'Daily Explorer',
    description: 'Visit 3 different sections today',
    category: 'daily',
    rarity: 'common',
    status: 'active',
    objectives: [
      { id: 'o1', description: 'Visit 3 sections', current: 2, target: 3, completed: false },
    ],
    rewards: [
      { type: 'xp', amount: 75 },
      { type: 'coins', amount: 25 },
    ],
    timeLimit: '8h',
    progress: 66,
  },
  {
    id: 'q3',
    title: 'Note Taker',
    description: 'Add 5 personal notes to slides',
    category: 'achievement',
    rarity: 'uncommon',
    status: 'available',
    objectives: [
      { id: 'o1', description: 'Create notes', current: 2, target: 5, completed: false },
    ],
    rewards: [
      { type: 'xp', amount: 200 },
      { type: 'coins', amount: 100 },
      { type: 'item', amount: 1, itemName: 'Scholar Badge' },
    ],
    progress: 40,
  },
  {
    id: 'q4',
    title: 'Speed Learner',
    description: 'Complete a section in under 10 minutes',
    category: 'challenge',
    rarity: 'rare',
    status: 'available',
    objectives: [
      { id: 'o1', description: 'Complete section quickly', current: 0, target: 1, completed: false },
    ],
    rewards: [
      { type: 'xp', amount: 500 },
      { type: 'coins', amount: 250 },
    ],
    progress: 0,
  },
]

// ============================================================================
// Styling Utilities
// ============================================================================

const rarityColors: Record<QuestRarity, { bg: string; border: string; text: string }> = {
  common: { bg: '#f1f5f9', border: '#cbd5e1', text: '#64748b' },
  uncommon: { bg: '#dcfce7', border: '#86efac', text: '#16a34a' },
  rare: { bg: '#dbeafe', border: '#93c5fd', text: '#2563eb' },
  epic: { bg: '#f3e8ff', border: '#c084fc', text: '#9333ea' },
  legendary: { bg: '#fef3c7', border: '#fcd34d', text: '#d97706' },
}

const categoryIcons: Record<QuestCategory, React.ReactNode> = {
  learning: <AutoAwesomeIcon sx={{ fontSize: 16 }} />,
  exploration: <EmojiEventsIcon sx={{ fontSize: 16 }} />,
  achievement: <StarIcon sx={{ fontSize: 16 }} />,
  daily: <TimerIcon sx={{ fontSize: 16 }} />,
  challenge: <EmojiEventsIcon sx={{ fontSize: 16 }} />,
}

// ============================================================================
// Quest Card Component
// ============================================================================

interface QuestCardProps {
  quest: Quest
  compact?: boolean
  onStart?: (questId: string) => void
  onClaim?: (questId: string) => void
}

export function QuestCard({ quest, compact = false, onStart, onClaim }: QuestCardProps) {
  const colors = rarityColors[quest.rarity]
  const isActive = quest.status === 'active'
  const isCompleted = quest.progress === 100
  const isClaimed = quest.status === 'claimed'

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: isActive ? colors.border : '#e2e8f0',
        borderWidth: isActive ? 2 : 1,
        borderRadius: 2,
        transition: 'all 0.2s',
        opacity: isClaimed ? 0.6 : 1,
        '&:hover': {
          boxShadow: isClaimed ? 0 : 2,
          transform: isClaimed ? 'none' : 'translateY(-2px)',
        },
      }}
    >
      <CardContent sx={{ p: compact ? 1.5 : 2, '&:last-child': { pb: compact ? 1.5 : 2 } }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: 1.5,
                bgcolor: colors.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.text,
              }}
            >
              {categoryIcons[quest.category]}
            </Box>
            <Box>
              <Typography
                variant={compact ? 'body2' : 'subtitle1'}
                sx={{ fontWeight: 600, lineHeight: 1.2 }}
              >
                {quest.title}
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ mt: 0.25 }}>
                <Chip
                  label={quest.rarity}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: '0.65rem',
                    bgcolor: colors.bg,
                    color: colors.text,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                  }}
                />
                {quest.timeLimit && (
                  <Chip
                    icon={<TimerIcon sx={{ fontSize: '12px !important' }} />}
                    label={quest.timeLimit}
                    size="small"
                    sx={{ height: 18, fontSize: '0.65rem' }}
                  />
                )}
              </Stack>
            </Box>
          </Box>
          {isCompleted && !isClaimed && (
            <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
          )}
        </Box>

        {/* Description */}
        {!compact && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.8rem' }}>
            {quest.description}
          </Typography>
        )}

        {/* Progress */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: colors.text }}>
              {quest.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={quest.progress}
            sx={{
              height: 6,
              borderRadius: 3,
              bgcolor: '#e2e8f0',
              '& .MuiLinearProgress-bar': {
                bgcolor: isCompleted ? '#10b981' : colors.text,
                borderRadius: 3,
              },
            }}
          />
        </Box>

        {/* Objectives (for active quests) */}
        {isActive && !compact && quest.objectives.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            {quest.objectives.map((obj) => (
              <Box
                key={obj.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 0.5,
                  color: obj.completed ? '#10b981' : 'text.secondary',
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 14, opacity: obj.completed ? 1 : 0.3 }} />
                <Typography variant="caption" sx={{ flex: 1 }}>
                  {obj.description}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {obj.current}/{obj.target}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Rewards */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1}>
            {quest.rewards.map((reward, i) => (
              <Tooltip key={i} title={reward.itemName || `${reward.amount} ${reward.type.toUpperCase()}`}>
                <Chip
                  icon={
                    reward.type === 'xp' ? (
                      <StarIcon sx={{ fontSize: '14px !important', color: '#8b5cf6 !important' }} />
                    ) : reward.type === 'coins' ? (
                      <MonetizationOnIcon sx={{ fontSize: '14px !important', color: '#10b981 !important' }} />
                    ) : (
                      <AutoAwesomeIcon sx={{ fontSize: '14px !important', color: '#f59e0b !important' }} />
                    )
                  }
                  label={reward.itemName || `+${reward.amount}`}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    bgcolor: reward.type === 'xp' ? '#f3e8ff' : reward.type === 'coins' ? '#dcfce7' : '#fef3c7',
                  }}
                />
              </Tooltip>
            ))}
          </Stack>

          {/* Action Button */}
          {quest.status === 'available' && onStart && (
            <Button
              size="small"
              variant="outlined"
              startIcon={<PlayArrowIcon sx={{ fontSize: 16 }} />}
              onClick={() => onStart(quest.id)}
              sx={{ fontSize: '0.7rem', py: 0.25, px: 1 }}
            >
              Start
            </Button>
          )}
          {isCompleted && !isClaimed && onClaim && (
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() => onClaim(quest.id)}
              sx={{ fontSize: '0.7rem', py: 0.25, px: 1 }}
            >
              Claim
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

// ============================================================================
// Quest List Component
// ============================================================================

interface QuestListProps {
  quests: Quest[]
  compact?: boolean
  onStart?: (questId: string) => void
  onClaim?: (questId: string) => void
}

export function QuestList({ quests, compact = false, onStart, onClaim }: QuestListProps) {
  const activeQuests = quests.filter(q => q.status === 'active')
  const availableQuests = quests.filter(q => q.status === 'available')

  return (
    <Box>
      {/* Active Quests */}
      {activeQuests.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#f59e0b' }}>
            Active Quests ({activeQuests.length})
          </Typography>
          <Stack spacing={1.5}>
            {activeQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} compact={compact} onClaim={onClaim} />
            ))}
          </Stack>
        </Box>
      )}

      {/* Available Quests */}
      {availableQuests.length > 0 && (
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#64748b' }}>
            Available ({availableQuests.length})
          </Typography>
          <Stack spacing={1.5}>
            {availableQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} compact={compact} onStart={onStart} />
            ))}
          </Stack>
        </Box>
      )}

      {quests.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
          <EmojiEventsIcon sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
          <Typography variant="body2">No quests available</Typography>
        </Box>
      )}
    </Box>
  )
}

export default QuestList
