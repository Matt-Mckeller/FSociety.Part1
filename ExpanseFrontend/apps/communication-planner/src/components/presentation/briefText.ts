/** First sentences of slide copy, with markdown markers stripped. */
export function briefText(content: string, maxSentences = 2): string {
  const plain = content
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/[_`]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim()

  if (!plain) return ""

  const parts = plain.split(/(?<=[.!?])\s+/).filter(Boolean)
  return parts.slice(0, maxSentences).join(" ")
}

export function hasMoreText(content: string, maxSentences = 2): boolean {
  const plain = content.replace(/\s+/g, " ").trim()
  if (!plain) return false
  const brief = briefText(content, maxSentences)
  return plain.length > brief.length + 8
}
