import { HudShell } from "./HudShell"

/**
 * Layout for all routes that should render inside the 4eye HUD chrome.
 *
 * This is a server component — data fetching, metadata, and auth guards
 * on child pages all work normally.  The client-side HUD chrome is mounted
 * by HudShell without affecting server rendering of page content.
 */
export default function HudLayout({ children }: { children: React.ReactNode }) {
  return <HudShell>{children}</HudShell>
}
