'use client'

import { getCategoryItems, type IPortfolioData, type ICertification } from '@/data/portfolio'
import { getSkeletonData } from '@/data/skeleton-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { AccordionItem } from '@/components/accordion-item'

const categoryTitles: { [key: string]: string } = {
  education: 'Education',
  experience: 'Experience',
  organization: 'Organizations',
  certification: 'Certifications',
  volunteering: 'Volunteering',
  achievement: 'Achievements',
}

const categoryDescriptions: { [key: string]: string } = {
  education: 'Academic background and learning journey',
  experience: 'Professional roles and responsibilities',
  organization: 'Community involvement and leadership',
  certification: 'Professional credentials and qualifications',
  volunteering: 'Community service and mentorship',
  achievement: 'Awards and recognitions',
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
  const [groupedItems, setGroupedItems] = useState<Record<string, any[]>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Extract category from params
    params.then(({ category }) => {
      setCategory(category)
      const categoryKey = category as keyof Omit<IPortfolioData, 'profile'>
      let categoryItems = getCategoryItems(categoryKey)
      const categoryTitle = categoryTitles[categoryKey] || categoryKey
      const categoryDescription = categoryDescriptions[categoryKey] || ''

      // Use skeleton data if no items available
      const isEmpty = categoryItems.length === 0
      if (isEmpty) {
        categoryItems = getSkeletonData(categoryKey) as any
      }

      setTitle(categoryTitle)
      setDescription(categoryDescription)
      setItems(categoryItems)
      setIsPlaceholder(isEmpty)

      // Group certifications by their group property
      if (category === 'certification' && !isEmpty) {
        const groups: Record<string, any[]> = {}
        const groupOrder = [
          'Engineering & Energy Systems',
          'Safety, Quality & Compliance',
          'Project, Supply Chain & Operations',
          'Digital & Technical Tools',
          'Language & Communication',
          'Others'
        ]
        categoryItems.forEach((item: any) => {
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
        setGroupedItems(sorted)
        // Initialize all categories as closed (per spec requirement)
        const initialExpanded: Record<string, boolean> = {}
        Object.keys(sorted).forEach((group) => {
          initialExpanded[group] = false // All categories closed by default
        })
        setExpandedCategories(initialExpanded)
      }
    })
  }, [params])

  return (
    <div className="relative overflow-hidden  min-h-[calc(100vh-80px)]">
      <section className="px-4 py-30 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 space-y-4 md:mb-16">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                {title}
              </h1>
              {isPlaceholder && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  Skeleton
                </span>
              )}
            </div>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              {description}
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* List */}
          <div className="space-y-4 animate-fade-in">
            {/* Grouped display for certifications */}
            {category === 'certification' && Object.keys(groupedItems).length > 0 ? (
              Object.entries(groupedItems).map(([groupName, groupItems]) => (
                <div key={groupName} className="space-y-4 first:pt-0">
                  <button
                    onClick={() => {
                      // Only one category can be open at a time
                      const newState: Record<string, boolean> = {}
                      Object.keys(groupedItems).forEach(group => {
                        newState[group] = group === groupName && !expandedCategories[groupName]
                      })
                      setExpandedCategories(newState)
                    }}
                    className={cn(
                      "w-full text-left transition-all duration-200 rounded-lg p-4 border",
                      expandedCategories[groupName]
                        ? "bg-transparent border-foreground/20"
                        : "bg-background/30 hover:bg-background/50 backdrop-blur-sm border-foreground/15 hover:border-foreground/25"
                    )}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-foreground">{groupName}</h2>
                        <span className={cn("transition-transform duration-300", !expandedCategories[groupName] && "-rotate-90")}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/70">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm text-foreground/60">{groupItems.length} certification{groupItems.length !== 1 ? 's' : ''}</p>
                    </div>
                  </button>
                  {expandedCategories[groupName] && (
                    <div className="space-y-4">
                      {groupItems.map((item: any, index: number) => {
                        let detailsArray: string[] = []
                        if (item.details && Array.isArray(item.details) && typeof item.details[0] === 'string') {
                          detailsArray = item.details
                        }
                        return (
                          <div
                            key={item.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <AccordionItem
                              id={item.id}
                              title={item.title || item.name}
                              subtitle={item.issuer}
                              summary={item.description || item.summary}
                              details={detailsArray}
                              tags={item.tags || []}
                              images={item.images || []}
                              startDate={item.issueDate}
                              endDate={item.expirationDate}
                              skills={(item as any).skills || []}
                              supportingDocuments={(item as any).supportingDocuments || []}
                              isPlaceholder={(item as any).isPlaceholder || false}
                              expandedPreview={false}
                              category={category}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : items.map((item: any, index: number) => {
              // Determine the appropriate details array based on item type
              let detailsArray: string[] = []
              
              if (item.responsibilities) {
                // Organization has responsibilities
                detailsArray = item.responsibilities
              } else if (item.impact && Array.isArray(item.impact) && typeof item.impact[0] === 'string') {
                // Volunteering has impact
                detailsArray = item.impact
              } else if (item.details && Array.isArray(item.details) && typeof item.details[0] === 'string') {
                // Details exists and is an array of strings
                detailsArray = item.details
              } else if (item.achievements && Array.isArray(item.achievements) && typeof item.achievements[0] === 'string') {
                // Experience has achievements as strings
                detailsArray = item.achievements
              }

              return (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AccordionItem
                    id={item.id}
                    title={item.title || item.school || item.company || item.organization || item.name}
                    subtitle={item.subtitle || item.degree || item.field || item.issuer || item.position || item.role}
                    summary={item.description || item.summary}
                    details={detailsArray}
                    tags={item.tags || []}
                    images={item.images || []}
                    startDate={item.startDate || item.issueDate}
                    endDate={item.endDate || item.expirationDate}
                    volunteering={(item as any).volunteering || []}
                    achievements={(item as any).achievements && Array.isArray(item.achievements) && typeof item.achievements[0] === 'object' ? (item as any).achievements : []}
                    skills={(item as any).skills || []}
                    supportingDocuments={(item as any).supportingDocuments || []}
                    isPlaceholder={(item as any).isPlaceholder || false}
                    expandedPreview={false}
                    category={category}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}