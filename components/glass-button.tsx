'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GlassButtonProps {
  href: string
  label: string
  icon?: React.ReactNode
  external?: boolean
  className?: string
}

export function GlassButton({ href, label, icon, external, className }: GlassButtonProps) {
  const baseStyles = cn(
    'flex items-center justify-center gap-3 rounded-xl border border-border bg-card/50 px-6 py-3',
    'font-medium text-foreground/90 backdrop-blur-md shadow-lg shadow-black/5',
    'transition-all duration-300',
    'hover:border-primary/50 hover:bg-card/80 hover:shadow-xl hover:shadow-black/10 hover:scale-105',
    className
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span>{label}</span>
      </a>
    )
  }

  return (
    <Link href={href} className={baseStyles}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
    </Link>
  )
}
