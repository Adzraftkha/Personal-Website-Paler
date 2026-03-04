'use client'

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
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function EducationAllPage() {
  const items = getCategoryItems('education')

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
              href="/education"
              className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Education
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              All Education
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Complete educational background and learning journey
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          {/* Items List */}
          <div className="grid gap-6 md:grid-cols-1">
            {items.map((item: any) => (
              <AccordionItem
                key={`${item.id}-${item.logo}`} 
                {...item} 
                title={item.school} 
                subtitle={`${item.degree} in ${item.field}`}
                summary={item.description}
                logo={item.logo} 
                category="education"
                variants={fadeInUp}
              />
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}