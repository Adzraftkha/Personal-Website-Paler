'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const orderedPages = [
  { label: 'Home', href: '/' },
  { label: 'Education', href: '/education' },
  { label: 'Experience', href: '/experience' },
  { label: 'Organization', href: '/organization' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certification', href: '/certification' },
  { label: 'Contact', href: '/contact' },
]

export function DesktopPageNav() {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show on links page or detail pages
  if (pathname === '/links' || pathname === '/') return null

  // Find current page index
  const currentIndex = orderedPages.findIndex(
    (p) => p.href !== '/' && pathname.startsWith(p.href)
  )
  // Default to 0 if not found (home)
  const idx = currentIndex >= 0 ? currentIndex : 0

  const prevPage = idx > 0 ? orderedPages[idx - 1] : null
  const nextPage = idx < orderedPages.length - 1 ? orderedPages[idx + 1] : null

  return (
    <div className="fixed top-[72px] left-1/2 -translate-x-1/2 z-30 hidden lg:flex items-center gap-2 pointer-events-none w-full max-w-5xl px-4">
      {/* Back button - left side */}
      {prevPage ? (
        <button
          onClick={() => router.push(prevPage.href)}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-border/50 bg-background/70 backdrop-blur-lg px-3 py-1.5 text-xs font-medium text-foreground/70 shadow-md shadow-black/5 transition-all duration-200 hover:bg-background/90 hover:text-foreground hover:border-primary/30"
        >
          <ArrowLeft size={14} />
          {prevPage.label}
        </button>
      ) : (
        <div />
      )}

      <div className="flex-1" />

      {/* Next button - right side */}
      {nextPage ? (
        <button
          onClick={() => router.push(nextPage.href)}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-border/50 bg-background/70 backdrop-blur-lg px-3 py-1.5 text-xs font-medium text-foreground/70 shadow-md shadow-black/5 transition-all duration-200 hover:bg-background/90 hover:text-foreground hover:border-primary/30"
        >
          {nextPage.label}
          <ArrowRight size={14} />
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}
