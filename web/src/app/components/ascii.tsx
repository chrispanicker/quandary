"use client"

import { useEffect, useRef } from "react"

interface AsciiTextProps {
  text: string
  className?: string
}

export const splitClass = "split flex flex-wrap justify-start items-start px-2 w-full min-w-0"

export const AsciiText = ({ text, className = "" }: AsciiTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const container = containerRef.current
    if (!container) return

    container.innerHTML = ""

    const valArray = [".", ".", "=", "÷", "*"]
    const animationDuration = 200 * valArray.length // Total duration of one cycle

    const characters = text.split("")
    characters.forEach((char) => {
      const charElement = document.createElement("span")
      charElement.className = "ascii-char"
      charElement.textContent = char

      // Use a ref to store the interval ID and original character
      const animationRef = {
        intervalId: 0,
        originalChar: char,
      }

      const startAnimation = () => {
        // Clear existing interval if it's running
        if (animationRef.intervalId) {
          clearInterval(animationRef.intervalId)
        }

        let i = 0
        animationRef.intervalId = window.setInterval(() => {
          charElement.textContent = valArray[i]
          if (i < valArray.length - 1) {
            i++
          } else {
            // End of cycle, restore original character
            clearInterval(animationRef.intervalId)
            charElement.textContent = animationRef.originalChar
            animationRef.intervalId = 0
          }
        }, 200)

        // Ensure it stops the interval after the full duration
        setTimeout(() => {
          if (animationRef.intervalId) {
            clearInterval(animationRef.intervalId)
            charElement.textContent = animationRef.originalChar
            animationRef.intervalId = 0
          }
        }, animationDuration)
      }

      charElement.addEventListener("mouseover", startAnimation)

      container.appendChild(charElement)
    })

    return () => {
      if (container) {
        const elements = container.querySelectorAll(".ascii-char")
        elements.forEach((el) => {
          el.replaceWith(el.cloneNode(true))
        })
      }
    }
  }, [text])

  return <div ref={containerRef} className={`${splitClass} ${className}`}></div>
}
