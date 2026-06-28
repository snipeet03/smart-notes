/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        brand: {
          50: '#f2f6e1',
          100: '#e6e6df',
          500: '#5b6f00',
          600: '#4c5616',
          700: '#3f4712',
        },
        oats: {
          bg: '#fcfcf9',
          surface: '#ffffff',
          sunken: '#f5f5f0',
          accent: '#5b6f00',
          'accent-hover': '#4c5616',
          'accent-light': '#f2f6e1',
          'ink-primary': '#292929',
          'ink-secondary': '#72726e',
          'ink-tertiary': '#acada8',
          border: '#e6e6df',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
