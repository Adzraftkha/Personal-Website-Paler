'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme() 
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  const isDark = resolvedTheme === 'dark'

  const handleToggle = () => {
    if (isAnimating) return 
    setIsAnimating(true)
    
    setTheme(isDark ? 'light' : 'dark')
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isAnimating}
      className="relative flex items-center justify-center rounded-full p-2 text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors duration-200 overflow-hidden disabled:cursor-not-allowed"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="relative h-5 w-5">
        <Sun
          size={20}
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark
              ? 'rotate(0deg) scale(1)'
              : 'rotate(90deg) scale(0)',
          }}
        />
        <Moon
          size={20}
          className="absolute inset-0 transition-all duration-500 ease-in-out"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark
              ? 'rotate(-90deg) scale(0)'
              : 'rotate(0deg) scale(1)',
          }}
        />
      </span>
    </button>
  )
}