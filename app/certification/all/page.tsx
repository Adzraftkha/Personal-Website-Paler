'use client'

import Link from 'next/link'
import { getCategoryItems, type ICertification } from '@/data/portfolio'
import { GlassCard } from '@/components/glass-card'
import { ArrowLeft, Calendar, Award } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function CertificationAllPage() {
  const items = getCategoryItems('certification')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  // Group certifications by their group property
  const groupedItems = useMemo(() => {
    const groups: Record<string, any[]> = {}
    const groupOrder = [
      'Engineering & Energy Systems',
      'Safety, Quality & Compliance',
      'Project, Supply Chain & Operations',
      'Digital & Technical Tools',
      'Language & Communication',
      'Others'
    ]

    items.forEach((item: any) => {
      const groupName = (item as ICertification).group || 'Others'
      if (!groups[groupName]) groups[groupName] = []
      groups[groupName].push(item)
    })

    // Sort by defined order
    const sorted: Record<string, any[]> = {}
    groupOrder.forEach((g) => {
      if (groups[g]) sorted[g] = groups[g]
    })
    // Add any remaining groups not in the order
    Object.keys(groups).forEach((g) => {
      if (!sorted[g]) sorted[g] = groups[g]
    })

    return sorted
  }, [items])

  const filteredItems = selectedGroup
    ? groupedItems[selectedGroup]
    : Object.values(groupedItems).flat()

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/certification"
            className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Certifications
          </Link>

          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              All Certifications
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Complete professional credentials and qualifications
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Group Filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGroup === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              All Groups
            </button>
            {Object.keys(groupedItems).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGroup === group
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {group} ({groupedItems[group].length})
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid gap-6 md:grid-cols-1">
            {filteredItems.map((item: any) => (
              <Link
                key={item.id}
                href={`/certification/${item.id}`}
                className="block group"
              >
                <GlassCard className="h-full transition-all group-hover:border-primary/50">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-primary font-medium">{item.issuer}</p>
                    </div>

                    <p className="text-foreground/70 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                      <Calendar size={16} />
                      <span>{item.issueDate}{item.expirationDate ? ` - ${item.expirationDate}` : ''}</span>
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
