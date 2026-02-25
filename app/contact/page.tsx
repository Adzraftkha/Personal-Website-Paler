import { PersonalInfoCard } from '@/components/personal-info-card'
import { ContactForm } from '@/components/contact-form'
import { CvDownloadButton } from '@/components/cv-download-button'
import { ViewLinksButton } from '@/components/view-links-button'
import { contactInfo } from '@/data/contact'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Portfolio',
  description: 'Get in touch with me. Share your thoughts, opportunities, or just say hello!',
}

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-background min-h-[calc(100vh-80px)]">
      <section className="px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Desktop: Two-column (Get in Touch left, Quick Message right) */}
          {/* Mobile/Tablet: Single column (Quick Message first, Get in Touch second) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Get in Touch - Left on desktop, Second on mobile */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Get in Touch
                </h1>
                <p className="max-w-2xl text-lg text-foreground/70 lg:text-xl">
                  Reach out through any of these channels or find me on social media.
                </p>
              </div>
              <PersonalInfoCard contactInfo={contactInfo} />
              <div className="flex flex-col sm:flex-row gap-4">
                <CvDownloadButton />
                <ViewLinksButton />
              </div>
            </div>

            {/* Quick Message - Right on desktop, First on mobile */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
                  Quick Message
                </h2>
                <p className="max-w-2xl text-lg text-foreground/70 lg:text-xl">
                  Send me a quick message directly. I'll get back to you as soon as possible.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
