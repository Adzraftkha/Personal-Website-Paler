'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NestedAccordionSection } from './nested-accordion-section'
import { SkillsSection } from './skills-section'
import { SupportingDocuments } from './supporting-documents'


interface AccordionItemProps {
  id: string
  isOpen: boolean
  onToggle: () => void
  title: string
  subtitle?: string
  summary?: string
  details?: string[]
  tags?: string[]
  images?: string[]
  startDate?: string
  endDate?: string
  volunteering?: any[]
  achievements?: any[]
  skills?: string[]
  supportingDocuments?: any[]
  isPlaceholder?: boolean
  expandedPreview?: boolean
  category?: string
}

export function AccordionItem({
  id,
  isOpen,
  onToggle,
  title,
  subtitle,
  summary,
  details = [],
  tags = [],
  images = [],
  startDate,
  endDate,
  volunteering = [],
  achievements = [],
  skills = [],
  supportingDocuments = [],
  isPlaceholder = false,
  expandedPreview = false,
  category,
}: AccordionItemProps) {
  const [imageIndex, setImageIndex] = useState(0)
  const itemRef = useRef<HTMLDivElement | null>(null)

  const dateRange =
    startDate && endDate ? `${startDate} - ${endDate}` : startDate || null

  const currentImage = images[imageIndex] || null

  // Auto slide only when open
  useEffect(() => {
  if (!isOpen) return

  setTimeout(() => {
    if (!itemRef.current) return

    const navbarOffset = 160
    const elementPosition = itemRef.current.getBoundingClientRect().top
    const offsetPosition =
      window.scrollY + elementPosition - navbarOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }, 50)
}, [isOpen])

  return (
    <div
    ref={itemRef}
    className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
    >
      {/* COLLAPSED STATE */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="group w-full px-4 sm:px-6 py-4 text-left hover:bg-primary/5 transition-colors"
        >
          <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                  {title}
                </h3>
                {isPlaceholder && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Skeleton
                  </span>
                )}
              </div>

              {subtitle && (
                <p className="text-sm text-primary font-medium">{subtitle}</p>
              )}

              {dateRange && (
                <p className="text-xs text-foreground/60">{dateRange}</p>
              )}

              {summary && (
                <p className="text-sm mt-2 line-clamp-2 text-foreground/70">
                  {summary}
                </p>
              )}
            </div>

            <ChevronDown
              size={20}
              className="text-foreground/50 transition-transform duration-300"
            />
          </div>
        </button>
      )}

      {/* EXPANDED STATE */}
      {isOpen && (
        <div className="w-full">
          
          {/* Header */}
          <button
            onClick={onToggle}
            className="w-full p-6 text-left hover:bg-primary/5 transition-colors border-b border-border"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-sm text-primary font-medium mt-1">
                    {subtitle}
                  </p>
                )}
                {dateRange && (
                  <p className="text-xs text-foreground/60 mt-1">
                    {dateRange}
                  </p>
                )}
              </div>

              <ChevronDown
                size={20}
                className="text-foreground/50 rotate-180 transition-transform"
              />
            </div>
          </button>

          {/* Content */}
          <div className="p-6 bg-background/50 grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 space-y-6">
              
              {/* Image */}
              {currentImage && (
                <div className="space-y-3">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                    <Image
                      src={currentImage}
                      alt={title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Overview */}
              {summary && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Overview
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {summary}
                  </p>
                </div>
              )}

              {/* Details */}
              {details.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Key Points
                  </h4>
                  <ul className="space-y-2">
                    {details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex gap-3 text-sm text-foreground/80"
                      >
                        <span className="text-primary font-bold">•</span>
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

              {/* Nested Sections */}
              {volunteering.length > 0 && (
                <NestedAccordionSection
                  title="Volunteering"
                  items={volunteering}
                  variant="volunteering"
                />
              )}

              {achievements.length > 0 && (
                <NestedAccordionSection
                  title="Achievements"
                  items={achievements}
                  variant="achievements"
                />
              )}

              {skills.length > 0 && (
                <SkillsSection skills={skills} certificationTitle={title} />
              )}

              {category && category !== 'certification' && (
                <div className="flex justify-end pt-4 border-t border-foreground/10">
                  <a
                    href={`/${category}/${id}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/30 text-primary px-4 py-2 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
                  >
                    View Details
                  </a>
                </div>
              )}
            </div>

            {/* Supporting Documents */}
            {supportingDocuments.length > 0 && (
              <div className="lg:col-span-1">
                <SupportingDocuments documents={supportingDocuments} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}