'use client'

import { getCategoryItems, type IPortfolioData, type ICertification } from '@/data/portfolio'
import { getSkeletonData } from '@/data/skeleton-data'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { useEffect, useState, useMemo } from 'react'
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
  certification: 'Certifications supporting multidisciplinary development across engineering, energy systems,operations, and technology',
  volunteering: 'Community service and mentorship',
  achievement: 'Awards and recognitions',
}

const groupDescriptions: Record<string, string> = {
  'Engineering & Energy Systems': 'Advanced technical expertise in piping systems and energy infrastructure.',
  'Safety, Quality & Compliance': 'Commitment to industry standards, safety protocols, and quality assurance.',
  'Project, Supply Chain & Operations': 'Strategic management of resources and operational excellence.',
  'Digital & Technical Tools': 'Proficiency in industry-leading software and digital transformation tools.',
  'Language & Communication': 'Global professional communication and linguistic capabilities.',
  'Others': 'Additional specialized certifications and professional development.'
}

const manualLogos: Record<string, { logoLembaga: string, skillsLogos: string[] }> = {
  "Basic–Intermediate Piping Stress Analysis (CAESAR II & Pipe Data Pro)": {
    logoLembaga: "/logos/goto.png", 
    skillsLogos: [
      "/logos/caesar-ii-icon.png", 
      "/logos/pipedata-icon.png",
      "/logos/stress-icon.png"
    ]
  }
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const [category, setCategory] = useState<string>('')
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false)
  
  const [groupedItems, setGroupedItems] = useState<Record<string, any[]>>({})
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    params.then(({ category }) => {
      setCategory(category)
      const categoryKey = category as keyof Omit<IPortfolioData, 'profile'>
      let categoryItems = getCategoryItems(categoryKey)
      const categoryTitle = categoryTitles[categoryKey] || categoryKey
      const categoryDescription = categoryDescriptions[categoryKey] || ''

      const isEmpty = categoryItems.length === 0
      if (isEmpty) {
        categoryItems = getSkeletonData(categoryKey) as any
      }

      setTitle(categoryTitle)
      setDescription(categoryDescription)
      setItems(categoryItems)
      setIsPlaceholder(isEmpty)

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

        const sorted: Record<string, any[]> = {}
        groupOrder.forEach((g) => { if (groups[g]) sorted[g] = groups[g] })
        Object.keys(groups).forEach((g) => { if (!sorted[g]) sorted[g] = groups[g] })

        setGroupedItems(sorted)
        const initialExpanded: Record<string, boolean> = {}
        Object.keys(sorted).forEach((group) => { initialExpanded[group] = false })
        setExpandedCategories(initialExpanded)
      }
    })
  }, [params])

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)]">
      <section className="px-4 py-30 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-4 md:mb-16">
            <div className="flex items-center gap-3">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">{title}</h1>
              {isPlaceholder && <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">Skeleton</span>}
            </div>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">{description}</p>
            <p className="text-sm text-foreground/60 font-medium">{items.length} items</p>
          </div>

          <div className="space-y-4 animate-fade-in">
            {category === 'certification' && Object.keys(groupedItems).length > 0 ? (
              Object.entries(groupedItems).map(([groupName, groupItems]) => (
                <div key={groupName} className="space-y-4 first:pt-0">
                  <button
                    onClick={() => {
                      const newState: Record<string, boolean> = {}
                      Object.keys(groupedItems).forEach(group => {
                        newState[group] = group === groupName && !expandedCategories[groupName]
                      })
                      setExpandedCategories(newState)
                      setOpenId(null)
                    }}
                    className={cn(
                      "w-full text-left transition-all duration-200 rounded-lg p-4 border",
                      expandedCategories[groupName] 
                        ? "bg-transparent border-foreground/20" 
                        : "bg-background/30 hover:bg-background/50 backdrop-blur-sm border-foreground/15 hover:border-foreground/25"
                    )}
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-foreground">{groupName}</h2>
                        <span className={cn("transition-transform duration-300", !expandedCategories[groupName] && "-rotate-90")}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/70">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-primary italic">
                          {groupDescriptions[groupName] || "Professional credentials in this field."}
                        </span>
                        <span className="text-sm text-foreground/60">
                          {groupItems?.length || 0} certification{groupItems?.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </button>

                  {expandedCategories[groupName] && (
                    <div className="space-y-4">
                      {groupItems.map((item: any, index: number) => {
                        const manualData = manualLogos[item.title];
                        return (
                          <div key={item.id || index} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                            <AccordionItem
                              {...item}
                              id={item.id || `cert-${index}`}
                              title={item.title || item.name}
                              subtitle={item.issuer}
                              summary={item.description || item.summary}
                              startDate={item.issueDate}
                              endDate={item.expirationDate}
                              // Support Hardcode Logo
                              logo={manualData?.logoLembaga || item.logo || item.image || item.issuerLogo}
                              skills={manualData?.skillsLogos || item.skills}
                              isOpen={openId === item.id}
                              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                              category={category}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            ) : (
              items.map((item: any, index: number) => (
                <div key={item.id || index} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                  <AccordionItem
                    {...item}
                    id={item.id || `${category}-${index}`}
                    title={item.title || item.school || item.company || item.organization || item.name}
                    subtitle={item.subtitle || item.degree || item.field || item.issuer || item.position || item.role}
                    summary={item.description || item.summary}
                    startDate={item.startDate || item.issueDate}
                    endDate={item.endDate || item.expirationDate}
                    isOpen={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                    category={category}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}