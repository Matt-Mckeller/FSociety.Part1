"use client"

import { useEffect, useRef, useId } from "react"
import mermaid from "mermaid"

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
})

export interface MermaidChartProps {
  chart: string
  className?: string
}

export function MermaidChart({ chart, className }: MermaidChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const uniqueId = useId().replace(/:/g, "-")

  useEffect(() => {
    if (!containerRef.current) return

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${uniqueId}`, chart)
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerHTML = `<pre style="color:#d32f2f">Diagram error: ${err instanceof Error ? err.message : err}</pre>`
        }
      }
    }

    renderChart()
  }, [chart, uniqueId])

  return (
    <div
      ref={containerRef}
      className={className || "qw-mermaid-container"}
    />
  )
}
