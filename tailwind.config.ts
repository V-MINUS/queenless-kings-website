import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Queenless Kings brand palette - Black/Crimson/Cream alt-rock aesthetic
        cyber: {
          teal: '#0a0a0a',      // Pure black background
          dark: '#000000',      // Darker variant
          mid: '#121212',       // Slightly lighter black for sections
          light: '#1a1a1a',     // Lighter black for cards
        },
        accent: {
          cyan: '#c41e3a',      // Crimson red (primary accent)
          gold: '#f5f0e1',      // Cream/off-white for text
          magenta: '#8b0000',   // Dark red for highlights
          teal: '#dc143c',      // Bright crimson
        },
        // Brand colors
        brand: {
          crimson: '#c41e3a',   // Primary crimson
          darkred: '#8b0000',   // Dark red
          cream: '#f5f0e1',     // Cream text
          black: '#0a0a0a',     // Pure black
          charcoal: '#1a1a1a',  // Charcoal
        },
        // Neon accent colors (keeping for compatibility)
        neon: {
          green: '#c41e3a',     // Crimson (remapped)
          pink: '#dc143c',      // Bright crimson
          blue: '#f5f0e1',      // Cream
          purple: '#8b0000',    // Dark red
        },
        // Dark theme palette - true blacks
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#121212',
          600: '#1a1a1a',
          500: '#222222',
          400: '#2a2a2a',
          300: '#333333',
          200: '#888888',
          100: '#cccccc',
        },
        // Semantic colors - updated
        background: {
          primary: '#0a0a0a',
          secondary: '#121212',
          tertiary: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #c41e3a 0%, #8b0000 50%, #dc143c 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0a 0%, #121212 100%)',
        'gradient-cyber': 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #121212 100%)',
        'gradient-space': 'radial-gradient(ellipse at center, #121212 0%, #0a0a0a 50%, #000000 100%)',
        'gradient-crimson': 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)',
      },
      boxShadow: {
        'neon-green': '0 0 10px #c41e3a, 0 0 20px #c41e3a, 0 0 30px #c41e3a',
        'neon-pink': '0 0 10px #dc143c, 0 0 20px #dc143c, 0 0 30px #dc143c',
        'neon-blue': '0 0 10px #f5f0e1, 0 0 20px #f5f0e1, 0 0 30px #f5f0e1',
        'glow-cyan': '0 0 20px rgba(196, 30, 58, 0.5)',
        'glow-gold': '0 0 20px rgba(245, 240, 225, 0.3)',
        'glow-crimson': '0 0 20px rgba(196, 30, 58, 0.6)',
      },
    },
  },
  plugins: [],
}

export default config
