import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '24px',
      screens: {
        // "2xl": "1400px",
        xl: '1280px',
      },
    },
    extend: {
      fontFamily: {
        sans: 'Neue Haas Unica, sans-serif',
      },
      colors: {
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '100%', // add required value here
              li: {
                listStyle: 'disc',
                p: {
                  margin: 'none !important',
                },
              },
            },
          },
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#fff',
        foreground: '#666',
        primary: '#666',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            ul: {
              listStyleType: 'none',
              // padding: 0,
              margin: 0,
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.5em',
              marginBottom: '0.5em',
            },
            'ul > li::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '0.6em',
              width: '0.3em',
              height: '0.3em',
              backgroundColor: 'currentColor',
              borderRadius: '50%',
            },
            'ul > li > p': {
              margin: 0,
            },
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config;

export default config;
