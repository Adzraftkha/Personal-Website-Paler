'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { portfolioData } from '@/data/portfolio'
import { ChevronLeft, FileText, Youtube } from 'lucide-react'
import { SupportingDocuments } from '@/components/supporting-documents'
import { SkillsSection } from '@/components/skills-section'
import { GlassCard } from '@/components/glass-card'

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [project, setProject] = useState<any>(null)
  const [imageIndex, setImageIndex] = useState(0)

  React.useEffect(() => {
    params.then(({ id }) => {
      const foundProject = portfolioData.experience.find(p => p.id === id)
      setProject(foundProject || null)
    })
  }, [params])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard className="p-8">
          <p className="text-lg text-foreground/70">Project not found</p>
          <Link href="/experience" className="text-primary hover:text-primary/80 mt-4 inline-block">
            ← Back to Projects
          </Link>
        </GlassCard>
      </div>
    )
  }

  const currentImage = project.images?.[imageIndex] || null

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Button */}
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Back to Projects</span>
        </Link>

        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              {project.position}
            </h1>
            <p className="text-xl text-primary font-medium">{project.company}</p>
            <p className="text-sm text-foreground/60">{project.startDate} - {project.endDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            {currentImage && (
              <GlassCard className="overflow-hidden">
                <div className="space-y-4">
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={currentImage}
                      alt={`${project.position} - Image ${imageIndex + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Navigation */}
                  {project.images && project.images.length > 1 && (
                    <div className="p-4 flex items-center justify-center gap-2">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setImageIndex(index)}
                          className={`h-2 rounded-full transition-all duration-200 ${
                            index === imageIndex
                              ? 'bg-primary w-8'
                              : 'bg-primary/30 w-2 hover:bg-primary/50'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            )}

            {/* Description */}
            <GlassCard>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Project Overview</h2>
                <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>
            </GlassCard>

            {/* Key Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <GlassCard>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Key Achievements</h2>
                  <ul className="space-y-3">
                    {project.achievements.map((achievement, index) => (
                      <li key={index} className="flex gap-3 text-foreground/80">
                        <span className="text-primary font-bold flex-shrink-0">✓</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            )}

            {/* Skills */}
            {project.tags && project.tags.length > 0 && (
              <GlassCard>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Technologies & Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <GlassCard>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-foreground/60">Company</p>
                    <p className="text-foreground font-medium">{project.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Position</p>
                    <p className="text-foreground font-medium">{project.position}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Duration</p>
                    <p className="text-foreground font-medium">{project.startDate} - {project.endDate}</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Supporting Documents */}
            {project.supportingDocuments && project.supportingDocuments.length > 0 && (
              <SupportingDocuments documents={project.supportingDocuments} title="Project Documents" />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
