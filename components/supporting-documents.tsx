'use client'

import React, { useState } from 'react'
import { FileText, Youtube, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SupportingDocument } from '@/data/portfolio'

interface SupportingDocumentsProps {
  documents: SupportingDocument[]
  title?: string
}

export function SupportingDocuments({ documents, title = 'Supporting Documents' }: SupportingDocumentsProps) {
  const [selectedDoc, setSelectedDoc] = useState<SupportingDocument | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!documents || documents.length === 0) {
    return null
  }

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.includes('youtu.be')
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }

  const handleDocumentClick = (doc: SupportingDocument) => {
    setSelectedDoc(doc)
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Supporting Documents Section */}
      <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm p-4">
        <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          {title}
        </h4>

        <div className="space-y-2">
          {documents.map((doc) => (
            <button
              key={doc.id}
              onClick={() => handleDocumentClick(doc)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg',
                'bg-background/50 border border-border/50',
                'hover:bg-primary/10 hover:border-primary/30',
                'transition-all duration-200 group text-left'
              )}
            >
              {doc.type === 'pdf' ? (
                <FileText size={18} className="text-red-500 flex-shrink-0 group-hover:text-red-600" />
              ) : (
                <Youtube size={18} className="text-red-600 flex-shrink-0 group-hover:text-red-700" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                  {doc.title}
                </p>
                <p className="text-xs text-foreground/50">
                  {doc.type === 'pdf' ? 'PDF Document' : 'YouTube Video'}
                </p>
              </div>
              <span className="text-xs text-foreground/50 flex-shrink-0 group-hover:text-foreground/70">
                {doc.type === 'pdf' ? 'View' : 'Watch'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal for PDF/Video Viewer */}
      {isModalOpen && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground truncate">
                {selectedDoc.title}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-foreground/70 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto bg-background/50">
              {selectedDoc.type === 'pdf' ? (
                <iframe
                  src={`${selectedDoc.url}#toolbar=0`}
                  className="w-full h-full min-h-96"
                  title={selectedDoc.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <div className="w-full max-w-4xl aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={getYoutubeEmbedUrl(selectedDoc.url)}
                      title={selectedDoc.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
