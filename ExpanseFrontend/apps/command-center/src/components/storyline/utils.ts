/**
 * Storyline Module - Utilities
 */
import type { StorylineWiki } from "../../types"

/**
 * Dynamically import wiki files for a storyline
 */
export async function loadWiki(
  storylineId: string,
): Promise<StorylineWiki | null> {
  try {
    const wiki = await import(`../../data/storylines/wiki/${storylineId}.json`)
    return wiki.default || wiki
  } catch {
    return null
  }
}
