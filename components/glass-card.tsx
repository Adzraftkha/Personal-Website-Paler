'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm',
        'shadow-lg shadow-black/5 transition-all duration-300',
        hover && 'hover:border-primary/50 hover:bg-card/80 hover:shadow-xl hover:shadow-primary/5',
        className
      )}
    >
      {children}
    </div>
  )
}
