/**
 * Export Utilities
 * Helper functions for downloading generated files
 */

/**
 * Download a file in the browser
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType = "text/plain",
) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Download TypeScript file
 * Using text/plain to avoid .ts being detected as MPEG-2 Transport Stream
 */
export function downloadTypeScriptFile(content: string, filename: string) {
  downloadFile(content, filename, "text/plain")
}

/**
 * Download JSON file
 */
export function downloadJsonFile(data: unknown, filename: string) {
  const content = JSON.stringify(data, null, 2)
  downloadFile(content, filename, "application/json")
}
