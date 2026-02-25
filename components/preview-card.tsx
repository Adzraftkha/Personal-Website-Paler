'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GlassCard } from './glass-card'
import { ArrowRight } from 'lucide-react'

interface PreviewCardProps {
  id: string
  category: string
  title: string
  description: string
  count: number
  icon: React.ReactNode
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
}

const hoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
}

interface PreviewCardsProps {
  categories: PreviewCardProps[]
}

export function PreviewCard({ category, title, description, count, icon }: PreviewCardProps) {
  return (
    <Link href={`/${category}`}>
      <motion.div
        variants={hoverVariants}
        whileHover="hover"
        initial="rest"
        className="h-full"
      >
        <GlassCard className="h-full cursor-pointer border-primary/20 hover:border-primary/50">
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="rounded-lg bg-primary/10 p-3 text-2xl text-primary">
                {icon}
              </div>
              <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary">
                {count}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3 className="text-xl font-bold text-foreground">{title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-foreground/70">
                {description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary transition-all duration-300 group-hover:gap-3">
              <span className="font-medium">Explore</span>
              <ArrowRight size={16} />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </Link>
  )
}

export function PreviewCards({ categories }: PreviewCardsProps) {
  return (
    <motion.section
      className="relative px-4 py-16 md:px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.h2
          className="mb-12 text-4xl md:text-5xl font-bold text-foreground text-balance"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          My Portfolio
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              custom={i}
              variants={cardVariants}
            >
              <PreviewCard {...category} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
