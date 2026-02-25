import Link from 'next/link'
import { portfolioData } from '@/data/portfolio'

import type { Metadata } from 'next'
import { AccordionItem } from '@/components/accordion-item'

export const metadata: Metadata = {
  title: 'Achievements | Portfolio',
  description: 'View my awards and recognitions',
}

export default function AchievementsPage() {
  // Get all achievements items from education entries
  const allAchievements = portfolioData.education.flatMap(edu => 
    (edu.achievements || []).map(ach => ({
      ...ach,
      startDate: ach.date,
      endDate: ach.date,
    }))
  )

  if (allAchievements.length === 0) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-background">
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">No achievements yet</h1>
          <p className="mb-8 text-foreground/60">Check back soon!</p>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium transition-all hover:bg-primary/90"
          >
            Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 space-y-4 md:mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              Achievements
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Awards and recognitions
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {allAchievements.length} item{allAchievements.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* List */}
          <div className="space-y-4">
            {allAchievements.map((item: any, index: number) => (
              <div key={item.id}>
                <AccordionItem
                  id={item.id}
                  title={item.title}
                  subtitle={item.category}
                  summary={item.description}
                  details={item.details || []}
                  tags={item.tags || []}
                  images={item.images || []}
                  startDate={item.date}
                  endDate={item.date}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
