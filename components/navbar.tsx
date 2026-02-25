'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

const navItems = [
  { label: 'Education', href: '/education' },
  { label: 'Experience', href: '/experience' },
  { label: 'Organization', href: '/organization' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certification', href: '/certification' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Don't show navbar on links page
  if (pathname === '/links') {
    return null
  }

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Navbar - Floating Glassmorphism */}
      <div className="sticky top-0 z-40 hidden md:flex justify-center px-6 py-3">
        <nav className="flex items-center gap-1 rounded-full border border-border/50 bg-background/60 backdrop-blur-xl px-2 py-1.5 shadow-lg shadow-black/5">
          {/* Brand */}
          <Link
            href="/"
            className={cn(
              'flex-shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200',
              isActive('/')
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
            )}
          >
            Home
          </Link>

          <div className="mx-1 h-4 w-px bg-border/50" />

          {/* Navigation */}
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="mx-1 h-4 w-px bg-border/50" />

          {/* Theme Toggle */}
          <div className="px-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile Navbar - Floating Glassmorphism */}
      <div className="sticky top-0 z-40 flex justify-center px-3 py-2 md:hidden">
        <nav className="flex w-full items-center justify-between rounded-2xl border border-border/50 bg-background/60 backdrop-blur-xl px-4 py-2.5 shadow-lg shadow-black/5">
          <Link
            href="/"
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-bold transition-all duration-200',
              isActive('/')
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-foreground/80'
            )}
          >
            Farell E. P.
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex items-center justify-center rounded-full p-2.5 text-foreground/70 hover:bg-foreground/5 hover:text-foreground transition-colors duration-200 overflow-hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="relative h-5 w-5">
                <Menu
                  size={20}
                  className="absolute inset-0 transition-all duration-500 ease-in-out"
                  style={{
                    opacity: isOpen ? 0 : 1,
                    transform: isOpen
                      ? 'rotate(90deg) scale(0)'
                      : 'rotate(0deg) scale(1)',
                  }}
                />
                <X
                  size={20}
                  className="absolute inset-0 transition-all duration-500 ease-in-out"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen
                      ? 'rotate(0deg) scale(1)'
                      : 'rotate(-90deg) scale(0)',
                  }}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay with blur and fade animation */}
      <div
        className={cn(
          'fixed inset-0 top-[56px] z-30 bg-black/30 backdrop-blur-sm md:hidden transition-all duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-[56px] left-0 right-0 z-40 md:hidden transition-all duration-300 px-3 mt-3',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <div className="rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/5 overflow-hidden">
          <div className="px-3 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 font-medium transition-all duration-200 text-sm',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-foreground/70 hover:bg-foreground/5 hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
