"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { portfolioData } from '@/data/portfolio';
import { AccordionItem } from '@/components/accordion-item';

export default function AchievementsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const allAchievements = portfolioData.education.flatMap(edu => 
    (edu.achievements || []).map(ach => ({
      ...ach,
      startDate: ach.date,
      endDate: ach.date,
    }))
  )

  if (allAchievements.length === 0) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden ">
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">No achievements yet</h1>
          <p className="mb-8 text-foreground/60">Check back soon!</p>
          <Link href="/" className="rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium transition-all hover:bg-primary/90">
            Back Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden  min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 space-y-4 md:mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">Achievements</h1>
            <p className="text-lg text-foreground/70">Awards and recognitions</p>
          </div>

          <div className="space-y-4">
            {allAchievements.map((item: any) => (
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
                  // Mengirimkan props yang dibutuhkan AccordionItem baru
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}