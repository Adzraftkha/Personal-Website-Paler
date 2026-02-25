// Contact Information - Personal details and social media links

export interface ISocialLink {
  platform: string
  url: string
  icon: string // lucide-react icon name
  label: string
}

export interface IContactInfo {
  email: string
  phone: string
  location: string
  timezone: string
  bio: string
  profileImage: string
  socialLinks: ISocialLink[]
}

// Update with your actual contact information
export const contactInfo: IContactInfo = {
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  timezone: "PST (UTC-8)",
  bio: "Available for consulting and collaboration. Let's build something amazing together!",
  profileImage: "/images/profile.jpg",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      icon: "Linkedin",
      label: "Connect on LinkedIn",
    },
    {
      platform: "GitHub",
      url: "https://github.com/yourprofile",
      icon: "Github",
      label: "Follow on GitHub",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/yourprofile",
      icon: "Twitter",
      label: "Follow on Twitter",
    },
    {
      platform: "Email",
      url: "mailto:your.email@example.com",
      icon: "Mail",
      label: "Send an email",
    },
  ],
}
