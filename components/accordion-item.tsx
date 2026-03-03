'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NestedAccordionSection } from './nested-accordion-section'
import { SkillsSection } from './skills-section'
import { SupportingDocuments } from './supporting-documents'
import type { SupportingDocument } from '@/data/portfolio'

interface VolunteeringItem {
  id: string
  organization: string
  role: string
  description: string
  impact: string[]
  tags: string[]
}

interface AchievementItem {
  id: string
  title: string
  date: string
  category: string
  description: string
  details: string[]
  tags: string[]
}

interface AccordionItemProps {
  id: string
  title: string
  subtitle?: string
  summary: string
  details?: string[]
  tags?: string[]
  images?: string[]
  startDate?: string
  endDate?: string
  volunteering?: VolunteeringItem[]
  achievements?: AchievementItem[]
  skills?: string[]
  supportingDocuments?: SupportingDocument[]
  isPlaceholder?: boolean
  expandedPreview?: boolean
  detailLink?: string
  category?: string
}

export function AccordionItem({
  id,
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
  detailLink,
  category,
}: AccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)

  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : null
  const currentImage = images[imageIndex] || null

  // Format date for certification preview (extract month and year from issueDate)
  const formatCertificationDate = (date: string | undefined) => {
    if (!date) return ''
    // Expecting format like "2023" or "Aug 2023" or "August 2023"
    return date
  }

  // Auto-slide carousel when expanded
  useEffect(() => {
    if (!isExpanded || images.length <= 1) return

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isExpanded, images.length])

  // Handle click to expand or navigate to detail page
  const handleHeaderClick = (e: React.MouseEvent) => {
    // If we have a detail link and item is not expanded, navigate instead of expand
    if (detailLink && !isExpanded) {
      e.preventDefault()
      window.location.href = detailLink
      return
    }
    // Otherwise, expand normally
    setIsExpanded(true)
  }

  return (
    <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card/80 cursor-pointer">
      {/* Collapsed State - Vertical on Mobile, Horizontal on Tablet+ */}
      {!isExpanded && (
        <button
          onClick={handleHeaderClick}
          className="group w-full px-4 sm:px-6 py-4 text-left hover:bg-primary/5 transition-colors"
        >
          <div className='flex gap-5 w-full '>

            <img alt='asd'/>
          <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Text Content - Full width on mobile, flex on tablet+ */}
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">{title}</h3>
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
                <p className={cn(
                  "text-xs",
                  isPlaceholder ? "text-foreground/65 italic" : "text-foreground/60"
                )}>
                  {dateRange}
                </p>
              )}
              <p className={cn(
                "text-sm mt-3 line-clamp-2",
                isPlaceholder ? "text-foreground/65 italic" : "text-foreground/70"
              )}>
                {summary}
              </p>
            </div>

            {/* Center: Compact Image Carousel - Full width on mobile (≤640px), beside text on tablet+ (641px+) */}
            {/* Hide images in preview state - only show when expanded */}
            {currentImage && isExpanded && (
              <div className={cn("w-full sm:hidden flex-shrink-0", expandedPreview ? "h-36" : "h-24")}>
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-border/50 bg-muted">
                  <Image
                    src={currentImage}
                    alt={title}
                    width={400}
                    height={expandedPreview ? 144 : 96}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {imageIndex + 1}/{images.length}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hidden on mobile, visible on tablet+ */}
            {/* Hide images in preview state - only show when expanded */}
            {currentImage && isExpanded && (
              <div className={cn("hidden sm:block flex-shrink-0", expandedPreview ? "w-48 h-36" : "w-32 h-24")}>
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-border/50 bg-muted">
                  <Image
                    src={currentImage}
                    alt={title}
                    width={expandedPreview ? 192 : 128}
                    height={expandedPreview ? 144 : 96}
                    className="w-full h-full object-cover"
                    priority
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {imageIndex + 1}/{images.length}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Right: Chevron */}
            <ChevronDown
              size={20}
              className="text-foreground/50 flex-shrink-0 group-hover:text-foreground/70 transition-all self-start sm:self-center"
            />
          </div>
          </div>
          
        </button>
      )}

      {/* Expanded State - Vertical Layout */}
      {isExpanded && (
        <div className="w-full">
          {/* Header with Close Button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full p-6 text-left hover:bg-primary/5 transition-colors border-b border-border "
          >
            <div className="flex items-center justify-between gap-5">
              <img alt='asd'/>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                {subtitle && (
                  <p className="text-sm text-primary font-medium mt-1">{subtitle}</p>
                )}
                {dateRange && (
                  <p className="text-xs text-foreground/60 mt-2">{dateRange}</p>
                )}
              </div>
              <ChevronDown
                size={20}
                className="text-foreground/50 flex-shrink-0 rotate-180 transition-all"
              />
            </div>
          </button>

          {/* Content - Two Column Layout for Desktop, Single Column for Mobile */}
          <div className="p-6 bg-background/50 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Takes 2 cols on desktop */}
            <div className="lg:col-span-2 space-y-6">
            {/* Full-width Image Carousel */}
            {currentImage && (
              <div className="space-y-3">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                  <Image
                    src={currentImage}
                    alt={`${title} - Image ${imageIndex + 1}`}
                    width={800}
                    height={450}
                    className="w-full h-full object-cover"
                  />
                </div>
                {images.length > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex(index)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-200",
                          index === imageIndex
                            ? "bg-primary w-8"
                            : "bg-primary/30 w-2 hover:bg-primary/50"
                        )}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Summary */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
              <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
            </div>

            {/* Details - Shown in expanded state */}
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

            {/* Tags / Skills - Shown in expanded state */}
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

            {/* Nested Volunteering Section - Shown in expanded state */}
            {volunteering.length > 0 && (
              <NestedAccordionSection
                title="Volunteering"
                items={volunteering.map((vol) => ({
                  id: vol.id,
                  title: vol.organization,
                  subtitle: vol.role,
                  description: vol.description,
                  details: vol.impact,
                  tags: vol.tags,
                }))}
                variant="volunteering"
              />
            )}

            {/* Nested Achievements Section - Shown in expanded state */}
            {achievements.length > 0 && (
              <NestedAccordionSection
                title="Achievements"
                items={achievements.map((ach) => ({
                  id: ach.id,
                  title: ach.title,
                  subtitle: `${ach.category} • ${ach.date}`,
                  description: ach.description,
                  details: ach.details,
                  tags: ach.tags,
                }))}
                variant="achievements"
              />
            )}

            {/* Skills Section - Shown in expanded state */}
            {skills.length > 0 && (
              <>
              <SkillsSection skills={skills} certificationTitle={title} />
              <div className='flex gap-3'>
                  <div className='bg-blue-500 w-10 h-10 rounded-full'/>
                  <div className='bg-blue-500 w-10 h-10 rounded-full'/>
                  <div className='bg-blue-500 w-10 h-10 rounded-full'/>
                  <div className='bg-blue-500 w-10 h-10 rounded-full'/>
                </div>
              
              </>
            )}

            {/* View Details Button - Shown in expanded state */}
            {category && id && category !== "certification" && (
              <div className="flex justify-end pt-4 border-t border-foreground/10">
                <a
                  href={`/${category}/${id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 text-primary px-4 py-2 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  View Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            )}
            </div>

            {/* Right Sidebar - Supporting Documents - Shown in expanded state */}
            {supportingDocuments && supportingDocuments.length > 0 && (
              <div className="lg:col-span-1 flex flex-col justify-between">
                <SupportingDocuments documents={supportingDocuments} />
                
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
