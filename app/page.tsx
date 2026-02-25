import { HeroSection } from '@/components/hero-section'
import { PreviewCards } from '@/components/preview-card'
import { portfolioData, getCategoryItems } from '@/data/portfolio'
import {
  BookOpen,
  Briefcase,
  Building2,
  Award,
  Heart,
  Trophy,
  FolderOpen,
} from 'lucide-react'

export default function Home() {
  const allVolunteering = portfolioData.education.flatMap(
    (edu) => edu.volunteering || []
  )
  const allAchievements = portfolioData.education.flatMap(
    (edu) => edu.achievements || []
  )

  const categories = [
    {
      id: 'education',
      category: 'education',
      title: 'Education',
      description: 'My academic background and learning journey',
      count: getCategoryItems('education').length,
      icon: <BookOpen size={24} />,
    },
    {
      id: 'experience',
      category: 'experience',
      title: 'Experience',
      description: 'Professional roles and responsibilities',
      count: getCategoryItems('experience').length,
      icon: <Briefcase size={24} />,
    },
    {
      id: 'organization',
      category: 'organization',
      title: 'Organizations',
      description: 'Community involvement and leadership',
      count: getCategoryItems('organization').length,
      icon: <Building2 size={24} />,
    },
    {
      id: 'projects',
      category: 'projects',
      title: 'Projects',
      description: 'Business ventures, engineering research, and technical initiatives',
      count: 3,
      icon: <FolderOpen size={24} />,
    },
    {
      id: 'certification',
      category: 'certification',
      title: 'Certifications',
      description: 'Professional credentials and qualifications',
      count: getCategoryItems('certification').length,
      icon: <Award size={24} />,
    },
    {
      id: 'volunteering',
      category: 'volunteering',
      title: 'Volunteering',
      description: 'Community service and mentorship initiatives',
      count: allVolunteering.length,
      icon: <Heart size={24} />,
    },
    {
      id: 'achievement',
      category: 'achievement',
      title: 'Achievements',
      description: 'Awards and recognitions',
      count: allAchievements.length,
      icon: <Trophy size={24} />,
    },
  ]

  return (
    <div className="relative overflow-hidden bg-background">
      <HeroSection
        name={portfolioData.profile.name}
        title={portfolioData.profile.title}
        bio={portfolioData.profile.bio}
        profileImage={portfolioData.profile.profileImage}
      />

      <PreviewCards categories={categories} />
    </div>
  )
}
