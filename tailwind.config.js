/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff2ed',
          100: '#ffe0d1',
          200: '#ffc2a3',
          300: '#ff9e6b',
          400: '#ff7a3d',
          500: '#ff6b35', // Primary orange
          600: '#f14a10',
          700: '#c63a0c',
          800: '#9e300f',
          900: '#7e2c11',
        },
        accent: {
          50: '#eefbee',
          100: '#d6f5d8',
          200: '#b0eab5',
          300: '#7dd884',
          400: '#4caf50', // Green
          500: '#3e9142',
          600: '#2e7537',
          700: '#265d2e',
          800: '#224a28',
          900: '#1e3e24',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        success: {
          500: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 8px -2px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      animation: {
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};