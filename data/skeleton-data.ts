// Skeleton/Placeholder data for all portfolio pages
// Used when actual data is not available

interface SkeletonItem {
  id: string
  title: string
  subtitle?: string
  summary: string
  details: string[]
  tags: string[]
  images: string[]
  startDate?: string
  endDate?: string
  isPlaceholder: true
}

export const skeletonEducation: SkeletonItem[] = [
  {
    id: 'placeholder-edu-1',
    title: 'University Education',
    subtitle: 'Bachelor of Science in Computer Science',
    summary:
      'Overview of academic focus including core computer science subjects, specialized coursework, and key learning milestones achieved during the program.',
    details: [
      'Comprehensive study of algorithms and data structures',
      'Software engineering principles and practices',
      'Web development and modern frameworks',
      'Database design and management systems',
      'Team collaboration and project management',
    ],
    tags: ['Computer Science', 'Bachelor', 'Technology', 'Engineering'],
    images: ['/images/placeholder/edu1-1.jpg', '/images/placeholder/edu1-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-edu-2',
    title: 'High School Education',
    subtitle: 'General Education Diploma',
    summary:
      'Foundation in core academic subjects with emphasis on mathematics, sciences, and languages. Building strong fundamentals for further education.',
    details: [
      'Mathematics and analytical thinking',
      'Natural and physical sciences',
      'Language and communication skills',
      'Social studies and humanities',
      'Extracurricular activities and personal development',
    ],
    tags: ['Secondary Education', 'General Studies', 'Foundation'],
    images: ['/images/placeholder/edu2-1.jpg', '/images/placeholder/edu2-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
]

export const skeletonExperience: SkeletonItem[] = [
  {
    id: 'placeholder-exp-1',
    title: 'Senior Software Engineer',
    subtitle: 'Technology Company',
    summary:
      'Lead development of scalable applications and mentor junior team members. Responsible for architecture decisions and technical implementation of complex features.',
    details: [
      'Architecture and design of system components',
      'Mentoring and code review for team members',
      'Implementation of scalable solutions',
      'Collaboration with product and design teams',
      'Performance optimization and technical debt management',
    ],
    tags: ['Leadership', 'Full Stack', 'Architecture', 'Mentoring'],
    images: ['/images/placeholder/exp1-1.jpg', '/images/placeholder/exp1-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-exp-2',
    title: 'Software Developer',
    subtitle: 'Development Agency',
    summary:
      'Develop and maintain web applications using modern technologies. Implement features from design to production and participate in code reviews.',
    details: [
      'Full-stack web application development',
      'API design and implementation',
      'Database optimization',
      'Testing and quality assurance',
      'Communication with stakeholders',
    ],
    tags: ['Web Development', 'Backend', 'Frontend', 'Databases'],
    images: ['/images/placeholder/exp2-1.jpg', '/images/placeholder/exp2-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-exp-3',
    title: 'Junior Developer',
    subtitle: 'Startup Company',
    summary:
      'Build features for web applications under mentorship. Learn best practices in code quality, testing, and collaborative development.',
    details: [
      'Frontend development and UI implementation',
      'Bug fixing and feature development',
      'Writing clean and maintainable code',
      'Learning from senior developers',
      'Participating in code reviews and team meetings',
    ],
    tags: ['Junior Developer', 'Learning', 'Web Development'],
    images: ['/images/placeholder/exp3-1.jpg', '/images/placeholder/exp3-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-exp-4',
    title: 'Internship - Software Development',
    subtitle: 'Tech Company',
    summary:
      'Gained practical experience in software development through real-world projects. Worked with experienced engineers and learned industry practices.',
    details: [
      'Assisted in development of production features',
      'Learned version control and collaboration tools',
      'Contributed to documentation and code quality',
      'Participated in team standup meetings',
      'Explored new technologies and frameworks',
    ],
    tags: ['Internship', 'Entry Level', 'Learning Experience'],
    images: ['/images/placeholder/exp4-1.jpg', '/images/placeholder/exp4-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-exp-5',
    title: 'Freelance Developer',
    subtitle: 'Self-Employed',
    summary:
      'Provided development services for various clients including web applications, websites, and custom solutions. Managed projects independently from conception to delivery.',
    details: [
      'Client communication and requirements gathering',
      'Full-stack development of custom solutions',
      'Project management and timeline estimation',
      'Deployment and maintenance',
      'Technical support and updates',
    ],
    tags: ['Freelance', 'Full Stack', 'Entrepreneurship'],
    images: ['/images/placeholder/exp5-1.jpg', '/images/placeholder/exp5-2.jpg'],
    startDate: 'Year',
    endDate: 'Year',
    isPlaceholder: true,
  },
]

export const skeletonOrganization: SkeletonItem[] = [
  {
    id: 'placeholder-org-1',
    title: 'Community Tech Meetup',
    subtitle: 'Organizer & Core Member',
    summary:
      'Organize monthly meetups bringing together local developers to share knowledge, network, and collaborate on projects.',
    details: [
      'Planning and scheduling regular meetups',
      'Coordinating speakers and presentations',
      'Building and managing community platform',
      'Growing community membership',
      'Facilitating networking opportunities',
    ],
    tags: ['Community', 'Leadership', 'Technology'],
    images: ['/images/placeholder/org1-1.jpg', '/images/placeholder/org1-2.jpg'],
    startDate: 'Year',
    endDate: 'Present',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-org-2',
    title: 'Open Source Project',
    subtitle: 'Maintainer & Contributor',
    summary:
      'Active contributor and maintainer of open source projects. Review pull requests, fix bugs, and implement new features.',
    details: [
      'Code review and quality management',
      'Bug fixes and feature implementation',
      'Community support and documentation',
      'Release management',
      'Mentoring new contributors',
    ],
    tags: ['Open Source', 'Development', 'Community'],
    images: ['/images/placeholder/org2-1.jpg', '/images/placeholder/org2-2.jpg'],
    startDate: 'Year',
    endDate: 'Present',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-org-3',
    title: 'Tech Education Initiative',
    subtitle: 'Curriculum Developer',
    summary:
      'Develop curriculum and teaching materials for technology education programs. Help students learn programming and web development.',
    details: [
      'Curriculum design and development',
      'Creating educational content',
      'Teaching and mentoring students',
      'Workshop organization',
      'Learning outcome assessment',
    ],
    tags: ['Education', 'Teaching', 'Technology'],
    images: ['/images/placeholder/org3-1.jpg', '/images/placeholder/org3-2.jpg'],
    startDate: 'Year',
    endDate: 'Present',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-org-4',
    title: 'Professional Association',
    subtitle: 'Member & Committee',
    summary:
      'Member of professional technology association. Participate in committees and contribute to industry standards and practices.',
    details: [
      'Attending professional conferences',
      'Contributing to industry discussions',
      'Committee work and advocacy',
      'Networking with peers',
      'Knowledge sharing and collaboration',
    ],
    tags: ['Professional', 'Networking', 'Industry'],
    images: ['/images/placeholder/org4-1.jpg', '/images/placeholder/org4-2.jpg'],
    startDate: 'Year',
    endDate: 'Present',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-org-5',
    title: 'Mentorship Program',
    subtitle: 'Mentor',
    summary:
      'Mentor aspiring developers and career professionals. Provide guidance on career development, technical skills, and professional growth.',
    details: [
      'One-on-one mentoring sessions',
      'Career guidance and planning',
      'Technical skills training',
      'Resume and interview preparation',
      'Long-term professional development',
    ],
    tags: ['Mentoring', 'Leadership', 'Development'],
    images: ['/images/placeholder/org5-1.jpg', '/images/placeholder/org5-2.jpg'],
    startDate: 'Year',
    endDate: 'Present',
    isPlaceholder: true,
  },
]

export const skeletonCertification: SkeletonItem[] = [
  {
    id: 'placeholder-cert-1',
    title: 'Cloud Architecture Certification',
    subtitle: 'Cloud Provider',
    summary:
      'Professional certification validating expertise in cloud infrastructure design, deployment, and management. Demonstrates proficiency in scalable cloud solutions.',
    details: [
      'Cloud infrastructure design patterns',
      'Security best practices',
      'Cost optimization strategies',
      'High availability and disaster recovery',
      'Performance tuning and monitoring',
    ],
    tags: ['Cloud', 'Architecture', 'Professional'],
    images: ['/images/placeholder/cert1-1.jpg', '/images/placeholder/cert1-2.jpg'],
    startDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-cert-2',
    title: 'DevOps Engineer Certification',
    subtitle: 'Industry Association',
    summary:
      'Certification demonstrating proficiency in DevOps practices, CI/CD pipelines, and infrastructure automation. Validates modern development operations skills.',
    details: [
      'CI/CD pipeline design and implementation',
      'Infrastructure as Code',
      'Container orchestration',
      'Monitoring and logging',
      'Automation and scripting',
    ],
    tags: ['DevOps', 'Automation', 'Professional'],
    images: ['/images/placeholder/cert2-1.jpg', '/images/placeholder/cert2-2.jpg'],
    startDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-cert-3',
    title: 'Web Development Specialization',
    subtitle: 'Online Learning Platform',
    summary:
      'Comprehensive specialization covering modern web development technologies and practices. Includes practical projects and real-world applications.',
    details: [
      'Frontend frameworks and libraries',
      'Backend development and APIs',
      'Database design and management',
      'Performance optimization',
      'Security and authentication',
    ],
    tags: ['Web Development', 'Full Stack', 'Learning'],
    images: ['/images/placeholder/cert3-1.jpg', '/images/placeholder/cert3-2.jpg'],
    startDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-cert-4',
    title: 'Security Fundamentals',
    subtitle: 'Technology Training Institute',
    summary:
      'Training in fundamental cybersecurity practices and secure application development. Essential knowledge for building secure systems.',
    details: [
      'Security principles and concepts',
      'Secure coding practices',
      'Authentication and authorization',
      'Data protection and encryption',
      'Vulnerability assessment',
    ],
    tags: ['Security', 'Development', 'Training'],
    images: ['/images/placeholder/cert4-1.jpg', '/images/placeholder/cert4-2.jpg'],
    startDate: 'Year',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-cert-5',
    title: 'Leadership and Management',
    subtitle: 'Professional Development Center',
    summary:
      'Certification in technical leadership and team management. Develops skills for leading technical teams and managing projects effectively.',
    details: [
      'Team leadership and motivation',
      'Project management methodologies',
      'Technical decision making',
      'Conflict resolution',
      'Performance management',
    ],
    tags: ['Leadership', 'Management', 'Professional'],
    images: ['/images/placeholder/cert5-1.jpg', '/images/placeholder/cert5-2.jpg'],
    startDate: 'Year',
    isPlaceholder: true,
  },
]

export const getSkeletonData = (category: string): SkeletonItem[] => {
  const skeletonMap: { [key: string]: SkeletonItem[] } = {
    education: skeletonEducation,
    experience: skeletonExperience,
    organization: skeletonOrganization,
    certification: skeletonCertification,
  }
  return skeletonMap[category] || []
}
