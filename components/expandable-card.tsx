'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VolunteeringItem {
  id: string
  organization: string
  role: string
  description: string
  impact: string[]
  tags: string[]
  images: string[]
}

interface AchievementItem {
  id: string
  title: string
  date: string
  category: string
  description: string
  details: string[]
  tags: string[]
  images: string[]
}

interface ExpandableCardProps {
  id: string
  title: string
  subtitle?: string
  summary: string
  details?: string[]
  tags?: string[]
  images?: string[]
  startDate?: string
  endDate?: string
  position?: string
  company?: string
  organization?: string
  role?: string
  volunteering?: VolunteeringItem[]
  achievements?: AchievementItem[]
}

export function ExpandableCard({
  id,
  title,
  subtitle,
  summary,
  details = [],
  tags = [],
  images = [],
  startDate,
  endDate,
  position,
  company,
  organization,
  role,
  volunteering = [],
  achievements = [],
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : null
  const displayTitle = position || role || title
  const displaySubtitle = company || organization || subtitle

  return (
    <div
      className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">{displayTitle}</h3>
            {displaySubtitle && (
              <p className="text-sm text-primary font-medium mt-1">{displaySubtitle}</p>
            )}
            {dateRange && (
              <p className="text-xs text-foreground/60 mt-2">{dateRange}</p>
            )}
            <p className="text-sm text-foreground/70 mt-3 line-clamp-2">{summary}</p>
          </div>
          <ChevronDown
            size={20}
            className={cn(
              'text-foreground/50 transition-transform duration-300 flex-shrink-0 mt-1',
              isExpanded && 'rotate-180'
            )}
          />
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-border px-6 py-4 space-y-6 bg-background/50">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Gallery</h4>
              <div className="grid grid-cols-2 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={img}
                      alt={`${displayTitle} - Image ${idx + 1}`}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Details */}
          {details.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Key Points</h4>
              <ul className="space-y-2">
                {details.map((detail, index) => (
                  <li key={index} className="flex gap-3 text-sm text-foreground/80">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Volunteering Section */}
          {volunteering.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Volunteering</h4>
              <div className="space-y-3">
                {volunteering.map((vol) => (
                  <div key={vol.id} className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{vol.organization}</p>
                        <p className="text-sm text-primary">{vol.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 mb-2">{vol.description}</p>
                    <ul className="text-xs space-y-1 mb-2">
                      {vol.impact.map((item, idx) => (
                        <li key={idx} className="text-foreground/60 flex gap-2">
                          <span className="text-primary">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {vol.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Section */}
          {achievements.length > 0 && (
            <div className="border-t border-border pt-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">Achievements</h4>
              <div className="space-y-3">
                {achievements.map((ach) => (
                  <div key={ach.id} className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-foreground">{ach.title}</p>
                        <p className="text-sm text-secondary">{ach.category} • {ach.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/70 mb-2">{ach.description}</p>
                    <ul className="text-xs space-y-1 mb-2">
                      {ach.details.map((detail, idx) => (
                        <li key={idx} className="text-foreground/60 flex gap-2">
                          <span className="text-secondary">★</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1">
                      {ach.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
