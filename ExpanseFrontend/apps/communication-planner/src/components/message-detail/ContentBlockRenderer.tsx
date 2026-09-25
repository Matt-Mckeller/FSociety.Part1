"use client"

import { Box } from "@mui/material"
import { ContentBlock } from "@/types"
import { TransformationBlock } from "./TransformationBlock"
import {
  InsightBlock,
  VulnerabilityBlock,
  CredentialsBlock,
  ListBlock,
  CalloutBlock,
  MetaBlock,
  ReframeBlock,
  StoryBlock,
  AnalogyBlock,
  ContextBlock,
  ImplementationBlock,
  AmbitionBlock,
} from "./blocks"

interface ContentBlockRendererProps {
  blocks: ContentBlock[]
}

export function ContentBlockRenderer({ blocks }: ContentBlockRendererProps) {
  const renderBlock = (block: ContentBlock) => {
    // Route to type-specific renderer
    switch (block.type) {
      case "transformation":
        if (block.transformation) {
          return <TransformationBlock key={block.id} block={block} />
        }
        return <ContextBlock key={block.id} block={block} />
      case "insight":
        return <InsightBlock key={block.id} block={block} />
      case "vulnerability":
        return <VulnerabilityBlock key={block.id} block={block} />
      case "credentials":
        return <CredentialsBlock key={block.id} block={block} />
      case "list":
        return <ListBlock key={block.id} block={block} />
      case "callout":
        return <CalloutBlock key={block.id} block={block} />
      case "meta":
        return <MetaBlock key={block.id} block={block} />
      case "reframe":
        return <ReframeBlock key={block.id} block={block} />
      case "story":
        return <StoryBlock key={block.id} block={block} />
      case "analogy":
        return <AnalogyBlock key={block.id} block={block} />
      case "context":
        return <ContextBlock key={block.id} block={block} />
      case "implementation":
        return <ImplementationBlock key={block.id} block={block} />
      case "ambition":
        return <AmbitionBlock key={block.id} block={block} />
      default:
        // Fallback to context block for unknown types
        return <ContextBlock key={block.id} block={block} />
    }
  }

  return <Box sx={{ mb: 1 }}>{blocks.map((block) => renderBlock(block))}</Box>
}
