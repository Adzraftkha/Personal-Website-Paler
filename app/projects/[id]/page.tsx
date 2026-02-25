'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { GlassCard } from '@/components/glass-card'
import { SupportingDocuments } from '@/components/supporting-documents'
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: string
  title: string
  role: string
  status: string
  summary: string
  description?: string
  tags: string[]
  images?: string[]
  externalUrl?: string
  supportingDocuments?: Array<{
    id: string
    title: string
    type: 'pdf' | 'youtube' | 'link' | 'external'
    url: string
  }>
}

const allProjects: Project[] = [
  {
    id: 'business-1',
    title: 'Do Not Disturb Coffee & Co',
    role: 'Founder, CEO & Owner',
    status: 'Ongoing',
    summary:
      'Founded and operating a specialty coffee business, overseeing brand development, supply chain management, financial planning, and team leadership.',
    description: `Do Not Disturb Coffee & Co is a specialty coffee business founded with a passion for delivering high-quality coffee experiences. As the founder and CEO, I oversee all aspects of the business including:

• Brand Development & Strategy - Creating a distinctive brand identity in the specialty coffee market
• Supply Chain Management - Sourcing premium coffee beans and managing supplier relationships
• Financial Planning & Operations - Managing budgets, financial forecasting, and operational efficiency
• Team Leadership - Building and leading a talented team of baristas and staff
• Customer Experience - Ensuring exceptional service and customer satisfaction
• Product Development - Developing unique blends and beverages

The business focuses on sustainable sourcing, ethical trading practices, and community engagement through coffee culture.`,
    tags: ['Entrepreneurship', 'Business Operations', 'Leadership', 'Brand Development', 'F&B'],
    images: [
      '/images/projects/business-1/cafe-interior.jpg',
      '/images/projects/business-1/coffee-preparation.jpg',
      '/images/projects/business-1/storefront.jpg'
    ],
    supportingDocuments: [
      {
        id: 'doc-biz-1-1',
        title: 'Business Plan',
        type: 'pdf',
        url: '/documents/projects/business-plan.pdf'
      },
      {
        id: 'doc-biz-1-2',
        title: 'Cafe Tour Video',
        type: 'youtube',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ]
  },
  {
    id: 'engineering-1',
    title: 'Undergraduate Thesis -- Naval Architecture',
    role: 'Researcher, Diponegoro University (UNDIP)',
    status: 'Published',
    summary:
      'In-depth engineering analysis on marine vessel systems, focusing on systematic evaluation of structural and operational parameters. Published in an accredited academic journal.',
    description: `This undergraduate thesis represents a comprehensive engineering analysis of marine vessel systems. The research focused on:

• Structural Analysis - Evaluating the structural integrity and design parameters of marine vessels
• Operational Parameters - Analyzing vessel performance under various operational conditions
• Systematic Evaluation - Using rigorous engineering methodologies to assess vessel systems
• Data Collection & Analysis - Gathering and analyzing technical data from maritime operations
• Academic Publication - Publishing findings in an accredited academic journal

The thesis was published in an accredited academic journal, contributing to the field of naval architecture and marine engineering. The research bridged theoretical study with practical application in marine vessel design and operations.`,
    tags: ['Naval Architecture', 'Marine Engineering', 'Research', 'Academic Publication'],
    images: [
      '/images/projects/engineering-1/vessel-design.jpg',
      '/images/projects/engineering-1/analysis-diagram.jpg',
      '/images/projects/engineering-1/research-lab.jpg'
    ],
    supportingDocuments: [
      {
        id: 'doc-eng-1-1',
        title: 'Published Paper',
        type: 'pdf',
        url: '/documents/projects/thesis-paper.pdf'
      },
      {
        id: 'doc-eng-1-2',
        title: 'Research DOI',
        type: 'external',
        url: 'https://doi.org/10.12962/j25481479.v10i1.4732'
      }
    ],
    externalUrl: 'https://doi.org/10.12962/j25481479.v10i1.4732',
  },
  {
    id: 'engineering-2',
    title: 'Research of Marine & Technology -- UNDIP',
    role: 'Research Team Member, Diponegoro University',
    status: 'Completed',
    summary:
      'Collaborative academic research focusing on technical analysis and data-driven investigation of marine engineering systems, bridging theoretical study and applied engineering.',
    description: `This collaborative research project at Diponegoro University focused on advancing marine engineering knowledge through rigorous academic investigation. Key aspects include:

• Team Collaboration - Working with research team members and academic advisors
• Technical Analysis - Conducting in-depth analysis of marine engineering systems
• Data-Driven Investigation - Using empirical data and quantitative methods
• System Evaluation - Assessing performance and efficiency of marine technology
• Documentation - Preparing technical papers and research reports
• Knowledge Transfer - Contributing to academic understanding of marine systems

The project successfully bridged the gap between theoretical study and applied engineering, providing practical insights for marine technology development.`,
    tags: ['Marine Technology', 'Academic Research', 'Engineering Analysis'],
    images: [
      '/images/projects/engineering-2/team-lab-work.jpg',
      '/images/projects/engineering-2/experiment-setup.jpg',
      '/images/projects/engineering-2/data-presentation.jpg'
    ],
    supportingDocuments: [
      {
        id: 'doc-eng-2-1',
        title: 'Research Report',
        type: 'pdf',
        url: '/documents/projects/marine-research-report.pdf'
      }
    ]
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const [imageIndex, setImageIndex] = useState(0)

  const project = allProjects.find((p) => p.id === projectId)
  const currentImage = project?.images?.[imageIndex]

  if (!project) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-background">
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Project not found</h1>
          <Link
            href="/projects"
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium transition-all hover:bg-primary/90"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              {project.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-foreground/70">
              <div>
                <p className="text-sm text-foreground/60">Role</p>
                <p className="text-foreground font-medium">{project.role}</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60">Status</p>
                <p className="inline-flex rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                  {project.status}
                </p>
              </div>
            </div>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Image Carousel */}
            {project.images && project.images.length > 0 && (
              <GlassCard>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Gallery</h2>
                <div className="relative w-full">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-background/50">
                    <Image
                      src={currentImage!}
                      alt={`${project.title} - Image ${imageIndex + 1}`}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Navigation Buttons */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setImageIndex((prev) => (prev === 0 ? project.images!.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm p-2 text-foreground transition-all hover:bg-background/75"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => setImageIndex((prev) => (prev === project.images!.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 backdrop-blur-sm p-2 text-foreground transition-all hover:bg-background/75"
                      >
                        <ChevronRight size={24} />
                      </button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/75 backdrop-blur-sm px-3 py-1 text-xs font-medium text-foreground">
                        {imageIndex + 1} / {project.images.length}
                      </div>
                    </>
                  )}
                </div>
              </GlassCard>
            )}

            {/* Summary */}
            <GlassCard>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Summary</h2>
              <p className="leading-relaxed text-foreground/80">{project.summary}</p>
            </GlassCard>

            {/* Description */}
            {project.description && (
              <GlassCard>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Details</h2>
                <div className="space-y-4">
                  {project.description.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="leading-relaxed text-foreground/80 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Supporting Documents */}
            {project.supportingDocuments && project.supportingDocuments.length > 0 && (
              <GlassCard>
                <SupportingDocuments documents={project.supportingDocuments} />
              </GlassCard>
            )}

            {/* External Link */}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-lg border border-primary/30 text-primary px-6 py-3 font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <ExternalLink size={20} />
                View Full Research
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
