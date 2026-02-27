import Image from 'next/image'
import Link from 'next/link'
import { use } from 'react'
import { GlassCard } from '@/components/glass-card'
import { SupportingDocuments } from '@/components/supporting-documents'
import { getItemById, getCategoryItems, type IPortfolioData } from '@/data/portfolio'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'

const categoryTitles: { [key: string]: string } = {
  education: 'Education',
  experience: 'Experience',
  organization: 'Organizations',
  certification: 'Certifications',
  volunteering: 'Volunteering',
  achievement: 'Achievements',
}

export async function generateStaticParams() {
  const categories = ['education', 'experience', 'organization', 'certification', 'volunteering', 'achievement']
  const params = []

  for (const category of categories) {
    const categoryKey = category as keyof Omit<IPortfolioData, 'profile'>
    const items = getCategoryItems(categoryKey)
    for (const item of items) {
      params.push({ category, id: item.id })
    }
  }

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; id: string }> }): Promise<Metadata> {
  const resolvedParams = await params

  const item = getItemById(resolvedParams.category, resolvedParams.id) as any

  const rawTitle = item?.title || item?.school || item?.company || item?.organization || item?.name || 'Item'
  const title = typeof rawTitle === 'object' ? (rawTitle.name || "Detail") : String(rawTitle)

  return {
    title: `${title} | Portfolio`,
    description: item?.description || 'Portfolio detail page',
  }
}

export default function DetailPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const resolvedParams = use(params)
  const item = getItemById(resolvedParams.category, resolvedParams.id)
  const categoryTitle = categoryTitles[resolvedParams.category] || resolvedParams.category

  if (!item) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-background">
        <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Item not found</h1>
          <Link
            href={`/${resolvedParams.category}`}
            className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium transition-all hover:bg-primary/90"
          >
            Back to {categoryTitle}
          </Link>
        </div>
      </div>
    )
  }

  const rawTitle = (item as any)?.title || (item as any)?.school || (item as any)?.company || (item as any)?.organization || (item as any)?.name || 'Detail';
  const itemTitle = typeof rawTitle === 'object'
    ? (rawTitle.name || rawTitle.title || "Detail Item")
    : String(rawTitle);

  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 pt-35 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              {itemTitle}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-foreground/70">
              {(item as any).startDate && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>
                    {(item as any).startDate} - {(item as any).endDate || 'Present'}
                  </span>
                </div>
              )}
              {(item as any).school && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>
                    {typeof (item as any).school === 'object' ? (item as any).school.name : String((item as any).school)}
                  </span>
                </div>
              )}

              {(item as any).company && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>
                    {typeof (item as any).company === 'object' ? (item as any).company.name : String((item as any).company)}
                  </span>
                </div>
              )}

              {/* Tags */}
              {(item as any).tags && (item as any).tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {(item as any).tags.map((tag: string) => (
                    <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="grid gap-8 md:grid-cols-3">
              {/* Left - Description */}
              <div className="md:col-span-2 space-y-8">
                {/* Description */}
                <GlassCard>
                  <h2 className="mb-4 text-2xl font-bold text-foreground">Overview</h2>
                  <p className="leading-relaxed text-foreground/80">
                    {(item as any).description}
                  </p>
                </GlassCard>

                {/* Achievements/Responsibilities */}
                {((item as any).achievements || (item as any).volunteering || (item as any).details) && (
                  <GlassCard>
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {(item as any).achievements ? 'Achievements' : (item as any).volunteering ? 'Volunteering' : 'Details'}
                    </h2>
                    <ul className="space-y-3">
                      {((item as any).achievements || (item as any).volunteering || (item as any).details || []).map((point: any, i: number) => (
                        <li key={i} className="flex gap-3 text-foreground/80">
                          <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-primary" />
                          <span>
                            {/* INI KUNCINYA: Cek apakah dia object atau teks biasa */}
                            {typeof point === 'object'
                              ? (point.title || point.organization || point.description)
                              : String(point)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                )}

                {/* Images */}
                {(item as any).images && (item as any).images.length > 0 && (
                  <GlassCard>
                    <h2 className="mb-4 text-2xl font-bold text-foreground">Gallery</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {(item as any).images.map((image: string, i: number) => (
                        <div key={i} className="relative aspect-video overflow-hidden rounded-lg">
                          <Image
                            src={image}
                            alt={`${itemTitle} - Image ${i + 1}`}
                            width={600}
                            height={338}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                {/* Supporting Documents */}
                {(item as any).supportingDocuments && (item as any).supportingDocuments.length > 0 && (
                  <GlassCard>
                    <SupportingDocuments documents={(item as any).supportingDocuments} />
                  </GlassCard>
                )}
              </div>

              {/* Right - Sidebar */}
              <div className="space-y-6">
                {/* Additional Info */}
                <GlassCard>
                  <h3 className="mb-4 font-bold text-foreground">Information</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Degree', value: (item as any).degree },
                      { label: 'Field', value: (item as any).field },
                      { label: 'Position', value: (item as any).position },
                      { label: 'Role', value: (item as any).role },
                      { label: 'Issuer', value: (item as any).issuer },
                      { label: 'Cause', value: (item as any).cause },
                      { label: 'Category', value: (item as any).category },
                    ].map((info) => (
                      info.value && (
                        <div key={info.label}>
                          <p className="text-sm text-foreground/60">{info.label}</p>
                          <div className="text-foreground font-medium">
                            {/* INI PROTEKSINYA: Biar gak error object lagi */}
                            {typeof info.value === 'object'
                              ? (info.value.name || info.value.title || "Detail Available")
                              : String(info.value)}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </GlassCard>

                {/* External Link */}
                {(item as any).credentialUrl && (
                  <a
                    href={(item as any).credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-primary/30 text-primary px-6 py-3 font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
                  >
                    <ExternalLink size={20} />
                    View Credential
                  </a>
                )}
                {(item as any).externalLink && (
                  <a
                    href={(item as any).externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-lg border border-primary/30 text-primary px-6 py-3 font-medium transition-all hover:border-primary/50 hover:bg-primary/5"
                  >
                    <ExternalLink size={20} />
                    Learn More
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
