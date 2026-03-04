'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { getCategoryItems, type ICertification } from '@/data/portfolio'
import { ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { AccordionItem } from '@/components/accordion-item'


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

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
}

export default function CertificationAllPage() {
  const pathname = usePathname()
  const items = getCategoryItems('certification')
  
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const groupedData = useMemo(() => {
    const groups: Record<string, { items: any[] }> = {}
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
      if (!groups[groupName]) {
        groups[groupName] = { items: [] }
      }
      groups[groupName].items.push(item)
    })

    const sorted: typeof groups = {}
    groupOrder.forEach((g) => {
      if (groups[g]) sorted[g] = groups[g]
    })
    Object.keys(groups).forEach((g) => {
      if (!sorted[g]) sorted[g] = groups[g]
    })

    return sorted
  }, [items])

  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-80px)] bg-background">
      <section className="px-4 py-16 md:px-6">
        <motion.div 
          key={pathname + selectedGroup}
          initial="initial"
          animate="animate"
          variants={containerVariants}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={fadeInUp}>
            <Link
              href="/certification"
              className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Certifications
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              Certifications
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Professional credentials and qualifications
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-12 flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedGroup(null); setOpenId(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGroup === null ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              All Groups
            </button>
            {Object.keys(groupedData).map((group) => (
              <button
                key={group}
                onClick={() => { setSelectedGroup(group); setOpenId(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedGroup === group ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {group}
              </button>
            ))}
          </motion.div>

          <div className="space-y-16">
            {Object.entries(groupedData)
              .filter(([name]) => !selectedGroup || name === selectedGroup)
              .map(([groupName, groupData]) => (
                <div key={groupName} className="space-y-6">
                  <motion.div variants={fadeInUp} className="border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-foreground">{groupName}</h2>
                    {/* DISINI: Menampilkan kalimat penjelasan pengganti yearRange */}
                    <p className="text-sm text-foreground/50 mt-1 italic">
                      {groupDescriptions[groupName] || "Professional certifications in this category."}
                    </p>
                  </motion.div>

                  <div className="grid gap-4 md:grid-cols-1">
                    <AnimatePresence mode="popLayout">
                      {groupData.items.map((item: any, index: number) => {
                        const uniqueId = item.id || `${groupName}-${index}`;
                        const manualData = manualLogos[item.title];
                        
                        return (
                          <AccordionItem
                            key={uniqueId}
                            {...item}
                            id={uniqueId}
                            title={item.title}
                            subtitle={item.issuer}
                            summary={item.description}
                            startDate={item.issueDate}
                            endDate={item.expirationDate}
                            // Mapping Logo Hardcode
                            logo={manualData?.logoLembaga || item.logo || item.image}
                            skills={manualData?.skillsLogos || item.skills}
                            category="certification"
                            variants={fadeInUp}
                            isOpen={openId === uniqueId}
                            onToggle={() => setOpenId(openId === uniqueId ? null : uniqueId)}
                          />
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}