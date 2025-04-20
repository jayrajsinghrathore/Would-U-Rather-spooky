"use client"

import { useEffect, useRef } from "react"

// Define Halloween elements
const pumpkins = [
  {
    path: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M18,13.6h-2.2c0,0-0.2,0.2-0.2,0.4v1.8c0,0.2-0.2,0.4-0.4,0.4h-1.8c-0.2,0-0.4-0.2-0.4-0.4v-1.8c0-0.2-0.2-0.4-0.4-0.4h-1.4c-0.2,0-0.4,0.2-0.4,0.4v1.8c0,0.2-0.2,0.4-0.4,0.4H8.8c-0.2,0-0.4-0.2-0.4-0.4v-1.8c0-0.2-0.2-0.4-0.4-0.4H6c-0.2,0-0.4-0.2-0.4-0.4v-1.2c0-0.2,0.2-0.4,0.4-0.4h2c0.2,0,0.4-0.2,0.4-0.4V9.4c0-0.2,0.2-0.4,0.4-0.4h1.8c0.2,0,0.4,0.2,0.4,0.4v1.8c0,0.2,0.2,0.4,0.4,0.4h1.4c0.2,0,0.4-0.2,0.4-0.4V9.4c0-0.2,0.2-0.4,0.4-0.4h1.8c0.2,0,0.4,0.2,0.4,0.4v1.8c0,0.2,0.2,0.4,0.4,0.4h2c0.2,0,0.4,0.2,0.4,0.4v1.2C18.4,13.4,18.2,13.6,18,13.6z",
    fill: "#ff7800",
  },
  {
    path: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16.3,15.6l-1.8,1.8c-0.2,0.2-0.4,0.2-0.6,0l-1.8-1.8c-0.2-0.2-0.4-0.2-0.6,0l-1.8,1.8c-0.2,0.2-0.4,0.2-0.6,0l-1.8-1.8c-0.2-0.2-0.4-0.2-0.6,0l-1.8,1.8c-0.2,0.2-0.4,0.2-0.6,0l-0.9-0.9c-0.2-0.2-0.2-0.4,0-0.6l1.8-1.8c0.2-0.2,0.2-0.4,0-0.6l-1.8-1.8c-0.2-0.2-0.2-0.4,0-0.6l0.9-0.9c0.2-0.2,0.4-0.2,0.6,0l1.8,1.8c0.2,0.2,0.4,0.2,0.6,0l1.8-1.8c0.2-0.2,0.4-0.2,0.6,0l1.8,1.8c0.2,0.2,0.4,0.2,0.6,0l1.8-1.8c0.2-0.2,0.4-0.2,0.6,0l1.8,1.8c0.2,0.2,0.4,0.2,0.6,0l1.8-1.8c0.2-0.2,0.4-0.2,0.6,0l0.9,0.9c0.2,0.2,0.2,0.4,0,0.6l-1.8,1.8c-0.2,0.2-0.2,0.4,0,0.6l1.8,1.8c0.2,0.2,0.2,0.4,0,0.6l-0.9,0.9c-0.2,0.2-0.4,0.2-0.6,0L16.3,15.6z",
    fill: "#ff7800",
  },
]

const skulls = [
  {
    path: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M15.9,16.4c-0.2,0.2-0.5,0.2-0.7,0l-1.4-1.4c-0.2-0.2-0.5-0.2-0.7,0l-2.2,2.2c-0.2,0.2-0.5,0.2-0.7,0l-2.2-2.2c-0.2-0.2-0.5-0.2-0.7,0l-1.4,1.4c-0.2,0.2-0.5,0.2-0.7,0s-0.2-0.5,0-0.7l1.4-1.4c0.2-0.2,0.2-0.5,0-0.7l-1.4-1.4c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l1.4,1.4c0.2,0.2,0.5,0.2,0.7,0l2.2-2.2c0.2-0.2,0.5-0.2,0.7,0l2.2,2.2c0.2,0.2,0.5,0.2,0.7,0l1.4-1.4c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-1.4,1.4c-0.2,0.2-0.2,0.5,0,0.7l1.4,1.4C16.1,15.9,16.1,16.2,15.9,16.4z M9,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S9.6,10,9,10z M15,10c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S15.6,10,15,10z",
    fill: "#ffffff",
  },
  {
    path: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M8,9c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S7.4,9,8,9z M16,9c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S15.4,9,16,9z M7,14c-0.6,0-1-0.4-1-1h2C8,13.6,7.6,14,7,14z M17,14c-0.6,0-1-0.4-1-1h2C18,13.6,17.6,14,17,14z M12,18c-2.2,0-4-1.8-4-4h8C16,16.2,14.2,18,12,18z",
    fill: "#ffffff",
  },
]

const ghosts = [
  {
    path: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M12,18c-3.3,0-6-2.7-6-6c0-0.6,0.4-1,1-1s1,0.4,1,1c0,2.2,1.8,4,4,4s4-1.8,4-4c0-0.6,0.4-1,1-1s1,0.4,1,1C18,15.3,15.3,18,12,18z M9,10c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S9.6,10,9,10z M15,10c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S15.6,10,15,10z",
    fill: "#ffffff",
  },
  {
    path: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M7,9.5C7,8.7,7.7,8,8.5,8S10,8.7,10,9.5S9.3,11,8.5,11S7,10.3,7,9.5z M12,17c-2.2,0-4-1.8-4-4c0-0.6,0.4-1,1-1s1,0.4,1,1c0,1.1,0.9,2,2,2s2-0.9,2-2c0-0.6,0.4-1,1-1s1,0.4,1,1C16,15.2,14.2,17,12,17z M15.5,11c-0.8,0-1.5-0.7-1.5-1.5S14.7,8,15.5,8S17,8.7,17,9.5S16.3,11,15.5,11z",
    fill: "#ffffff",
  },
]

export function HalloweenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Halloween elements
    const elements: {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      speedX: number
      speedY: number
      type: "pumpkin" | "skull" | "ghost"
      variant: number
      opacity: number
    }[] = []

    // Create elements
    const createElements = () => {
      const elementCount = Math.floor(window.innerWidth / 100) // Adjust density

      for (let i = 0; i < elementCount; i++) {
        const type = Math.random() < 0.4 ? "pumpkin" : Math.random() < 0.7 ? "skull" : "ghost"
        const variant = Math.floor(
          Math.random() * (type === "pumpkin" ? pumpkins.length : type === "skull" ? skulls.length : ghosts.length),
        )

        elements.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 30 + 20, // Size between 20-50
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          type,
          variant,
          opacity: Math.random() * 0.5 + 0.2, // Opacity between 0.2-0.7
        })
      }
    }

    createElements()

    // Flickering light effect variables
    let flickerIntensity = 0
    let flickerDirection = 0.01
    let flickerSpeed = 0.02
    let lastFlickerChange = 0

    // Draw SVG path on canvas
    const drawSVGPath = (
      path: string,
      x: number,
      y: number,
      size: number,
      rotation: number,
      fill: string,
      opacity: number,
    ) => {
      const svgPath = new Path2D(path)

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.scale(size / 24, size / 24) // SVG paths are designed for 24x24 viewBox
      ctx.translate(-12, -12) // Center the path

      ctx.fillStyle = fill
      ctx.globalAlpha = opacity
      ctx.fill(svgPath)

      ctx.restore()
    }

    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#1a0000") // Very dark red
      gradient.addColorStop(1, "#000000") // Black
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update flickering effect
      if (timestamp - lastFlickerChange > 1000) {
        flickerSpeed = Math.random() * 0.04 + 0.01
        lastFlickerChange = timestamp
      }

      flickerIntensity += flickerDirection * flickerSpeed
      if (flickerIntensity > 0.2 || flickerIntensity < 0) {
        flickerDirection *= -1
      }

      // Draw subtle vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 1.5,
      )
      vignette.addColorStop(0, "rgba(0, 0, 0, 0)")
      vignette.addColorStop(1, `rgba(0, 0, 0, ${0.7 + flickerIntensity})`)
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw elements
      elements.forEach((element) => {
        element.x += element.speedX
        element.y += element.speedY
        element.rotation += element.rotationSpeed

        // Reset position if out of bounds
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size

        // Draw element
        if (element.type === "pumpkin") {
          drawSVGPath(
            pumpkins[element.variant].path,
            element.x,
            element.y,
            element.size,
            element.rotation,
            pumpkins[element.variant].fill,
            element.opacity + flickerIntensity * 0.5,
          )
        } else if (element.type === "skull") {
          drawSVGPath(
            skulls[element.variant].path,
            element.x,
            element.y,
            element.size,
            element.rotation,
            skulls[element.variant].fill,
            element.opacity + flickerIntensity * 0.5,
          )
        } else {
          drawSVGPath(
            ghosts[element.variant].path,
            element.x,
            element.y,
            element.size,
            element.rotation,
            ghosts[element.variant].fill,
            element.opacity + flickerIntensity * 0.5,
          )
        }
      })

      // Draw occasional "lightning" effect (very rare)
      if (Math.random() < 0.0005) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1})`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}

