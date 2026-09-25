"use client"
import { WebAndMobileAppScreens } from "expanse.dynamicAssets"
import React, { useRef, useEffect, useState } from "react"

export function SvgToCanvasToImage({ svgDataID }: { svgDataID: string }) {
  const canvasRef = useRef<SVGElement>(null)
  const [screenshot, setScreenshot] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-expect-error Ignoring possibility of null selection, assuming its going to be found every time
      const svgElement: SVGElement = document.querySelector(
        "[data-id=" + svgDataID + "]",
      )
      const serializer = new XMLSerializer()
      const svgString = serializer.serializeToString(svgElement)
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      const svgBlob = new Blob([svgString], {
        type: "image/svg+xml;charset=utf-8",
      })
      const url = URL.createObjectURL(svgBlob)

      const img = new Image()
      img.onload = function () {
        ctx.drawImage(img, 0, 0)
        URL.revokeObjectURL(url)
      }
      img.src = url
    }
  }, [])

  const takeScreenshot = () => {
    const canvas = canvasRef.current
    const dataURL = canvas.toDataURL("image/png")
    setScreenshot(dataURL)
  }

  const downloadImage = () => {
    if (typeof window !== "undefined") {
      const canvas = canvasRef.current
      const dataURL = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.href = dataURL
      a.download = "canvas-image.png"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="600"
        height="400"
        style={{ border: "1px solid #000" }}
      ></canvas>
      <div>
        <button onClick={takeScreenshot}>Take Screenshot</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
      {screenshot && <img src={screenshot} alt="Screenshot" />}
    </div>
  )
}

export default SvgToCanvasToImage
