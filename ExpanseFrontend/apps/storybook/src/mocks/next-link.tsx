/**
 * Mock for next/link - renders as a regular anchor tag in Storybook
 * This allows Link components to render without Next.js context
 */
import type { ReactNode, AnchorHTMLAttributes } from "react"

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string | { pathname: string; query?: Record<string, string> }
  children: ReactNode
  prefetch?: boolean
  replace?: boolean
  scroll?: boolean
  shallow?: boolean
  passHref?: boolean
  legacyBehavior?: boolean
  as?: string
  locale?: string | false
}

/**
 * Mock Link component that renders as a standard anchor tag
 * Handles both string and object href formats
 */
export default function Link({
  href,
  children,
  prefetch,
  replace,
  scroll,
  shallow,
  passHref,
  legacyBehavior,
  as,
  locale,
  ...props
}: LinkProps) {
  // Convert object href to string
  const hrefString =
    typeof href === "string"
      ? href
      : `${href.pathname}${href.query ? "?" + new URLSearchParams(href.query).toString() : ""}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    console.log("[Storybook] Link clicked:", hrefString)
    if (props.onClick) {
      props.onClick(e)
    }
  }

  return (
    <a href={hrefString} {...props} onClick={handleClick}>
      {children}
    </a>
  )
}

// Named export for compatibility
export { Link }
