import { communicationSession } from "@/data/session"
import { MessagePageClient } from "./MessagePageClient"

export function generateStaticParams() {
  return communicationSession.messageDrafts.map((draft) => ({ id: draft.id }))
}

export default function MessagePage({ params }: { params: { id: string } }) {
  return <MessagePageClient params={params} />
}
