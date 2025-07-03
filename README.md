# Professional Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Inspired by high-quality portfolio designs with smooth animations and professional aesthetics.

## 🚀 Features

- **Modern Design**: Clean, professional layout inspired by top portfolio websites
- **Fully Responsive**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Type Safe**: Built with TypeScript for better development experience
- **Performance Optimized**: Fast loading with modern build tools (Vite)

## 📋 Sections

- **Hero**: Eye-catching introduction with animated text effects
- **About**: Professional summary with statistics and achievements
- **Skills**: Interactive skill showcase with progress indicators
- **Projects**: Portfolio gallery with detailed project cards
- **Experience**: Timeline view of professional journey
- **Contact**: Contact form and social media links

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Font**: Inter (Google Fonts)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm or yarn

### Installation

1. Install dependencies
```bash
npm install
```

2. Start development server
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## ⚙️ Configuration

### Personal Information

Edit `src/data/portfolio.ts` to customize:
- Personal details (name, title, description)
- Skills and expertise levels
- Project portfolio
- Work experience
- Social media links

### Styling

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update Google Fonts import in `src/index.css`
- **Animations**: Customize Framer Motion variants in components

### Images

Replace placeholder images in the `public` folder:
- Profile photo
- Project screenshots

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎨 Customization

### Theme Colors
Update the color palette in `tailwind.config.js`

### Content
All content is centralized in `src/data/portfolio.ts` for easy updates.

### Components
- `AnimatedText`: Typewriter effect component
- `GlowCard`: Card component with hover glow effects
- `Navigation`: Responsive navigation with smooth scrolling

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

**Built with ❤️ using React + TypeScript + Tailwind CSS**
