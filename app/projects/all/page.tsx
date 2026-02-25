'use client'

import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { ArrowLeft, Briefcase, FlaskConical, ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  role: string
  status: string
  summary: string
  tags: string[]
  type: 'business' | 'engineering'
  externalUrl?: string
}

const allProjects: Project[] = [
  {
    id: 'business-1',
    title: 'Do Not Disturb Coffee & Co',
    role: 'Founder, CEO & Owner',
    status: 'Ongoing',
    summary:
      'Founded and operating a specialty coffee business, overseeing brand development, supply chain management, financial planning, and team leadership.',
    tags: ['Entrepreneurship', 'Business Operations', 'Leadership', 'Brand Development', 'F&B'],
    type: 'business',
  },
  {
    id: 'engineering-1',
    title: 'Undergraduate Thesis -- Naval Architecture',
    role: 'Researcher, Diponegoro University (UNDIP)',
    status: 'Published',
    summary:
      'In-depth engineering analysis on marine vessel systems, focusing on systematic evaluation of structural and operational parameters. Published in an accredited academic journal.',
    tags: ['Naval Architecture', 'Marine Engineering', 'Research', 'Academic Publication'],
    type: 'engineering',
    externalUrl: 'https://doi.org/10.12962/j25481479.v10i1.4732',
  },
  {
    id: 'engineering-2',
    title: 'Research of Marine & Technology -- UNDIP',
    role: 'Research Team Member, Diponegoro University',
    status: 'Completed',
    summary:
      'Collaborative academic research focusing on technical analysis and data-driven investigation of marine engineering systems, bridging theoretical study and applied engineering.',
    tags: ['Marine Technology', 'Academic Research', 'Engineering Analysis'],
    type: 'engineering',
  },
]

export default function ProjectsAllPage() {
  const businessProjects = allProjects.filter((p) => p.type === 'business')
  const engineeringProjects = allProjects.filter((p) => p.type === 'engineering')

  const ProjectCard = ({ project }: { project: Project }) => {
    const cardContent = (
      <GlassCard className="h-full transition-all hover:border-primary/50">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{project.title}</h3>
            <p className="text-primary font-medium text-sm mb-2">{project.role}</p>
            <span className="inline-block rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              {project.status}
            </span>
          </div>

          <p className="text-foreground/70 line-clamp-3 text-sm">
            {project.summary}
          </p>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary font-medium"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-xs text-foreground/60">+{project.tags.length - 2} more</span>
              )}
            </div>
          )}
        </div>
      </GlassCard>
    )

    if (project.externalUrl) {
      return (
        <a href={project.externalUrl} target="_blank" rel="noopener noreferrer" className="block group">
          {cardContent}
        </a>
      )
    }

    return (
      <Link href={`/projects/${project.id}`} className="block group">
        {cardContent}
      </Link>
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
              All Projects
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Business ventures, engineering research, and technical initiatives
            </p>
            <p className="text-sm text-foreground/60 font-medium">
              {allProjects.length} item{allProjects.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Business & Leadership Projects */}
          {businessProjects.length > 0 && (
            <div className="mb-16">
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                  <Briefcase size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Business & Leadership</h2>
                  <p className="text-sm text-foreground/60">Entrepreneurial ventures and operational leadership</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {businessProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}

          {/* Engineering & Research Projects */}
          {engineeringProjects.length > 0 && (
            <div>
              <div className="mb-8 flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2.5 text-accent">
                  <FlaskConical size={22} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Engineering & Research</h2>
                  <p className="text-sm text-foreground/60">Academic research and technical engineering projects</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {engineeringProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
