'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { getCategoryItems } from '@/data/portfolio'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { AccordionItem } from '@/components/accordion-item'

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function ExperienceAllPage() {
  const items = getCategoryItems('experience')
  
  // State untuk kontrol exclusive accordion
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="mx-auto max-w-4xl"
        >
          {/* Back Button */}
          <motion.div variants={fadeInUp}>
            <Link
              href="/experience"
              className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Experience
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              All Experience
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Complete professional roles and responsibilities
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Items List */}
          <div className="grid gap-6 md:grid-cols-1">
            {items.map((item: any, index: number) => {
              // Gunakan index sebagai fallback jika id tidak unik
              const uniqueId = item.id || `exp-${index}`;
              
              // Mapping data experience ke props AccordionItem
              return (
                <AccordionItem
                  key={uniqueId}
                  {...item}
                  id={uniqueId}
                  title={item.company}
                  subtitle={item.position}
                  summary={item.description}
                  // Pastikan key ini sesuai dengan struktur data experience kamu
                  details={item.achievements || item.details || []} 
                  logo={item.logo}
                  category="experience"
                  variants={fadeInUp}
                  // Props Kontrol Sinkronisasi
                  isOpen={openId === uniqueId}
                  onToggle={() => setOpenId(openId === uniqueId ? null : uniqueId)}
                />
              )
            })}
          </div>
        </motion.div>
      </section>
    </div>
  )
}