import { communicationSession } from "@/data/session"
import { PresentationPageClient } from "./PresentationPageClient"

export function generateStaticParams() {
  return communicationSession.messageDrafts.map((draft) => ({
    messageId: draft.id,
    profileId: "primary",
  }))
}

export default function PresentationPage({
  params,
}: {
  params: { messageId: string; profileId: string }
}) {
  return <PresentationPageClient params={params} />
}
