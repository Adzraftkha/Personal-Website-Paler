'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GlassCard } from './glass-card'
import { GlassButton } from './glass-button'
import type { IContactInfo } from '@/data/contact'
import * as Icons from 'lucide-react'

interface PersonalInfoCardProps {
  contactInfo: IContactInfo
}

const containerVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export function PersonalInfoCard({ contactInfo }: PersonalInfoCardProps) {
  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Linkedin: <Icons.Linkedin size={20} />,
      Github: <Icons.Github size={20} />,
      Twitter: <Icons.Twitter size={20} />,
      Mail: <Icons.Mail size={20} />,
      Dribbble: <Icons.Dribbble size={20} />,
      ExternalLink: <Icons.ExternalLink size={20} />,
    }
    return iconMap[iconName] || <Icons.Link size={20} />
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <GlassCard className="space-y-6">
        {/* Profile Image */}
        <motion.div variants={itemVariants} className="relative w-full overflow-hidden rounded-xl" style={{ minHeight: 300 }}>
          <Image
            src={contactInfo.profileImage}
            alt={contactInfo.bio}
            width={400}
            height={400}
            className="h-auto w-full object-cover rounded-xl"
          />
        </motion.div>

        {/* Bio */}
        <motion.div variants={itemVariants}>
          <p className="leading-relaxed text-foreground/80">
            {contactInfo.bio}
          </p>
        </motion.div>

        {/* Contact Details */}
        <motion.div variants={itemVariants} className="space-y-4 border-t border-border pt-4">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <a
              href={`mailto:${contactInfo.email}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {contactInfo.email}
            </a>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <a
              href={`tel:${contactInfo.phone}`}
              className="text-foreground hover:text-primary transition-colors"
            >
              {contactInfo.phone}
            </a>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-foreground">{contactInfo.location}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Timezone</p>
            <p className="text-foreground">{contactInfo.timezone}</p>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="space-y-3 border-t border-border pt-4">
          <p className="text-sm font-semibold text-muted-foreground">Connect</p>
          <div className="grid grid-cols-2 gap-2">
            {contactInfo.socialLinks.map((link) => (
              <GlassButton
                key={link.platform}
                href={link.url}
                label={link.platform}
                icon={getIcon(link.icon)}
                external={true}
                className="text-sm"
              />
            ))}
          </div>
        </motion.div>
      </GlassCard>
    </motion.div>
  )
}
