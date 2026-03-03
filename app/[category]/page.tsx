'use client'

import { getCategoryItems, type IPortfolioData, type ICertification } from '@/data/portfolio'
import { getSkeletonData } from '@/data/skeleton-data'
import { cn } from '@/lib/utils'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
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

export default function CategoryPage() {
  const params = useParams()
  const category = params?.category as string

  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [groupedItems, setGroupedItems] = useState<Record<string, any[]>>({})
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!category) return

    const categoryKey = category as keyof Omit<IPortfolioData, 'profile'>
    let categoryItems = getCategoryItems(categoryKey)
    const isEmpty = categoryItems.length === 0

    if (isEmpty) {
      categoryItems = getSkeletonData(categoryKey) as any
    }

    setTitle(categoryTitles[categoryKey] || categoryKey)
    setDescription(categoryDescriptions[categoryKey] || '')
    setItems(categoryItems)

    // RESET SEMUA STATE SAAT PINDAH KATEGORI
    setExpandedGroup(null)
    setActiveItemId(null)
    setGroupedItems({})
    window.scrollTo({ top: 0 })

    // GROUPING KHUSUS CERTIFICATION
    if (category === 'certification') {
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

      const sorted: Record<string, any[]> = {}
      groupOrder.forEach((g) => {
        if (groups[g]) sorted[g] = groups[g]
      })
      Object.keys(groups).forEach((g) => {
        if (!sorted[g]) sorted[g] = groups[g]
      })

      setGroupedItems(sorted)
    }

  }, [category])

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)]">
      <section className="px-4 py-30 md:px-6">
        <div className="mx-auto max-w-4xl">

          <div className="mb-12 space-y-4 md:mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              {title}
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              {description}
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="space-y-4 animate-fade-in">

            {/* ===== CERTIFICATION ===== */}
            {category === 'certification' &&
              Object.entries(groupedItems).map(([groupName, groupItems]) => (
                <div
                  key={groupName}
                  ref={(el) => { groupRefs.current[groupName] = el }}
                  className="space-y-4"
                >
                  <button
                    onClick={() => {
                      const isOpening = expandedGroup !== groupName

                      setExpandedGroup(isOpening ? groupName : null)
                      setActiveItemId(null) // 🔥 reset item setiap ganti group

                      if (isOpening) {
                        setTimeout(() => {
                          const element = groupRefs.current[groupName]
                          if (!element) return

                          const offset = 120
                          const top =
                            window.scrollY +
                            element.getBoundingClientRect().top -
                            offset

                          window.scrollTo({ top, behavior: 'smooth' })
                        }, 80)
                      }
                    }}
                    className={cn(
                      "w-full text-left rounded-lg p-4 border transition-all",
                      expandedGroup === groupName
                        ? "bg-transparent border-foreground/20"
                        : "bg-background/30 hover:bg-background/50 backdrop-blur-sm border-foreground/15"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold text-foreground">
                        {groupName}
                      </h2>
                      <span className={cn(
                        "transition-transform duration-300",
                        expandedGroup !== groupName && "-rotate-90"
                      )}>
                        ▼
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 mt-1">
                      {groupItems.length} certification{groupItems.length !== 1 ? 's' : ''}
                    </p>
                  </button>

                  {expandedGroup === groupName && (
                    <div className="space-y-4">
                      {groupItems.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="animate-fade-in-up"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <AccordionItem
                            id={item.id}
                            isOpen={activeItemId === item.id}
                            onToggle={() =>
                              setActiveItemId(prev =>
                                prev === item.id ? null : item.id
                              )
                            }
                            title={item.title || item.name}
                            subtitle={item.issuer}
                            summary={item.description || item.summary}
                            details={item.details || []}
                            tags={item.tags || []}
                            images={item.images || []}
                            startDate={item.issueDate}
                            endDate={item.expirationDate}
                            skills={item.skills || []}
                            supportingDocuments={item.supportingDocuments || []}
                            category={category}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            {/* ===== NON CERTIFICATION ===== */}
            {category !== 'certification' &&
              items.map((item: any, index: number) => (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AccordionItem
                    id={item.id}
                    isOpen={activeItemId === item.id}
                    onToggle={() =>
                      setActiveItemId(prev =>
                        prev === item.id ? null : item.id
                      )
                    }
                    title={item.title || item.school || item.company || item.organization || item.name}
                    subtitle={item.subtitle || item.degree || item.field || item.issuer || item.position || item.role}
                    summary={item.description || item.summary}
                    details={item.details || []}
                    tags={item.tags || []}
                    images={item.images || []}
                    startDate={item.startDate || item.issueDate}
                    endDate={item.endDate || item.expirationDate}
                    volunteering={item.volunteering || []}
                    achievements={item.achievements || []}
                    skills={item.skills || []}
                    supportingDocuments={item.supportingDocuments || []}
                    category={category}
                  />
                </div>
              ))}

          </div>
        </div>
      </section>
    </div>
  )
}