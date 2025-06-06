/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary color - Blue
        primary: {
          50: '#E6F2FF',
          100: '#CCE5FF',
          200: '#99CBFF',
          300: '#66B1FF',
          400: '#3397FF',
          500: '#4A90E2',
          DEFAULT: '#4A90E2',
          600: '#3A7BC8',
          700: '#2A66AE',
          800: '#1A5194',
          900: '#0A3C7A',
        },
        // Secondary/Accent color - Teal
        accent: {
          50: '#E6FBF7',
          100: '#CCF7EF',
          200: '#99EFDF',
          300: '#66E7CF',
          400: '#50E3C2',
          DEFAULT: '#50E3C2',
          500: '#40D3B2',
          600: '#30C3A2',
          700: '#20B392',
          800: '#10A382',
          900: '#009372',
        },
        // Background colors
        background: {
          light: '#F9F9FB',
          DEFAULT: '#F9F9FB',
          dark: '#1C1E26',
          darkSecondary: '#2A2D3E',
        },
        // Card backgrounds
        card: {
          light: '#FFFFFF',
          dark: '#2A2D3E',
        },
        // Text colors
        text: {
          light: '#6E6E6E',
          DEFAULT: '#1A1A1A',
          dark: '#F0F0F0',
          darkSecondary: '#B0B0B0',
        },
        // Border colors
        border: {
          light: '#E0E0E0',
          DEFAULT: '#E0E0E0',
          dark: '#3A3D4D',
        },
        // Highlight color - Yellow
        highlight: {
          DEFAULT: '#FFCE54',
          light: '#FFCE54',
          dark: '#FFCE54',
        },
        // Danger/Error colors
        danger: {
          light: '#FF5B5B',
          DEFAULT: '#FF5B5B',
          dark: '#FF6F6F',
        },
        // Keep success and warning for compatibility
        success: {
          light: '#86EFAC',
          DEFAULT: '#22C55E',
          dark: '#16A34A',
        },
        warning: {
          light: '#FDE047',
          DEFAULT: '#EAB308',
          dark: '#CA8A04',
        },
        error: {
          light: '#FF5B5B',
          DEFAULT: '#FF5B5B',
          dark: '#FF6F6F',
        }
      },
      textColor: {
        light: '#6E6E6E',
        DEFAULT: '#1A1A1A',
        dark: '#F0F0F0',
        darkSecondary: '#B0B0B0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '120': '30rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
        'gradient': 'gradient 3s ease infinite',
        'float': 'float 3s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '400': '400ms',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
