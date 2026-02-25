import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ViewLinksButtonProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function ViewLinksButton({ variant = 'default', className }: ViewLinksButtonProps) {
  if (variant === 'compact') {
    return (
      <Link
        href="/links"
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm',
          className
        )}
      >
        <ExternalLink size={16} />
        View Links
      </Link>
    )
  }

  return (
    <Link
      href="/links"
      className={cn(
        'inline-flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-6 py-4 text-primary transition-all hover:border-primary/40 hover:bg-primary/10',
        className
      )}
    >
      <div className="rounded-lg bg-primary/10 p-2">
        <ExternalLink size={20} />
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold">View Links</p>
        <p className="text-xs text-primary/70">All Links</p>
      </div>
    </Link>
  )
}
