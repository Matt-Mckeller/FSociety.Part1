/**
 * Mock for next/image - for Storybook compatibility.
 * Renders a standard img tag instead of Next.js optimized Image.
 */
import React from "react"

interface ImageProps {
  src: string | { src: string; height?: number; width?: number }
  alt: string
  width?: number | string
  height?: number | string
  fill?: boolean
  sizes?: string
  quality?: number
  priority?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  loader?: (props: { src: string; width: number; quality?: number }) => string
  onLoadingComplete?: (result: { naturalWidth: number; naturalHeight: number }) => void
  onLoad?: React.ReactEventHandler<HTMLImageElement>
  onError?: React.ReactEventHandler<HTMLImageElement>
  loading?: "lazy" | "eager"
  unoptimized?: boolean
  style?: React.CSSProperties
  className?: string
  [key: string]: any
}

// Mock Image component - renders a standard img tag
function Image({
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  quality,
  priority,
  placeholder,
  blurDataURL,
  loader,
  onLoadingComplete,
  onLoad,
  onError,
  loading,
  unoptimized,
  style,
  className,
  ...props
}: ImageProps) {
  // Handle src as object (static import)
  const imgSrc = typeof src === "object" ? src.src : src
  const imgWidth = width ?? (typeof src === "object" ? src.width : undefined)
  const imgHeight = height ?? (typeof src === "object" ? src.height : undefined)

  const imgStyle: React.CSSProperties = fill
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
    : style || {}

  return (
    <img
      src={imgSrc}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      loading={loading || (priority ? "eager" : "lazy")}
      onLoad={(e) => {
        onLoad?.(e)
        onLoadingComplete?.({
          naturalWidth: e.currentTarget.naturalWidth,
          naturalHeight: e.currentTarget.naturalHeight,
        })
      }}
      onError={onError}
      style={imgStyle}
      className={className}
      {...props}
    />
  )
}

export default Image
