"use client"

import { useRouter, usePathname } from "next/navigation"
import { FullHud } from "@expanse/hud"
import { FOUREYE_HUD_NAV_CONFIG } from "@/lib/hud/navigationConfig"

/**
 * Client shell that mounts the FullHud chrome around the (hud) route group.
 *
 * Lives in a client component so it can call `useRouter` and `usePathname`.
 * The parent `layout.tsx` is a server component that simply delegates to this.
 */
export function HudShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <FullHud
      navigationConfig={FOUREYE_HUD_NAV_CONFIG}
      nextRouter={router}
      pathname={pathname}
    >
      {children}
    </FullHud>
  )
}
