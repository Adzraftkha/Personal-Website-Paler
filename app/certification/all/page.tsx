'use client'

import Link from 'next/link'
import { getCategoryItems, type ICertification } from '@/data/portfolio'
import { GlassCard } from '@/components/glass-card'
import { ArrowLeft, Calendar } from 'lucide-react'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// 1. Variasi untuk masing-masing item (nongol dari bawah)
const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } 
  }
}

// 2. Variasi untuk container (mengatur jadwal munculnya anak-anaknya)
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda 0.1 detik antar item biar smooth bermunculan
      delayChildren: 0.2    // Tunggu 0.2 detik sebelum list mulai muncul
    }
  }
}

export default function CertificationAllPage() {
  const pathname = usePathname()
  const items = getCategoryItems('certification')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

  const groupedItems = useMemo(() => {
    const groups: Record<string, any[]> = {}
    const groupOrder = [
      'Engineering & Energy Systems',
      'Safety, Quality & Compliance',
      'Project, Supply Chain & Operations',
      'Digital & Technical Tools',
      'Language & Communication',
      'Others'
    ]

    items.forEach((item: any) => {
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

    return sorted
  }, [items])

  const filteredItems = selectedGroup
    ? groupedItems[selectedGroup]
    : Object.values(groupedItems).flat()

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        {/* Gunakan motion.div dengan key pathname agar animasi reset tiap pindah page */}
        <motion.div 
          key={pathname + selectedGroup} // Reset animasi juga pas ganti filter
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="mx-auto max-w-4xl"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Link
              href="/certification"
              className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Certifications
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              All Certifications
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Complete professional credentials and qualifications
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGroup === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              All Groups
            </button>
            {Object.keys(groupedItems).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGroup === group
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {group} ({groupedItems[group].length})
              </button>
            ))}
          </motion.div>

          {/* Items Grid - Di sinilah Accordion List yang smooth itu terjadi */}
          <div className="grid gap-6 md:grid-cols-1">
            {filteredItems.map((item: any) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                layout // Biar pas filter berubah, posisi item yang sisa gesernya smooth
              >
                <Link
                  href={`/certification/${item.id}`}
                  className="block group"
                >
                  <GlassCard className="h-full transition-all group-hover:border-primary/50">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                          {item.title}
                        </h3>
                        <p className="text-primary font-medium">{item.issuer}</p>
                      </div>

                      <p className="text-foreground/70 line-clamp-3">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 text-foreground/60 text-sm">
                        <Calendar size={16} />
                        <span>{item.issueDate}{item.expirationDate ? ` - ${item.expirationDate}` : ''}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}