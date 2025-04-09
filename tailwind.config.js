/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all relevant files in src
  ],
  theme: {
    extend: {
      colors: {
        // Burgundy Palette (from reference globals.css)
        'burgundy': {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d0d5',
          300: '#f4a9b3',
          400: '#ed7785',
          500: '#e34d5c',
          600: '#d42a3c',
          700: '#b21e2f',
          800: '#931b2a',
          900: '#7a1a27',
        },
        // Cream Palette (from reference globals.css)
        'cream': {
          50: '#fdfcfa',
          100: '#fbf8f1',
          200: '#f7f0e3',
          300: '#f3e8d4',
          400: '#efdfc6',
          500: '#ebd7b7',
          600: '#e7cfa9',
          700: '#e3c79a',
          800: '#dfbf8c',
          900: '#dbb77e',
        },
        // Gold Palette (from reference globals.css)
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Specific colors from feedback
        'review-bg': '#F9EBE7',
        'review-heart': '#E05A79',
      },
      fontFamily: {
        // Add serif font if needed, similar to reference
        // serif: ['Georgia', 'Times New Roman', 'serif'], // Example
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }, // Keep if using Radix-like components
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Add other keyframes if needed for animations
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // Add other animations
      },
    },
  },
  plugins: [
    // require('tailwindcss-animate'), // Add if needed and installed
  ],
}
