"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { NestedAccordionSection } from "./nested-accordion-section";
import { SkillsSection } from "./skills-section";
import { SupportingDocuments } from "./supporting-documents";
import type { SupportingDocument } from "@/data/portfolio";

interface VolunteeringItem {
  id: string;
  organization: string;
  role: string;
  description: string;
  impact: string[];
  tags: string[];
}

interface AchievementItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  details: string[];
  tags: string[];
}

interface AccordionItemProps {
  id: string;
  title: string;
  subtitle?: string;
  logo?: string;
  summary: string;
  details?: string[];
  responsibilities?: string[]; // Tambahan buat data Organization
  tags?: string[];
  images?: string[];
  startDate?: string;
  endDate?: string;
  volunteering?: VolunteeringItem[];
  achievements?: any[]; 
  skills?: string[];
  supportingDocuments?: SupportingDocument[];
  isPlaceholder?: boolean;
  detailLink?: string;
  category?: string;
  variants?: any;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function AccordionItem({
  id,
  title,
  subtitle,
  logo,
  summary,
  details = [],
  responsibilities = [],
  tags = [],
  images = [],
  startDate,
  endDate,
  volunteering = [],
  achievements = [],
  skills = [],
  supportingDocuments = [],
  isPlaceholder = false,
  detailLink,
  category,
  variants,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isExpanded = isOpen !== undefined ? isOpen : internalOpen;
  const toggle = onToggle || (() => setInternalOpen(!internalOpen));

  const [imageIndex, setImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : startDate || null;
  const currentImage = images[imageIndex] || null;

  // Gabungkan semua poin (details, responsibilities, atau achievements non-education)
  const allKeyPoints = [
    ...details, 
    ...responsibilities, 
    ...(category !== "education" ? achievements : [])
  ].filter(p => p && (typeof p === 'string' || p.title));

  useEffect(() => {
    if (isExpanded && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded || images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isExpanded, images.length]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      layout
      className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card/80 cursor-pointer"
    >
      {/* HEADER SECTION */}
      <button
        onClick={() => toggle()}
        className={cn(
          "group w-full px-4 sm:px-6 py-4 text-left hover:bg-primary/5 transition-colors",
          isExpanded && "border-b border-border bg-primary/5"
        )}
      >
        <div className="flex gap-5 w-full items-center">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted/30 flex items-center justify-center">
            {logo && !imageError ? (
              <Image 
                src={logo} 
                alt={title} 
                fill 
                className="object-contain p-1.5" 
                onError={() => setImageError(true)} 
              />
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-primary uppercase">
                {title?.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-1">
              <h3 className={cn(
                "font-semibold transition-colors", 
                isExpanded ? "text-lg sm:text-xl text-primary" : "text-sm sm:text-base group-hover:text-primary"
              )}>
                {title}
              </h3>
              {subtitle && <p className="text-sm text-primary font-medium">{subtitle}</p>}
              {dateRange && <p className="text-xs text-foreground/60">{dateRange}</p>}
            </div>
            <ChevronDown 
              size={20} 
              className={cn("text-foreground/50 transition-all", isExpanded && "rotate-180")} 
            />
          </div>
        </div>
      </button>

      {/* EXPANDABLE CONTENT */}
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0, y: 15 }} 
            animate={{ 
              height: "auto", 
              opacity: 1, 
              y: 0,
              transition: {
                height: { duration: 0.3 },
                opacity: { duration: 0.4, delay: 0.05 },
                y: { duration: 0.4, ease: "easeOut" }
              }
            }} 
            exit={{ 
              height: 0, 
              opacity: 0, 
              y: 10,
              transition: { duration: 0.2 } 
            }}
          >
            <div className="p-6 bg-background/50 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                
                {currentImage && (
                   <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                      <Image src={currentImage} alt={title} fill className="object-cover" />
                   </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">Overview</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
                </div>

                {/* KEY POINTS (Render responsibilities/achievements as Bullets) */}
                {allKeyPoints.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Points</h4>
                    <ul className="space-y-2">
                      {allKeyPoints.map((point, idx) => (
                        <li key={`kp-${idx}`} className="flex gap-3 text-sm text-foreground/80">
                          <span className="text-primary font-bold flex-shrink-0">•</span>
                          <span>{typeof point === 'string' ? point : point.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* NESTED SECTION: Volunteering */}
                {volunteering.length > 0 && (
                  <NestedAccordionSection
                    title="Volunteering"
                    items={volunteering.map((v) => ({
                      id: v.id, title: v.organization, subtitle: v.role, description: v.description, details: v.impact, tags: v.tags,
                    }))}
                    variant="volunteering"
                  />
                )}

                {/* NESTED SECTION: Achievements (ONLY for Education) */}
                {category === "education" && achievements.length > 0 && (
                  <NestedAccordionSection
                    title="Achievements"
                    items={achievements.map((a: AchievementItem) => ({
                      id: a.id, title: a.title, subtitle: `${a.category} • ${a.date}`, description: a.description, details: a.details, tags: a.tags,
                    }))}
                    variant="achievements"
                  />
                )}

                <div className="space-y-4">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {skills.length > 0 && (
                    <SkillsSection skills={skills} certificationTitle={title} />
                  )}
                </div>

                {/* ACTION BUTTON */}
                {(detailLink || (category && id)) && (
                  <div className="flex justify-end pt-4 border-t border-border/50">
                    <a 
                      href={detailLink || `/${category}/${id}`}
                      target={detailLink?.startsWith('http') ? "_blank" : "_self"}
                      className="inline-flex items-center gap-2 rounded-lg border border-primary/30 text-primary px-4 py-2 text-sm font-medium transition-all hover:bg-primary/5 hover:border-primary"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </a>
                  </div>
                )}
              </div>

              {supportingDocuments.length > 0 && (
                <div className="lg:col-span-1">
                  <SupportingDocuments documents={supportingDocuments} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}