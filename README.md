# [Panic Panini Next.Js template](https://panic-panini-next.vercel.app/)

A modern, high-performance band website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features dark theme with neon accents, immersive animations, and comprehensive band management tools.

## Features

### Core Features
- **Immersive Hero Section** - Animated background with call-to-action buttons
- **Music Integration** - Spotify, Bandcamp, and YouTube player integration
- **Event Management** - Dynamic event listings with ticket integration
- **Interactive Gallery** - Lightbox gallery with image/video support
- **Contact System** - Contact forms with email automation
- **Newsletter** - Subscription management with welcome emails

### Design & UX
- **Dark Theme** - Modern dark design with neon green (#00ff88) and pink (#ff0080) accents
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Performance Optimized** - Lazy loading, code splitting, and Core Web Vitals optimization
- **Accessibility** - WCAG 2.1 compliant with keyboard navigation and screen reader support

### Technical Features
- **Next.js 14** - App Router with TypeScript for type safety
- **Sanity CMS** - Headless CMS for content management
- **Email Integration** - Nodemailer with HTML templates
- **SEO Optimized** - Meta tags, structured data, and sitemap generation
- **Admin Dashboard** - Content management interface (planned)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd queenless-kings
npm install
```

2. **Environment setup:**
```bash
cp .env.example .env.local
```

3. **Configure environment variables:**
```env
# Required for basic functionality
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SPOTIFY_CLIENT_ID=your_spotify_id
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS 3.4** - Utility-first CSS with JIT compilation
- **Framer Motion** - Animation library for smooth transitions
- **Lucide React** - Modern icon library

### Backend & Services
- **Sanity CMS** - Headless content management
- **Spotify Web API** - Music streaming integration
- **Nodemailer** - Email service integration
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Tailwind CSS IntelliSense** - VS Code extension support

## Project Structure

```bash
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts and theme
│   ├── page.tsx           # Homepage with all sections
│   └── globals.css        # Global styles and utilities
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Hero, About, Music, Events, Gallery, Contact
│   ├── ui/                # Reusable UI components (Button, Card, Modal)
│   └── providers/         # Theme and context providers
├── lib/
│   ├── cms.ts             # Sanity CMS integration
│   ├── spotify.ts         # Spotify API integration
│   ├── email.ts           # Email service with templates
│   └── utils.ts           # Utility functions
└── utils/
    ├── animations.ts      # Framer Motion animation variants
    └── performance.ts     # Performance optimization utilities
```

## Design System

### Colors
```css
/* Neon Accents */
--neon-green: #00ff88
--neon-pink: #ff0080

/* Dark Theme Palette */
--background-primary: #0a0a0a
--background-secondary: #111111
--background-tertiary: #1a1a1a
```

### Typography
- **Primary Font**: Inter (body text)
- **Display Font**: Space Grotesk (headings)
- **Mono Font**: Chivo Mono (code/technical)

### Animations
- **Fade In Up**: Section reveals
- **Scale Hover**: Interactive elements
- **Glow Effects**: Neon accent animations
- **Floating**: Decorative background elements

## Configuration

### Sanity CMS Setup
1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Configure schemas for events, releases, gallery items
3. Add project ID and dataset to environment variables

### Spotify Integration
1. Create a Spotify app at [developer.spotify.com](https://developer.spotify.com)
2. Add client ID and secret to environment variables
3. Configure redirect URIs for authentication

### Email Configuration
1. Set up SMTP credentials (Gmail App Password recommended)
2. Configure sender and recipient addresses
3. Customize email templates in `lib/email.ts`

## Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Environment Variables for Production
- Set all required environment variables in your deployment platform
- Ensure SMTP credentials are configured for email functionality
- Add domain to Spotify app settings for authentication

## SEO Features

- **Meta Tags**: Dynamic title, description, and Open Graph tags
- **Structured Data**: Schema.org markup for events and music
- **Sitemap**: Auto-generated XML sitemap
- **Performance**: Optimized Core Web Vitals scores

## Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for non-critical components
- **Bundle Analysis**: Webpack bundle analyzer integration
- **Caching**: Static generation with ISR for dynamic content

## Security

- **Environment Variables**: Sensitive data stored securely
- **CSRF Protection**: Built-in Next.js security features
- **Input Validation**: Form validation with Zod schemas
- **Rate Limiting**: API route protection (planned)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About Queen Less Kings

Queen Less Kings is a modern band pushing the boundaries of electronic music with immersive soundscapes and unforgettable live performances. This website serves as the central hub for fans to discover music, attend events, and connect with the band.
