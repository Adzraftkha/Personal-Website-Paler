'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SkillsSectionProps {
  skills: string[]
  certificationTitle: string
}

export function SkillsSection({
  skills,
  certificationTitle,
}: SkillsSectionProps) {
  if (skills.length === 0) return null

  return (
    <div className="border-t border-border pt-4 mt-4">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4">
          Skills Gained from {certificationTitle}
        </h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
