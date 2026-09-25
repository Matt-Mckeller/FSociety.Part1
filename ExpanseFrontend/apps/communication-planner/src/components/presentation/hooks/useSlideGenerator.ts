"use client"

import { useMemo } from "react"
import {
  MessageDraft,
  ContentBlock,
  RecipientProfile,
  PsychologicalApproach,
} from "@/types"

export type SlideType =
  | "title"
  | "content"
  | "transformation"
  | "quiz"
  | "summary"

export interface Slide {
  id: string
  type: SlideType
  title: string
  content?: string
  block?: ContentBlock
  blockType?: ContentBlock["type"]
  imageKey?: ContentBlock["imageKey"]
  imagePlaceholder?: ContentBlock["imagePlaceholder"]
  related?: ContentBlock[]
  theme?: string
  audienceName?: string
  transformation?: ContentBlock["transformation"]
  quizQuestionId?: string
  keyPoints?: string[]
  psychApproachSteps?: number[]
  engagementHooks?: ContentBlock["engagementHooks"]
}

export interface UseSlideGeneratorOptions {
  message: MessageDraft
  profile: RecipientProfile
  psychApproach: PsychologicalApproach[]
  includeQuizSlides?: boolean
  quizQuestionIds?: string[]
}

export interface UseSlideGeneratorReturn {
  slides: Slide[]
  totalSlides: number
}

const SKIP_TYPES = new Set<ContentBlock["type"]>(["meta", "credentials"])

/** Title + learning shifts + at most one setup/follow-up deck. */
export function groupPresentationBlocks(
  blocks: ContentBlock[]
): ContentBlock[][] {
  const visible = blocks.filter((block) => !SKIP_TYPES.has(block.type))
  if (visible.length === 0) return []

  const firstShift = visible.findIndex((block) => block.type === "transformation")
  if (firstShift === -1) {
    return [visible]
  }

  let lastShift = firstShift
  for (let i = visible.length - 1; i >= 0; i -= 1) {
    if (visible[i].type === "transformation") {
      lastShift = i
      break
    }
  }
  const groups: ContentBlock[][] = []
  const before = visible.slice(0, firstShift)
  if (before.length > 0) groups.push(before)

  let index = firstShift
  while (index <= lastShift) {
    if (visible[index].type === "transformation") {
      groups.push([visible[index]])
      index += 1
      continue
    }
    const start = index
    while (index <= lastShift && visible[index].type !== "transformation") {
      index += 1
    }
    groups.push(visible.slice(start, index))
  }

  const after = visible.slice(lastShift + 1)
  if (after.length > 0) groups.push(after)
  return groups
}

export function countPresentationSlides(message: MessageDraft): number {
  const groups = groupPresentationBlocks(message.contentBlocks ?? [])
  const summary = message.keyPoints && message.keyPoints.length > 0 ? 1 : 0
  return 1 + groups.length + summary
}

function slideFromGroup(
  messageId: string,
  group: ContentBlock[],
  quizQuestionIds: string[],
  includeQuizSlides: boolean
): Slide[] {
  const [primary, ...related] = group
  const isShift = primary.type === "transformation"
  const slides: Slide[] = [
    {
      id: `${messageId}-${primary.id}`,
      type: isShift ? "transformation" : "content",
      title: primary.label,
      content: primary.content,
      block: primary,
      blockType: primary.type,
      imageKey: primary.imageKey,
      imagePlaceholder: primary.imagePlaceholder,
      related,
      transformation: isShift ? primary.transformation : undefined,
      psychApproachSteps: primary.psychApproachSteps,
      engagementHooks: primary.engagementHooks,
    },
  ]

  if (includeQuizSlides) {
    const relatedQuizQuestion = quizQuestionIds.find((qId) =>
      qId.includes(primary.id)
    )
    if (relatedQuizQuestion) {
      slides.push({
        id: `${messageId}-quiz-${relatedQuizQuestion}`,
        type: "quiz",
        title: "Check Your Understanding",
        quizQuestionId: relatedQuizQuestion,
      })
    }
  }

  return slides
}

export function useSlideGenerator({
  message,
  profile,
  includeQuizSlides = false,
  quizQuestionIds = [],
}: UseSlideGeneratorOptions): UseSlideGeneratorReturn {
  const slides = useMemo(() => {
    const result: Slide[] = [
      {
        id: `${message.id}-title`,
        type: "title",
        title: message.title,
        theme: message.theme,
        audienceName: profile.name,
      },
    ]

    for (const group of groupPresentationBlocks(message.contentBlocks ?? [])) {
      result.push(
        ...slideFromGroup(
          message.id,
          group,
          quizQuestionIds,
          includeQuizSlides
        )
      )
    }

    if (message.keyPoints && message.keyPoints.length > 0) {
      result.push({
        id: `${message.id}-summary`,
        type: "summary",
        title: "Key Takeaways",
        keyPoints: message.keyPoints,
      })
    }

    return result
  }, [message, profile.name, includeQuizSlides, quizQuestionIds])

  return {
    slides,
    totalSlides: slides.length,
  }
}
