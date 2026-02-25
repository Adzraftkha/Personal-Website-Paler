'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'
import { CvDownloadButton } from '@/components/cv-download-button'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Education', href: '/education' },
  { label: 'Experience', href: '/experience' },
  { label: 'Organization', href: '/organization' },
  { label: 'Certification', href: '/certification' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [year, setYear] = useState<number>(2024)

  // Set year on client side to avoid hydration mismatch
  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  // Don't show footer on contact page or links page
  if (pathname === '/contact' || pathname === '/links') {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          subject: 'Quick Message from Portfolio',
          message
        })
      })
      if (response.ok) {
        setEmail('')
        setMessage('')
        alert('Message sent successfully!')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <footer className="border-t border-border bg-background/50 backdrop-blur-md mt-16">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information - Second on mobile, Left on desktop */}
            <div className="space-y-6 order-2 md:order-1">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
                    <Mail size={18} />
                    <a href="mailto:contact@example.com" className="hover:underline">
                      contact@example.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70 hover:text-foreground transition-colors">
                    <Phone size={18} />
                    <a href="tel:+6281234567890" className="hover:underline">
                      +62 812 3456 7890
                    </a>
                  </div>
                  <div className="flex items-start gap-3 text-foreground/70 hover:text-foreground transition-colors">
                    <MapPin size={18} className="mt-1 flex-shrink-0" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/links"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium text-sm"
                >
                  View Links
                  <ExternalLink size={16} />
                </Link>
                <CvDownloadButton variant="compact" />
              </div>
            </div>

            {/* Quick Contact Form - First on mobile, Right on desktop */}
            <div className="order-1 md:order-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Message</h3>
              <form onSubmit={handleSubmit} className="space-y-3" suppressHydrationWarning>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  suppressHydrationWarning
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={3}
                  suppressHydrationWarning
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-border mt-8 pt-8 text-center text-foreground/60 text-sm">
            <p>© {year} Farell Elghifari Putratama. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </>
  )
}
