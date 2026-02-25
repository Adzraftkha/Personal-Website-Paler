'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassCard } from './glass-card'
import { toast } from 'sonner'
import { Send, Loader } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0, x: 20 },
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

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      toast.success('Message sent successfully! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-foreground"
          >
            Send me a Message
          </motion.h3>

          {/* Name */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground/80">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder-muted-foreground backdrop-blur-md transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-foreground/80">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder-muted-foreground backdrop-blur-md transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
          </motion.div>

          {/* Subject */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium text-foreground/80">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this about?"
              className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder-muted-foreground backdrop-blur-md transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-foreground/80">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              rows={6}
              className="w-full rounded-lg border border-border bg-background/50 px-4 py-3 text-foreground placeholder-muted-foreground backdrop-blur-md transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              disabled={isLoading}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </form>
      </GlassCard>
    </motion.div>
  )
}
