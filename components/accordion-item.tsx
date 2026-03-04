"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
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
  tags?: string[];
  images?: string[];
  startDate?: string;
  endDate?: string;
  volunteering?: VolunteeringItem[];
  achievements?: AchievementItem[];
  skills?: string[];
  supportingDocuments?: SupportingDocument[];
  isPlaceholder?: boolean;
  expandedPreview?: boolean;
  detailLink?: string;
  category?: string;
  variants?: any;
}

export function AccordionItem({
  id,
  title,
  subtitle,
  logo,
  summary,
  details = [],
  tags = [],
  images = [],

  startDate,
  endDate,
  volunteering = [],
  achievements = [],
  skills = [],

  supportingDocuments = [],
  isPlaceholder = false,
  expandedPreview = false,

  detailLink,
  category,
  variants,
}: AccordionItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const dateRange = startDate && endDate ? `${startDate} - ${endDate}` : null;
  const currentImage = images[imageIndex] || null;

  useEffect(() => {
    if (!isExpanded || images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isExpanded, images.length]);

  const handleHeaderClick = (e: React.MouseEvent) => {
    if (detailLink && !isExpanded) {
      e.preventDefault();
      window.location.href = detailLink;
      return;
    }

    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      variants={variants}
      layout
      className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-card/80 cursor-pointer"
    >
      <button
        onClick={handleHeaderClick}
        className={cn(
          "group w-full px-4 sm:px-6 py-4 text-left hover:bg-primary/5 transition-colors",

          isExpanded && "border-b border-border bg-primary/5",
        )}
      >
        <div className="flex gap-5 w-full items-center">
          {logo ? (
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg border border-border/50 bg-muted">
              <Image src={logo} alt={title} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
              {title.charAt(0)}
            </div>
          )}

          <div className="flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 space-y-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3
                  className={cn(
                    "font-semibold text-foreground transition-colors",

                    isExpanded
                      ? "text-lg sm:text-xl text-primary"
                      : "text-sm sm:text-base group-hover:text-primary",
                  )}
                >
                  {title}
                </h3>

                {isPlaceholder && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Skeleton
                  </span>
                )}
              </div>

              {subtitle && (
                <p className="text-sm text-primary font-medium">{subtitle}</p>
              )}

              {dateRange && (
                <p className="text-xs text-foreground/60">{dateRange}</p>
              )}

              {!isExpanded && (
                <p className="text-sm mt-3 text-foreground/70 line-clamp-2">
                  {summary}
                </p>
              )}
            </div>

            <ChevronDown
              size={20}
              className={cn(
                "text-foreground/50 flex-shrink-0 transition-all self-start sm:self-center",

                isExpanded ? "rotate-180" : "group-hover:text-foreground/70",
              )}
            />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 bg-background/50 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* 1. Carousel Image */}

                {currentImage && (
                  <div className="space-y-3">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                      <Image
                        src={currentImage}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {images.length > 1 && (
                      <div className="flex items-center justify-center gap-2">
                        {images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setImageIndex(index);
                            }}
                            className={cn(
                              "h-2 rounded-full transition-all",
                              index === imageIndex
                                ? "bg-primary w-8"
                                : "bg-primary/30 w-2",
                            )}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. Overview */}

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    Overview
                  </h4>

                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {summary}
                  </p>
                </div>

                {/* 3. Details */}

                {details.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Key Points
                    </h4>

                    <ul className="space-y-2">
                      {details.map((detail, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm text-foreground/80"
                        >
                          <span className="text-primary font-bold flex-shrink-0">
                            •
                          </span>

                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4. Tags */}

                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* 5. Volunteering & Achievements */}

                {volunteering.length > 0 && (
                  <NestedAccordionSection
                    title="Volunteering"
                    items={volunteering.map((v) => ({
                      id: v.id,
                      title: v.organization,
                      subtitle: v.role,
                      description: v.description,
                      details: v.impact,
                      tags: v.tags,
                    }))}
                    variant="volunteering"
                  />
                )}

                {achievements.length > 0 && (
                  <NestedAccordionSection
                    title="Achievements"
                    items={achievements.map((a) => ({
                      id: a.id,
                      title: a.title,
                      subtitle: `${a.category} • ${a.date}`,
                      description: a.description,
                      details: a.details,
                      tags: a.tags,
                    }))}
                    variant="achievements"
                  />
                )}

                {/* 6. Skills Section & Blue Circles (yg lo tambahin manual) */}

                {skills.length > 0 && (
                  <>
                    <SkillsSection skills={skills} certificationTitle={title} />

                    <div className="flex gap-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-blue-500 w-10 h-10 rounded-full"
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* 7. View Details Button */}

                {category && id && (
                  <div className="flex justify-end pt-4 border-t border-foreground/10">
                    <a
                      href={`/${category}/${id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-primary/30 text-primary px-4 py-2 text-sm font-medium transition-all hover:bg-primary/5"
                    >
                      View Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                )}
              </div>

              {/* Sidebar Supporting Docs */}

              {supportingDocuments && supportingDocuments.length > 0 && (
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
