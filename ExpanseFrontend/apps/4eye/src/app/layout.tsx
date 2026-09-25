import type { Metadata } from "next"

/**
 * Root Layout
 *
 * This is a minimal root layout. The actual layout with providers
 * is in [locale]/layout.tsx to support internationalization.
 */
export const metadata: Metadata = {
  title: "4eye",
  description:
    "Turning school into a game to improve engagement and learning outcomes.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // The [locale] layout handles html/body tags
  return children
}
