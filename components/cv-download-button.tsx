import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CvDownloadButtonProps {
  variant?: 'default' | 'compact'
  className?: string
}

export function CvDownloadButton({ variant = 'default', className }: CvDownloadButtonProps) {
  if (variant === 'compact') {
    return (
      <a
        href="/documents/cv.pdf"
        download
        className={cn(
          'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm',
          className
        )}
      >
        <Download size={16} />
        Download CV
      </a>
    )
  }

  return (
    <a
      href="/documents/cv.pdf"
      download
      className={cn(
        'inline-flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-6 py-4 text-primary transition-all hover:border-primary/40 hover:bg-primary/10',
        className
      )}
    >
      <div className="rounded-lg bg-primary/10 p-2">
        <Download size={20} />
      </div>
      <div className="text-left">
        <p className="text-sm font-semibold">Download CV</p>
        <p className="text-xs text-primary/70">PDF Format</p>
      </div>
    </a>
  )
}
