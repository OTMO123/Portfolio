import { PersonalInfo, Project, Skill, Experience, SocialLink } from '../types';

export const personalInfo: PersonalInfo = {
  name: "Aurik",
  title: "Economics, Data & API Integration | Student @ Reichman University",
  description: "Helping Businesses Automate & Scale. Specializing in Economics, Entrepreneurship, and Data Science with strong analytical and technical skills across business process automation and investment analysis.",
  location: "Israel",
  email: "your.email@example.com",
  avatar: "/avatar.jpg",
  resume: "/path/to/your/resume.pdf"
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourusername",
    icon: "linkedin"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yourusername",
    icon: "twitter"
  }
];

export const skills: Skill[] = [
  { name: "Python", level: 75, category: "backend", icon: "python" },
  { name: "Data Analysis", level: 85, category: "backend", icon: "database" },
  { name: "Excel", level: 90, category: "tools", icon: "excel" },
  { name: "JavaScript", level: 60, category: "frontend", icon: "javascript" },
  { name: "HTML", level: 65, category: "frontend", icon: "html" },
  { name: "CSS", level: 60, category: "frontend", icon: "css" },
  { name: "Golang", level: 50, category: "backend", icon: "golang" },
  { name: "Economics", level: 90, category: "design", icon: "economics" },
  { name: "API Integration", level: 75, category: "tools", icon: "api" },
  { name: "Business Automation", level: 80, category: "tools", icon: "automation" }
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Business Process Automation Suite",
    description: "Comprehensive automation solutions for businesses including API integrations, workflow optimization, and data-driven decision making tools to improve efficiency and reduce manual processes.",
    image: "/path/to/project1.jpg",
    technologies: ["Python", "API Integration", "Excel", "Data Analysis"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/automation-suite",
    featured: true
  },
  {
    id: "2",
    title: "Economic Analysis & Investment Tools",
    description: "Advanced financial modeling and investment analysis platform using microeconomics principles and data science to optimize resource allocation and market trend analysis.",
    image: "/path/to/project2.jpg",
    technologies: ["Python", "Excel", "Statistics", "Economics"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/economic-analysis",
    featured: true
  },
  {
    id: "3",
    title: "Podcast Production & Management",
    description: "Led complete podcast project for teenagers including sound recording, content creation, production management, and team coordination at art factory location.",
    image: "/path/to/project3.jpg",
    technologies: ["Project Management", "Audio Production", "Team Leadership"],
    featured: false
  }
];

export const experience: Experience[] = [
  {
    id: "1",
    company: "Reichman University",
    position: "Student - Economics, Entrepreneurship & Data Science",
    duration: "2021 - Present",
    description: [
      "Developed strong analytical and technical skills across multiple disciplines",
      "Applied economic principles to real-world scenarios and market analysis",
      "Gained expertise in data analysis, statistics, and Python programming"
    ],
    technologies: ["Python", "Excel", "Statistics", "Economics", "Data Analysis"],
    current: true
  },
  {
    id: "2",
    company: "Various Projects",
    position: "Business Process Automation Consultant",
    duration: "2022 - Present",
    description: [
      "Developed automation solutions helping businesses improve operations",
      "Created seamless API integrations to reduce manual processes and errors",
      "Conducted market analysis and optimization strategies for resource allocation"
    ],
    technologies: ["Python", "API Integration", "Business Analysis", "Automation"]
  },
  {
    id: "3",
    company: "Creative Projects",
    position: "Project Manager & Team Leader",
    duration: "2020 - 2022",
    description: [
      "Managed podcast project for teenagers including sound recording and content creation",
      "Oversaw audio recording on-site at art factory location",
      "Led theater performance creation and team coordination"
    ],
    technologies: ["Project Management", "Audio Production", "Team Leadership", "Creative Direction"]
  }
];