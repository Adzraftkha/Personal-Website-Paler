// Portfolio Data - Static structure for all portfolio content
// Update this file to customize your portfolio

export interface SupportingDocument {
  id: string
  title: string
  type: 'pdf' | 'youtube'
  url: string
}

export interface IEducation {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
  tags: string[]
  images: string[]
  supportingDocuments?: SupportingDocument[]
  volunteering?: IVolunteering[]
  achievements?: IAchievement[]
}

export interface IExperience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
  tags: string[]
  images: string[]
  pdf?: string
  supportingDocuments?: SupportingDocument[]
}

export interface IOrganization {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  tags: string[]
  images: string[]
  supportingDocuments?: SupportingDocument[]
}

export interface ICertification {
  id: string
  title: string
  issuer: string
  issueDate: string
  expirationDate?: string
  credentialId?: string
  credentialUrl?: string
  description: string
  tags: string[]
  images: string[]
  skills?: string[]
  pdf?: string
  supportingDocuments?: SupportingDocument[]
  group?: string
}

export interface IVolunteering {
  id: string
  organization: string
  role: string
  startDate: string
  endDate: string
  cause: string
  description: string
  impact: string[]
  tags: string[]
  images: string[]
}

export interface IAchievement {
  id: string
  title: string
  date: string
  category: string
  description: string
  details: string[]
  tags: string[]
  images: string[]
  externalLink?: string
}

export interface IPortfolioData {
  profile: {
    name: string
    title: string
    bio: string
    profileImage: string
  }
  education: IEducation[]
  experience: IExperience[]
  organization: IOrganization[]
  certification: ICertification[]
  volunteering: IVolunteering[]
  achievement: IAchievement[]
}

// Sample data - Replace with your own
export const portfolioData: IPortfolioData = {
  profile: {
    name: "Farell Elghifari Putratama",
    title: "Multidisciplinary Engineer & Business Leader",
    bio: "Engineering professional with cross-disciplinary expertise spanning naval architecture, energy systems, and business operations. Combining technical acumen with entrepreneurial leadership to deliver impactful solutions across industries.",
    profileImage: "/images/profile.jpg",
  },
  education: [
    {
      id: "edu-1",
      school: "Bandung Institute of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2018",
      endDate: "2022",
      description: "Specialized in software engineering, web development, and data structures with focus on practical applications.",
      tags: ["Computer Science", "Web Dev", "Algorithms", "Software Engineering"],
      images: ["/images/education/edu-1/img1.jpg", "/images/education/edu-1/img2.jpg", "/images/education/edu-1/img3.jpg"],
      supportingDocuments: [
        {
          id: "doc-edu-1-1",
          title: "Degree Certificate",
          type: "pdf",
          url: "/documents/education/degree-certificate.pdf"
        },
        {
          id: "doc-edu-1-2",
          title: "Capstone Project Presentation",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          id: "doc-edu-1-3",
          title: "Academic Transcript",
          type: "pdf",
          url: "/documents/education/transcript.pdf"
        }
      ],
      volunteering: [
        {
          id: "vol-1",
          organization: "Code for Social Good",
          role: "Lead Developer",
          startDate: "2021",
          endDate: "Present",
          cause: "Social Impact",
          description: "Developing web applications to help non-profits achieve their missions.",
          impact: [
            "Developed 5 applications for non-profit organizations",
            "Helped 20+ organizations streamline operations",
            "Donated 500+ hours of technical expertise",
            "Trained 30+ volunteers in web development",
            "Impacted 100K+ beneficiaries through applications",
          ],
          tags: ["Volunteering", "Social Impact", "Web Development"],
          images: ["/images/volunteering/vol-1/img1.jpg"],
        },
        {
          id: "vol-2",
          organization: "Youth Tech Mentorship",
          role: "Lead Mentor",
          startDate: "2022",
          endDate: "Present",
          cause: "Education",
          description: "Mentoring high school and college students interested in pursuing tech careers.",
          impact: [
            "Mentored 50+ young developers",
            "Helped 15 students land their first tech jobs",
            "Created learning curriculum for 200+ students",
            "Organized 10+ workshops and seminars",
            "Established scholarship fund raising $50K",
          ],
          tags: ["Mentoring", "Education", "Youth Development"],
          images: ["/images/volunteering/vol-2/img1.jpg"],
        },
      ],
      achievements: [
        {
          id: "ach-1",
          title: "Dean's List Recognition",
          date: "2021",
          category: "Academic Excellence",
          description: "Recognized for outstanding academic performance and research contributions.",
          details: [
            "Maintained 3.8+ GPA throughout program",
            "Published research paper on web optimization",
            "Awarded scholarship for academic excellence",
            "Selected as student mentor for incoming cohort",
          ],
          tags: ["Academic", "Achievement", "Recognition"],
          images: ["/images/achievement/ach-1/award.jpg"],
        },
        {
          id: "ach-2",
          title: "Best Capstone Project Award",
          date: "2022",
          category: "Project Excellence",
          description: "Won award for innovative capstone project in web technology category.",
          details: [
            "Built real-time collaborative web platform",
            "Received first place among 50+ projects",
            "Featured in university tech showcase",
            "Later commercialized as successful startup",
          ],
          tags: ["Project", "Innovation", "Award"],
          images: ["/images/achievement/ach-2/award.jpg"],
        },
      ],
    },
    {
      id: "edu-2",
      school: "Full Stack Development Bootcamp",
      degree: "Certificate",
      field: "Full Stack Web Development",
      startDate: "2022",
      endDate: "2023",
      description: "Intensive bootcamp focusing on modern web development stack and industry best practices with hands-on projects.",
      tags: ["React", "Node.js", "MongoDB", "Express.js"],
      images: ["/images/education/edu-2/img1.jpg"],
      supportingDocuments: [
        {
          id: "doc-edu-2-1",
          title: "Bootcamp Certificate",
          type: "pdf",
          url: "/documents/education/bootcamp-certificate.pdf"
        },
        {
          id: "doc-edu-2-2",
          title: "Capstone Project Demo",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          id: "doc-edu-2-3",
          title: "Skill Assessment Results",
          type: "pdf",
          url: "/documents/education/skill-assessment.pdf"
        }
      ],
      volunteering: [
        {
          id: "vol-3",
          organization: "Women in Tech Initiative",
          role: "Program Coordinator",
          startDate: "2021",
          endDate: "Present",
          cause: "Diversity & Inclusion",
          description: "Supporting and promoting women in technology through mentorship and community programs.",
          impact: [
            "Coordinated programs for 500+ women developers",
            "Connected 100+ mentors with mentees",
            "Organized annual conference with 1000+ attendees",
            "Helped 40+ women transition into tech roles",
            "Raised awareness through 20+ social campaigns",
          ],
          tags: ["Diversity", "Women in Tech", "Inclusion"],
          images: ["/images/volunteering/vol-3/img1.jpg"],
        },
        {
          id: "vol-4",
          organization: "Digital Literacy Program",
          role: "Curriculum Developer",
          startDate: "2023",
          endDate: "Present",
          cause: "Digital Inclusion",
          description: "Creating and delivering digital literacy programs for underserved communities.",
          impact: [
            "Taught digital skills to 300+ community members",
            "Created curriculum for 5 different skill levels",
            "Achieved 90% completion rate",
            "Helped 80+ people find employment",
            "Expanded program to 3 additional communities",
          ],
          tags: ["Digital Literacy", "Community Service", "Education"],
          images: ["/images/volunteering/vol-4/img1.jpg"],
        },
      ],
      achievements: [
        {
          id: "ach-3",
          title: "Bootcamp Valedictorian",
          date: "2023",
          category: "Academic Excellence",
          description: "Graduated as top student with perfect attendance and highest project scores.",
          details: [
            "Graduated top 1% of cohort",
            "Completed all projects with A+ grades",
            "Selected to be teaching assistant",
            "Landed job offer before graduation",
          ],
          tags: ["Bootcamp", "Excellence", "Achievement"],
          images: ["/images/achievement/ach-3/award.jpg"],
        },
        {
          id: "ach-4",
          title: "Best Capstone Application",
          date: "2023",
          category: "Project Excellence",
          description: "Developed an innovative project management application used by bootcamp alumni.",
          details: [
            "Built full-stack project management tool",
            "Won bootcamp capstone competition",
            "Used by 500+ bootcamp alumni",
            "Attracted investor interest",
          ],
          tags: ["Project", "Application", "Innovation"],
          images: ["/images/achievement/ach-4/award.jpg"],
        },
      ],
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      startDate: "2023",
      endDate: "Present",
      description: "Leading development of scalable web applications and mentoring junior developers.",
      achievements: [
        "Architected microservices infrastructure reducing latency by 45%",
        "Led team of 6 developers on 3 major product releases",
        "Implemented CI/CD pipeline reducing deployment time by 70%",
        "Improved application performance and reduced server costs",
        "Mentored 4 junior developers resulting in 2 promotions",
      ],
      tags: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "Docker"],
      images: ["/images/experience/exp-1/img1.jpg", "/images/experience/exp-1/img2.jpg", "/images/experience/exp-1/img3.jpg"],
      supportingDocuments: [
        {
          id: "doc-exp-1-1",
          title: "Architecture Documentation",
          type: "pdf",
          url: "/documents/experience/architecture-doc.pdf"
        },
        {
          id: "doc-exp-1-2",
          title: "Team Project Walkthrough",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ],
    },
    {
      id: "exp-2",
      company: "Digital Solutions Ltd.",
      position: "Full Stack Developer",
      startDate: "2022",
      endDate: "2023",
      description: "Developed and maintained web applications for enterprise clients using modern tech stack.",
      achievements: [
        "Built 5+ full-stack web applications from scratch",
        "Improved code quality by implementing unit tests and type safety",
        "Optimized database queries improving app speed by 35%",
        "Collaborated with UI/UX team to enhance user experience",
        "Maintained 99.5% uptime for production applications",
      ],
      tags: ["React", "Express.js", "PostgreSQL", "JavaScript", "REST API"],
      images: ["/images/experience/exp-2/img1.jpg", "/images/experience/exp-2/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-exp-2-1",
          title: "Project Case Study",
          type: "pdf",
          url: "/documents/experience/project-case-study.pdf"
        },
      ],
    },
    {
      id: "exp-3",
      company: "StartUp Hub",
      position: "Frontend Developer",
      startDate: "2021",
      endDate: "2022",
      description: "Developed responsive web interfaces for multiple mobile and web applications.",
      achievements: [
        "Created responsive UI components used across 3 applications",
        "Reduced bundle size by 40% through code optimization",
        "Implemented accessibility features improving WCAG compliance",
        "Worked in agile environment with 2-week sprints",
        "Mentored 1 junior frontend developer",
      ],
      tags: ["React", "Tailwind CSS", "JavaScript", "Figma", "Git"],
      images: ["/images/experience/exp-3/img1.jpg"],
      supportingDocuments: [
        {
          id: "doc-exp-3-1",
          title: "UI Component Library",
          type: "pdf",
          url: "/documents/experience/component-library.pdf"
        },
      ],
    },
    {
      id: "exp-4",
      company: "Freelance Projects",
      position: "Independent Full Stack Developer",
      startDate: "2020",
      endDate: "2021",
      description: "Developed custom web solutions for various clients with specific business requirements.",
      achievements: [
        "Successfully delivered 8 complete web projects",
        "Maintained 100% client satisfaction rating",
        "Built e-commerce platform generating $50K+ in sales",
        "Created blog platform with 1000+ monthly visitors",
        "Developed payment integration systems for 3 clients",
      ],
      tags: ["Next.js", "Stripe", "MongoDB", "Firebase", "Vercel"],
      images: ["/images/experience/exp-4/img1.jpg", "/images/experience/exp-4/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-exp-4-1",
          title: "E-Commerce Platform Demo",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
          id: "doc-exp-4-2",
          title: "Project Portfolio",
          type: "pdf",
          url: "/documents/experience/freelance-portfolio.pdf"
        },
      ],
    },
    {
      id: "exp-5",
      company: "Web Agency Internship",
      position: "Junior Web Developer",
      startDate: "2020",
      endDate: "2020",
      description: "Assisted in development of web projects and learned industry best practices.",
      achievements: [
        "Assisted in development of 4 client websites",
        "Learned version control and team collaboration",
        "Fixed 50+ bugs and improved code quality",
        "Participated in daily stand-ups and code reviews",
        "Got offered full-time position after internship",
      ],
      tags: ["HTML", "CSS", "jQuery", "PHP", "MySQL"],
      images: ["/images/experience/exp-5/img1.jpg", "/images/experience/exp-5/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-exp-5-1",
          title: "Internship Certificate",
          type: "pdf",
          url: "/documents/experience/internship-certificate.pdf"
        },
      ],
    },
  ],
  organization: [
    {
      id: "org-1",
      name: "JavaScript Community Indonesia",
      role: "Core Member & Event Organizer",
      startDate: "2021",
      endDate: "Present",
      description: "Active member organizing monthly meetups and conferences for local JavaScript developers.",
      responsibilities: [
        "Organized 12+ community meetups with 500+ attendees",
        "Managed conference with 2000+ participants",
        "Coordinated speaker logistics and content",
        "Maintained community GitHub organization",
        "Grew community from 500 to 5000+ members",
      ],
      tags: ["Community", "JavaScript", "Organizing", "Mentoring"],
      images: ["/images/organization/org-1/img1.jpg", "/images/organization/org-1/img2.jpg", "/images/organization/org-1/img3.jpg"],
      supportingDocuments: [
        {
          id: "doc-org-1-1",
          title: "Conference Highlights",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
      ],
    },
    {
      id: "org-2",
      name: "Open Source Foundation",
      role: "Contributor & Code Reviewer",
      startDate: "2021",
      endDate: "Present",
      description: "Active contributor to several popular open-source projects with thousands of stars.",
      responsibilities: [
        "Contributed 50+ pull requests to major projects",
        "Reviewed and merged 100+ community contributions",
        "Fixed critical bugs in 5 major libraries",
        "Mentored new contributors in best practices",
        "Maintained active role in project governance",
      ],
      tags: ["Open Source", "GitHub", "Community", "React"],
      images: ["/images/organization/org-2/img1.jpg", "/images/organization/org-2/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-org-2-1",
          title: "GitHub Contribution Report",
          type: "pdf",
          url: "/documents/organization/github-report.pdf"
        },
        {
          id: "doc-org-2-2",
          title: "Community Talk: Open Source Best Practices",
          type: "youtube",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ],
    },
    {
      id: "org-3",
      name: "Tech Education Initiative",
      role: "Curriculum Developer & Instructor",
      startDate: "2022",
      endDate: "Present",
      description: "Developed and taught curriculum for web development bootcamp.",
      responsibilities: [
        "Created curriculum for 6-month bootcamp program",
        "Taught 4 cohorts with 100+ students",
        "Achieved 95% graduation rate and job placement",
        "Developed 20+ coding projects and exercises",
        "Maintained mentorship relationships with alumni",
      ],
      tags: ["Education", "Teaching", "Curriculum", "Web Development"],
      images: ["/images/organization/org-3/img1.jpg", "/images/organization/org-3/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-org-3-1",
          title: "Curriculum Overview",
          type: "pdf",
          url: "/documents/organization/curriculum.pdf"
        },
      ],
    },
    {
      id: "org-4",
      name: "DevTools Collective",
      role: "Product Advisor",
      startDate: "2023",
      endDate: "Present",
      description: "Advisory board member providing product guidance for developer tools startup.",
      responsibilities: [
        "Advised on product roadmap and features",
        "Conducted user interviews with 50+ developers",
        "Provided technical guidance on implementation",
        "Connected startup with investor network",
        "Helped achieve 10K+ active users",
      ],
      tags: ["Advising", "Product", "Startups", "DevTools"],
      images: ["/images/organization/org-4/img1.jpg", "/images/organization/org-4/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-org-4-1",
          title: "Product Case Study",
          type: "pdf",
          url: "/documents/organization/devtools-case-study.pdf"
        },
      ],
    },
    {
      id: "org-5",
      name: "Web Standards Working Group",
      role: "Participant & Contributor",
      startDate: "2023",
      endDate: "Present",
      description: "Participant in discussions and contributions to web platform standards.",
      responsibilities: [
        "Attended 8+ working group meetings",
        "Proposed 2 new web standards proposals",
        "Contributed feedback on emerging technologies",
        "Engaged with W3C members on specifications",
        "Documented best practices for community",
      ],
      tags: ["Web Standards", "W3C", "HTML", "CSS"],
      images: ["/images/organization/org-5/img1.jpg", "/images/organization/org-5/img2.jpg"],
      supportingDocuments: [
        {
          id: "doc-org-5-1",
          title: "W3C Specifications",
          type: "pdf",
          url: "/documents/organization/w3c-specs.pdf"
        },
      ],
    },
  ],
  certification: [
    // 1. Engineering & Energy Systems
    {
      id: "cert-1",
      title: "Basic–Intermediate Piping Stress Analysis (CAESAR II & Pipe Data Pro)",
      issuer: "Engineering Institute",
      issueDate: "2023",
      description: "Comprehensive training in piping stress analysis using industry-standard software for pressure equipment and piping systems.",
      tags: ["Piping", "Stress Analysis", "CAESAR II"],
      group: "Engineering & Energy Systems",
      images: ["/images/certification/cert-1/badge.jpg"],
      skills: ["CAESAR II", "Pipe Data Pro", "Stress Analysis", "Piping Design"],
      supportingDocuments: [
        {
          id: "doc-cert-1-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-1.pdf"
        },
      ],
    },
    {
      id: "cert-2",
      title: "Geothermal Power Plant Performance Analysis",
      issuer: "Energy Academy",
      issueDate: "2023",
      description: "Advanced course on analyzing and optimizing geothermal power plant performance and efficiency metrics.",
      tags: ["Geothermal", "Power Plants", "Performance Analysis"],
      group: "Engineering & Energy Systems",
      images: ["/images/certification/cert-2/badge.jpg"],
      skills: ["Geothermal Systems", "Performance Analysis", "Energy Efficiency"],
      supportingDocuments: [
        {
          id: "doc-cert-2-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-2.pdf"
        },
      ],
    },
    {
      id: "cert-3",
      title: "Introduction to Ocean and Geothermal Energy",
      issuer: "Renewable Energy Institute",
      issueDate: "2023",
      description: "Foundational course exploring ocean energy resources and geothermal energy conversion technologies.",
      tags: ["Ocean Energy", "Geothermal", "Renewable Energy"],
      group: "Engineering & Energy Systems",
      images: ["/images/certification/cert-3/badge.jpg"],
      skills: ["Ocean Energy", "Geothermal Energy", "Renewable Technology"],
      supportingDocuments: [
        {
          id: "doc-cert-3-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-3.pdf"
        },
      ],
    },
    {
      id: "cert-4",
      title: "Fundamentals of Geothermal Energy",
      issuer: "Geological Society",
      issueDate: "2023",
      description: "Core principles of geothermal energy systems, resources, and applications in power generation and heating.",
      tags: ["Geothermal", "Energy Systems", "Fundamentals"],
      group: "Engineering & Energy Systems",
      images: ["/images/certification/cert-4/badge.jpg"],
      skills: ["Geothermal Resources", "Energy Conversion", "Thermal Engineering"],
      supportingDocuments: [
        {
          id: "doc-cert-4-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-4.pdf"
        },
      ],
    },
    {
      id: "cert-5",
      title: "Petroleum Engineering: Specialization",
      issuer: "University of Energy Studies",
      issueDate: "2023",
      description: "Comprehensive specialization covering petroleum extraction, production, and downstream processing technologies.",
      tags: ["Petroleum", "Engineering", "Oil & Gas"],
      group: "Engineering & Energy Systems",
      images: ["/images/certification/cert-5/badge.jpg"],
      skills: ["Petroleum Systems", "Drilling", "Production", "Reservoir Engineering"],
      supportingDocuments: [
        {
          id: "doc-cert-5-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-5.pdf"
        },
      ],
    },
    {
      id: "cert-6",
      title: "IWCF Level 1 – Well Control Awareness",
      issuer: "International Well Control Forum",
      issueDate: "2023",
      description: "Certification in well control awareness and procedures essential for offshore and onshore drilling operations safety.",
      tags: ["Well Control", "Safety", "Drilling"],
      group: "Engineering & Energy Systems",
      images: ["/images/certification/cert-6/badge.jpg"],
      skills: ["Well Control", "Safety Procedures", "Drilling Safety"],
      supportingDocuments: [
        {
          id: "doc-cert-6-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-6.pdf"
        },
      ],
    },

    // 2. Safety, Quality & Compliance
    {
      id: "cert-7",
      title: "Ahli K3 Umum (BNSP)",
      issuer: "Badan Nasional Sertifikasi Profesi",
      issueDate: "2023",
      description: "Indonesian national certification in general occupational safety and health, recognized by BNSP.",
      tags: ["Safety", "K3", "Compliance"],
      group: "Safety, Quality & Compliance",
      images: ["/images/certification/cert-7/badge.jpg"],
      skills: ["Occupational Safety", "Health Management", "Risk Assessment"],
      supportingDocuments: [
        {
          id: "doc-cert-7-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-7.pdf"
        },
      ],
    },
    {
      id: "cert-8",
      title: "ISO 45001:2018",
      issuer: "Quality Assurance International",
      issueDate: "2023",
      description: "Certification in occupational health and safety management systems based on ISO 45001:2018 standard.",
      tags: ["ISO 45001", "Safety", "Management Systems"],
      group: "Safety, Quality & Compliance",
      images: ["/images/certification/cert-8/badge.jpg"],
      skills: ["ISO 45001", "Safety Management", "Compliance"],
      supportingDocuments: [
        {
          id: "doc-cert-8-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-8.pdf"
        },
      ],
    },
    {
      id: "cert-9",
      title: "ISO 9001:2015",
      issuer: "Quality Management Institute",
      issueDate: "2023",
      description: "Certification demonstrating expertise in quality management systems according to ISO 9001:2015 standards.",
      tags: ["ISO 9001", "Quality", "Management Systems"],
      group: "Safety, Quality & Compliance",
      images: ["/images/certification/cert-9/badge.jpg"],
      skills: ["Quality Management", "Process Improvement", "ISO Compliance"],
      supportingDocuments: [
        {
          id: "doc-cert-9-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-9.pdf"
        },
      ],
    },
    {
      id: "cert-10",
      title: "SMK3 PP No. 50 Tahun 2012",
      issuer: "Indonesian Ministry of Labor",
      issueDate: "2023",
      description: "Certification in occupational safety and health management system based on Indonesian government regulation.",
      tags: ["SMK3", "Safety", "Indonesian Standards"],
      group: "Safety, Quality & Compliance",
      images: ["/images/certification/cert-10/badge.jpg"],
      skills: ["Indonesian Safety Standards", "Management Systems", "Compliance"],
      supportingDocuments: [
        {
          id: "doc-cert-10-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-10.pdf"
        },
      ],
    },

    // 3. Project, Supply Chain & Operations
    {
      id: "cert-11",
      title: "Google Project Management: Specialization",
      issuer: "Google Career Certificates",
      issueDate: "2023",
      description: "Comprehensive project management specialization covering planning, execution, and delivery methodologies.",
      tags: ["Project Management", "Google", "Leadership"],
      group: "Project, Supply Chain & Operations",
      images: ["/images/certification/cert-11/badge.jpg"],
      skills: ["Project Planning", "Team Management", "Agile Methodology"],
      supportingDocuments: [
        {
          id: "doc-cert-11-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-11.pdf"
        },
      ],
    },
    {
      id: "cert-12",
      title: "Procurement Management",
      issuer: "Supply Chain Institute",
      issueDate: "2023",
      description: "Professional certification in procurement strategies, vendor management, and supply chain optimization.",
      tags: ["Procurement", "Supply Chain", "Operations"],
      group: "Project, Supply Chain & Operations",
      images: ["/images/certification/cert-12/badge.jpg"],
      skills: ["Vendor Management", "Procurement Strategy", "Cost Optimization"],
      supportingDocuments: [
        {
          id: "doc-cert-12-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-12.pdf"
        },
      ],
    },
    {
      id: "cert-13",
      title: "Purchasing Management",
      issuer: "Operations Management School",
      issueDate: "2023",
      description: "Certification covering purchasing strategies, supplier relationships, and procurement process optimization.",
      tags: ["Purchasing", "Supply Chain", "Management"],
      group: "Project, Supply Chain & Operations",
      images: ["/images/certification/cert-13/badge.jpg"],
      skills: ["Purchasing Strategy", "Supplier Relations", "Procurement"],
      supportingDocuments: [
        {
          id: "doc-cert-13-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-13.pdf"
        },
      ],
    },
    {
      id: "cert-14",
      title: "Warehouse Management",
      issuer: "Logistics Training Center",
      issueDate: "2023",
      description: "Professional training in warehouse operations, inventory control, and logistics management systems.",
      tags: ["Warehouse", "Logistics", "Operations"],
      group: "Project, Supply Chain & Operations",
      images: ["/images/certification/cert-14/badge.jpg"],
      skills: ["Warehouse Operations", "Inventory Control", "Logistics"],
      supportingDocuments: [
        {
          id: "doc-cert-14-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-14.pdf"
        },
      ],
    },
    {
      id: "cert-15",
      title: "Inventory Management",
      issuer: "Supply Chain Academy",
      issueDate: "2023",
      description: "Certification in inventory control, stock management, and optimization of supply chain resources.",
      tags: ["Inventory", "Supply Chain", "Operations"],
      group: "Project, Supply Chain & Operations",
      images: ["/images/certification/cert-15/badge.jpg"],
      skills: ["Inventory Control", "Stock Management", "Supply Chain"],
      supportingDocuments: [
        {
          id: "doc-cert-15-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-15.pdf"
        },
      ],
    },

    // 4. Digital & Technical Tools (Supporting)
    {
      id: "cert-16",
      title: "HTML & CSS Fundamentals",
      issuer: "Web Development Academy",
      issueDate: "2023",
      description: "Foundational course covering HTML markup and CSS styling for responsive web design and development.",
      tags: ["HTML", "CSS", "Web Development"],
      group: "Digital & Technical Tools",
      images: ["/images/certification/cert-16/badge.jpg"],
      skills: ["HTML", "CSS", "Responsive Design"],
      supportingDocuments: [
        {
          id: "doc-cert-16-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-16.pdf"
        },
      ],
    },
    {
      id: "cert-17",
      title: "Git Fundamentals",
      issuer: "Version Control Institute",
      issueDate: "2023",
      description: "Essential training in Git version control, branching strategies, and collaborative development practices.",
      tags: ["Git", "Version Control", "Development Tools"],
      group: "Digital & Technical Tools",
      images: ["/images/certification/cert-17/badge.jpg"],
      skills: ["Git", "Version Control", "Collaboration"],
      supportingDocuments: [
        {
          id: "doc-cert-17-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-17.pdf"
        },
      ],
    },
    {
      id: "cert-18",
      title: "JavaScript Fundamentals",
      issuer: "JavaScript Academy",
      issueDate: "2023",
      description: "Core concepts of JavaScript programming including variables, functions, DOM manipulation, and ES6 features.",
      tags: ["JavaScript", "Web Development", "Programming"],
      group: "Digital & Technical Tools",
      images: ["/images/certification/cert-18/badge.jpg"],
      skills: ["JavaScript", "DOM", "ES6", "Web Development"],
      supportingDocuments: [
        {
          id: "doc-cert-18-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-18.pdf"
        },
      ],
    },

    // 5. Language & Communication
    {
      id: "cert-19",
      title: "TOEFL",
      issuer: "Educational Testing Service",
      issueDate: "2023",
      description: "Test of English as a Foreign Language certification demonstrating English proficiency for academic and professional contexts.",
      tags: ["TOEFL", "English", "Language"],
      group: "Language & Communication",
      images: ["/images/certification/cert-19/badge.jpg"],
      skills: ["English", "Communication", "Academic Writing"],
      supportingDocuments: [
        {
          id: "doc-cert-19-1",
          title: "Certificate",
          type: "pdf",
          url: "/documents/certifications/cert-19.pdf"
        },
      ],
    },
  ],
  volunteering: [
    {
      id: "vol-1",
      organization: "Code for Social Good",
      role: "Lead Developer",
      startDate: "2021",
      endDate: "Present",
      cause: "Social Impact",
      description: "Developing web applications to help non-profits and social organizations achieve their missions.",
      impact: [
        "Developed 5 applications for non-profit organizations",
        "Helped 20+ organizations streamline operations",
        "Donated 500+ hours of technical expertise",
        "Trained 30+ volunteers in web development",
        "Impacted 100K+ beneficiaries through applications",
      ],
      tags: ["Volunteering", "Social Impact", "Web Development"],
      images: ["/images/volunteering/vol-1/img1.jpg", "/images/volunteering/vol-1/img2.jpg"],
    },
    {
      id: "vol-2",
      organization: "Youth Tech Mentorship",
      role: "Lead Mentor",
      startDate: "2022",
      endDate: "Present",
      cause: "Education",
      description: "Mentoring high school and college students interested in pursuing tech careers.",
      impact: [
        "Mentored 50+ young developers",
        "Helped 15 students land their first tech jobs",
        "Created learning curriculum for 200+ students",
        "Organized 10+ workshops and seminars",
        "Established scholarship fund raising $50K",
      ],
      tags: ["Mentoring", "Education", "Youth Development"],
      images: ["/images/volunteering/vol-2/img1.jpg", "/images/volunteering/vol-2/img2.jpg", "/images/volunteering/vol-2/img3.jpg"],
    },
    {
      id: "vol-3",
      organization: "Women in Tech Initiative",
      role: "Program Coordinator",
      startDate: "2021",
      endDate: "Present",
      cause: "Diversity & Inclusion",
      description: "Supporting and promoting women in technology through mentorship and community programs.",
      impact: [
        "Coordinated programs for 500+ women developers",
        "Connected 100+ mentors with mentees",
        "Organized annual conference with 1000+ attendees",
        "Helped 40+ women transition into tech roles",
        "Raised awareness through 20+ social campaigns",
      ],
      tags: ["Diversity", "Women in Tech", "Inclusion"],
      images: ["/images/volunteering/vol-3/img1.jpg"],
    },
    {
      id: "vol-4",
      organization: "Digital Literacy Program",
      role: "Curriculum Developer",
      startDate: "2023",
      endDate: "Present",
      cause: "Digital Inclusion",
      description: "Creating and delivering digital literacy programs for underserved communities.",
      impact: [
        "Taught digital skills to 300+ community members",
        "Created curriculum for 5 different skill levels",
        "Achieved 90% completion rate",
        "Helped 80+ people find employment",
        "Expanded program to 3 additional communities",
      ],
      tags: ["Digital Literacy", "Community Service", "Education"],
      images: ["/images/volunteering/vol-4/img1.jpg"],
    },
    {
      id: "vol-5",
      organization: "Environmental Tech Solutions",
      role: "Volunteer Developer",
      startDate: "2022",
      endDate: "2024",
      cause: "Environmental",
      description: "Building web applications to track and reduce environmental impact.",
      impact: [
        "Developed carbon tracking web application",
        "Used by 500+ organizations for sustainability",
        "Helped reduce reported carbon emissions by 1000+ tons",
        "Created educational content on climate tech",
        "Collaborated with 10+ environmental NGOs",
      ],
      tags: ["Environment", "Sustainability", "Tech for Good"],
      images: ["/images/volunteering/vol-5/img1.jpg"],
    },
  ],
  achievement: [
    {
      id: "ach-1",
      title: "Developer of the Year 2024",
      date: "2024",
      category: "Awards",
      description: "Recognized by Tech Community Indonesia for outstanding contributions to web development and open source.",
      details: [
        "Selected from 500+ nominees",
        "Recognized for innovation and community leadership",
        "Featured in major tech publications",
        "Received award at annual tech summit",
        "Joined hall of fame with previous winners",
      ],
      tags: ["Award", "Recognition", "Developer Excellence"],
      images: ["/images/achievement/ach-1/award.jpg"],
      externalLink: "https://example.com/award",
    },
    {
      id: "ach-2",
      title: "Open Source Contributor of the Month",
      date: "2023",
      category: "Open Source",
      description: "Honored 6 times for significant contributions to popular open source projects.",
      details: [
        "Contributed 50+ merged pull requests",
        "Fixed critical security vulnerabilities",
        "Improved project performance by 30%",
        "Mentored 10+ new contributors",
        "Featured in project documentation and social media",
      ],
      tags: ["Open Source", "Contributions", "Recognition"],
      images: ["/images/achievement/ach-2/award.jpg"],
      externalLink: "https://github.com",
    },
    {
      id: "ach-3",
      title: "Fastest Growing Tech Influencer",
      date: "2024",
      category: "Social Impact",
      description: "Recognized as fastest growing tech content creator with 100K+ followers across platforms.",
      details: [
        "Grew audience from 0 to 100K in 18 months",
        "Published 200+ educational content pieces",
        "Reached 5M+ monthly views",
        "Launched successful online course with 5K+ students",
        "Built engaged community of developers",
      ],
      tags: ["Influencer", "Content Creation", "Community"],
      images: ["/images/achievement/ach-3/award.jpg"],
      externalLink: "https://twitter.com",
    },
    {
      id: "ach-4",
      title: "Hackathon Winner - National Tournament",
      date: "2023",
      category: "Competition",
      description: "Won first place in prestigious national hackathon with innovative tech solution.",
      details: [
        "Competed against 200+ teams",
        "Built AI-powered web application in 48 hours",
        "Received $50K prize",
        "Solution adopted by corporate sponsor",
        "Featured in tech news and media coverage",
      ],
      tags: ["Hackathon", "Competition", "Innovation"],
      images: ["/images/achievement/ach-4/award.jpg"],
      externalLink: "https://hackathon.example.com",
    },
    {
      id: "ach-5",
      title: "Published Tech Book Author",
      date: "2024",
      category: "Publications",
      description: "Published comprehensive guide on modern web development practices.",
      details: [
        "Wrote 400+ page technical book",
        "Published by major tech publisher",
        "Sold 10K+ copies worldwide",
        "5-star rating on review platforms",
        "Translated into 3 languages",
      ],
      tags: ["Author", "Publishing", "Education"],
      images: ["/images/achievement/ach-5/award.jpg"],
      externalLink: "https://amazon.com",
    },
  ],
}

// Helper function to get item by ID
export const getItemById = (category: string, id: string) => {
  const categoryKey = category as keyof Omit<IPortfolioData, "profile">
  if (categoryKey === "education" || categoryKey === "experience" || categoryKey === "organization" || categoryKey === "certification" || categoryKey === "volunteering" || categoryKey === "achievement") {
    return portfolioData[categoryKey].find((item: any) => item.id === id)
  }
  return null
}

// Get all items in a category
export const getCategoryItems = (category: string) => {
  const categoryKey = category as keyof Omit<IPortfolioData, "profile">
  if (categoryKey === "education" || categoryKey === "experience" || categoryKey === "organization" || categoryKey === "certification" || categoryKey === "volunteering" || categoryKey === "achievement") {
    return portfolioData[categoryKey]
  }
  return []
}
