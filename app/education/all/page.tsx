'use client'

import Link from 'next/link'
import { getCategoryItems } from '@/data/portfolio'
import { GlassCard } from '@/components/glass-card'
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react'

export default function EducationAllPage() {
  const items = getCategoryItems('education')

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/education"
            className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Education
          </Link>

          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              All Education
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Complete educational background and learning journey
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid gap-6 md:grid-cols-1">
            {items.map((item: any) => (
              <Link
                key={item.id}
                href={`/education/${item.id}`}
                className="block group"
              >
                <GlassCard className="h-full transition-all group-hover:border-primary/50">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {item.school}
                      </h3>
                      <p className="text-primary font-medium">{item.degree} in {item.field}</p>
                    </div>

                    <p className="text-foreground/70 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                      <Calendar size={16} />
                      <span>{item.startDate} - {item.endDate}</span>
                    </div>

                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-xs text-foreground/60">+{item.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
