"use client"

import { useEffect, useRef } from "react"

interface ProgressVisualizationProps {
  progress: number
}

export function ProgressVisualization({ progress }: ProgressVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 10

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    ctx.fillStyle = "#e2e8f0"
    ctx.fill()

    // Draw progress arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (progress / 100) * 2 * Math.PI - Math.PI / 2)
    ctx.lineTo(centerX, centerY)
    ctx.fillStyle = "#3b82f6"
    ctx.fill()

    // Draw inner circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.8, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Draw text
    ctx.font = "bold 24px Arial"
    ctx.fillStyle = "#1e293b"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(`${progress}%`, centerX, centerY)
  }, [progress])

  return (
    <div className="relative">
      <canvas ref={canvasRef} width={200} height={200} className="w-full" />
      <div
        className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary animate-fade-in"
        style={{
          animation: "fadeIn 0.5s ease-out",
        }}
      >
        {progress}%
      </div>
    </div>
  )
}

