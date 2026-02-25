import type { Metadata } from 'next'
import Link from 'next/link'
import { GlassCard } from '@/components/glass-card'
import { Briefcase, FlaskConical, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects | Farell Elghifari Putratama',
  description: 'Business ventures, engineering research, and technical projects',
}

interface ProjectCardProps {
  id: string
  title: string
  role: string
  status: string
  summary: string
  tags: string[]
  externalUrl?: string
}

function ProjectCard({ id, title, role, status, summary, tags, externalUrl }: ProjectCardProps) {
  const cardContent = (
    <GlassCard className="flex h-full flex-col justify-between gap-5 transition-all hover:border-primary/50">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-bold text-foreground text-balance">{title}</h3>
            <span className="flex-shrink-0 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              {status}
            </span>
          </div>
          <p className="text-sm font-medium text-primary">{role}</p>
        </div>

        <p className="text-sm leading-relaxed text-foreground/75">{summary}</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          Learn More
          <ExternalLink size={14} />
        </div>
      </div>
    </GlassCard>
  )

  if (externalUrl) {
    return (
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-transform hover:scale-[1.02]"
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link href={`/projects/${id}`} className="block transition-transform hover:scale-[1.02]">
      {cardContent}
    </Link>
  )
}

const businessProjects: ProjectCardProps[] = [
  {
    id: 'business-1',
    title: 'Do Not Disturb Coffee & Co',
    role: 'Founder, CEO & Owner',
    status: 'Ongoing',
    summary:
      'Founded and operating a specialty coffee business, overseeing brand development, supply chain management, financial planning, and team leadership.',
    tags: ['Entrepreneurship', 'Business Operations', 'Leadership', 'Brand Development', 'F&B'],
  },
]

const engineeringProjects: ProjectCardProps[] = [
  {
    id: 'engineering-1',
    title: 'Undergraduate Thesis -- Naval Architecture',
    role: 'Researcher, Diponegoro University (UNDIP)',
    status: 'Published',
    summary:
      'In-depth engineering analysis on marine vessel systems, focusing on systematic evaluation of structural and operational parameters. Published in an accredited academic journal.',
    tags: ['Naval Architecture', 'Marine Engineering', 'Research', 'Academic Publication'],
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
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 space-y-4 md:mb-16">
            <h1 className="text-5xl font-bold text-foreground text-balance md:text-6xl">
              Projects
            </h1>
            <p className="max-w-2xl text-lg text-foreground/70 md:text-xl">
              Business ventures, engineering research, and technical initiatives
            </p>
          </div>

          {/* Business & Leadership Projects */}
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {businessProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>

          {/* Engineering & Research Projects */}
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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {engineeringProjects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
