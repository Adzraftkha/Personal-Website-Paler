'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NestedItem {
  id: string
  title: string
  subtitle?: string
  description: string
  details?: string[]
  tags?: string[]
}

interface NestedAccordionSectionProps {
  title: string
  items: NestedItem[]
  variant?: 'volunteering' | 'achievements'
}

export function NestedAccordionSection({
  title,
  items,
  variant = 'volunteering',
}: NestedAccordionSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (items.length === 0) return null

  const bgColor =
    variant === 'volunteering'
      ? 'bg-accent/5 border-accent/20'
      : 'bg-primary/5 border-primary/20'
  const titleColor = variant === 'volunteering' ? 'text-accent' : 'text-primary'
  const iconColor = variant === 'volunteering' ? 'text-accent' : 'text-primary'

  return (
    <div className="border-t border-border pt-4">
      <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'rounded-lg border p-3 transition-all duration-200 cursor-pointer hover:shadow-md',
              bgColor,
              expandedId === item.id && 'ring-1 ring-offset-0 ring-' + titleColor
            )}
          >
            <button
              onClick={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
              className="w-full text-left"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className={cn('font-medium text-sm', titleColor)}>
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-foreground/70 mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-foreground/50 flex-shrink-0 transition-transform duration-200 mt-0.5',
                    expandedId === item.id && 'rotate-180'
                  )}
                />
              </div>
            </button>

            {expandedId === item.id && (
              <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                {item.description && (
                  <p className="text-xs text-foreground/80">
                    {item.description}
                  </p>
                )}

                {item.details && item.details.length > 0 && (
                  <ul className="text-xs space-y-1">
                    {item.details.map((detail, idx) => (
                      <li
                        key={`${item.id}-detail-${idx}`}
                        className="text-foreground/70 flex gap-2 pl-2"
                      >
                        <span className={cn('flex-shrink-0', iconColor)}>
                          {variant === 'volunteering' ? '→' : '★'}
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          variant === 'volunteering'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-primary/20 text-primary'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
