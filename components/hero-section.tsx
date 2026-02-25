'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GlassCard } from './glass-card'

interface HeroSectionProps {
  name: string
  title: string
  bio: string
  profileImage: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function HeroSection({ name, title, bio, profileImage }: HeroSectionProps) {
  return (
    <motion.section
      className="relative flex items-center justify-center px-4 py-16 md:py-24 min-h-[calc(100vh-80px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl dark:bg-primary/5" />
      </div>

      <div className="mx-auto max-w-6xl w-full">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
          {/* Text Content */}
          <motion.div className="flex flex-col justify-center gap-6 order-2 md:order-1" variants={itemVariants}>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground text-balance"
              variants={itemVariants}
            >
              {name}
            </motion.h1>
            
            <motion.h2
              className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              {title}
            </motion.h2>
            
            <motion.p
              className="text-base sm:text-lg leading-relaxed text-foreground/80 md:text-lg"
              variants={itemVariants}
            >
              {bio}
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
              <a
                href="#work"
                className="rounded-lg bg-primary text-primary-foreground px-8 py-3 font-medium transition-all duration-300 hover:bg-primary/90 text-center sm:text-left"
              >
                View Work
              </a>
              <a
                href="/contact"
                className="rounded-lg border border-primary/30 text-foreground px-8 py-3 font-medium transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 text-center sm:text-left"
              >
                Get in Touch
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex items-center justify-center order-1 md:order-2"
            variants={itemVariants}
          >
            <GlassCard className="relative aspect-square w-full max-w-sm p-0 overflow-hidden">
              <Image
                src={profileImage}
                alt={name}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
