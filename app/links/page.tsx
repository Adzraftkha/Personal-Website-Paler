'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { contactInfo } from '@/data/contact'
import { portfolioData } from '@/data/portfolio'
import * as Icons from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

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

const navigationLinks = [
  { label: 'Education', href: '/education', icon: <Icons.BookOpen size={18} /> },
  { label: 'Experience', href: '/experience', icon: <Icons.Briefcase size={18} /> },
  { label: 'Organization', href: '/organization', icon: <Icons.Building2 size={18} /> },
  { label: 'Projects', href: '/projects', icon: <Icons.FolderOpen size={18} /> },
  { label: 'Certification', href: '/certification', icon: <Icons.Award size={18} /> },
  { label: 'Contact', href: '/contact', icon: <Icons.Mail size={18} /> },
]

export default function LinksPage() {
  const [year, setYear] = useState(2024)
  const [shared, setShared] = useState(false)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title: portfolioData.profile.name, url })
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  return (
    <div className="relative overflow-hidden bg-background min-h-screen flex items-center justify-center py-8 px-4">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-50">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Top-left: Theme Toggle */}
      <div className="fixed top-4 left-4 z-50">
        <div className="rounded-full border border-border/50 bg-background/60 backdrop-blur-xl p-1 shadow-md shadow-black/5">
          <ThemeToggle />
        </div>
      </div>

      {/* Top-right: Share Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-full border border-border/50 bg-background/60 backdrop-blur-xl px-3 py-2 text-sm font-medium text-foreground/70 shadow-md shadow-black/5 transition-all duration-200 hover:bg-background/90 hover:text-foreground"
        >
          {shared ? (
            <>
              <Icons.Check size={16} />
              <span className="hidden sm:inline">Copied</span>
            </>
          ) : (
            <>
              <Icons.Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Glass Card Container */}
        <div className="rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl p-8 space-y-8 shadow-xl shadow-black/5">

          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4 text-center space-y-3">
            {/* Profile Image */}
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-primary/30 shadow-lg">
              <Image
                src={contactInfo.profileImage}
                alt={portfolioData.profile.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground text-balance">{portfolioData.profile.name}</h1>
              <p className="text-sm text-primary font-medium">{portfolioData.profile.title}</p>
            </div>

            {/* Social Media Icons Row */}
            <div className="flex items-center gap-3 pt-1">
              {contactInfo.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border/50 bg-background/50 text-foreground/60 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 hover:scale-110"
                  aria-label={link.label}
                >
                  {getIcon(link.icon)}
                </a>
              ))}
            </div>

            {/* Short Summary */}
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">{contactInfo.bio}</p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl border border-border/30 bg-background/50 px-4 py-3 font-medium text-foreground/80 transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary group"
              >
                <span className="flex-shrink-0 text-foreground/50 group-hover:text-primary transition-colors">
                  {link.icon}
                </span>
                <span className="text-sm">{link.label}</span>
                <Icons.ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-border/30 pt-5 text-center">
            <p className="text-xs text-foreground/40">
              {year} {portfolioData.profile.name}
            </p>
          </div>
        </div>

        {/* Back to Portfolio Link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-primary transition-colors"
          >
            <Icons.ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
