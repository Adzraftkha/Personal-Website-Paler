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
  email: "farellelghifari@gmail.com",
  phone: "+62 813 4686 4377",
  location: "Jakarta - Indonesia",
  timezone: "WIB (UTC+7)",
  bio: "Available for consulting and collaboration. Let's build something amazing together!",
  profileImage: "/images/profile.jpg",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/farell-elghifari/",
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
      platform: "Instagram",
      url: "https://instagram.com/farelghifari_",
      icon: "Instagram",
      label: "Follow on Instagram",
    },
    {
      platform: "Email",
      url: "mailto:farellelghifari@gmail.com",
      icon: "Mail",
      label: "Send an email",
    },
  ],
}
