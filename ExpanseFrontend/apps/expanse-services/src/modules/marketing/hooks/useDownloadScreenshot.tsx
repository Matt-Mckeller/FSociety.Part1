"use client"
import html2canvas from "html2canvas"
import { ReactNode } from "react"

type DownloadScreenshotProps = {
  container: HTMLElement | ReactNode
  fileName: string
  imageType?: string // image/jpg image/png and other options
  scale: number
}
export type DownloadScreenshotType = {
  downloadScreenshot: (params: DownloadScreenshotProps) => void
}

export const useDownloadScreenshot = () => {
  const downloadScreenshot = ({
    container,
    fileName,
    imageType = "image/jpg",
    scale = 1,
  }: DownloadScreenshotProps) => {
    if (container) {
      // @ts-expect-error expects an html element type not react node but react node works
      html2canvas(container, { scale: 3 }).then((canvas) => {
        if (typeof window !== "undefined") {
          const dataURL = canvas.toDataURL(imageType)

          const link = document.createElement("a")
          link.href = dataURL
          link.download = fileName

          link.click()
        }
      })
    } else {
      throw new Error("could not find container")
    }
  }
  return {
    downloadScreenshot,
  }
}
