"use client"
import { useTheme } from "@mui/system"
import React, { useEffect, useRef } from "react"
import { STATIC_ASSETS } from "expanse.staticAssets"

// Applies a semi transparent overlay to the image and applies a grayscale filter
// Allows for downloading of the updated image
export const CanvasFilter = () => {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    const img = imgRef.current
    img.src = STATIC_ASSETS.images.profileSubtleLines
    img.onload = function () {
      const img = imgRef.current
      const canvas = canvasRef.current
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
      // Set canvas dimensions to match image
      const canvasWidth = img.width
      const canvasHeight = img.height
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0)

      // Apply filters
      ctx.filter = "grayscale(.75)" // Example filters
      ctx.drawImage(img, 0, 0) // Redraw image with filters applied

      ctx.globalAlpha = 0.15

      // Draw a transparent square
      const adjustmentAmount = 70
      const squareX = canvasWidth / 2 - adjustmentAmount
      const squareY = 0
      ctx.fillStyle = theme.palette.primary.main // Square color
      ctx.fillRect(
        squareX,
        squareY,
        canvasWidth / 2 + adjustmentAmount,
        canvasHeight,
      ) // Fill the right half with the square

      // Reset global alpha to default (fully opaque)
      ctx.globalAlpha = 1.0
    }
  }, [])

  const applyFiltersAndSave = () => {
    if (typeof window !== "undefined") {
      const canvas = canvasRef.current

      // Create a data URL from the canvas
      const dataURL = canvas.toDataURL("image/jpg")

      // Create a download link and trigger the download
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "filtered-image.jpg"
      link.click()
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width="500"
        height="500"
        style={{ border: "1px solid black" }}
      ></canvas>
      <img
        ref={imgRef}
        // crossOrigin="anonymous"
        alt="Hidden"
        style={{ display: "none" }}
      />
      <button onClick={applyFiltersAndSave}>Apply Filters and Save</button>
    </div>
  )
}

export default CanvasFilter
