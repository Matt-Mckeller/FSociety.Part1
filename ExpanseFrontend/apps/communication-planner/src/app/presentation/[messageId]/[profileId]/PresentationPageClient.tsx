"use client"

import { notFound, useRouter } from "next/navigation"
import { communicationSession } from "@/data/session"
import { PresentationCanvas, useSlideGenerator } from "@/components/presentation"

interface PresentationPageClientProps {
  params: {
    messageId: string
    profileId: string
  }
}

export function PresentationPageClient({ params }: PresentationPageClientProps) {
  const router = useRouter()
  const { messageId, profileId } = params
  const session = communicationSession
  const message = session.messageDrafts.find((d) => d.id === messageId)
  const profile = session.recipientProfile
  const fallbackMessage = session.messageDrafts[0]

  const { slides } = useSlideGenerator({
    message: message ?? fallbackMessage,
    profile,
    psychApproach: session.strategy.psychologicalApproach,
    includeQuizSlides: false,
  })

  if (!message || profileId !== "primary") {
    notFound()
  }

  const handleExit = () => {
    router.push("/presentation")
  }

  return (
    <PresentationCanvas
      slides={slides}
      onExit={handleExit}
      showPresenterNotes={false}
    />
  )
}
