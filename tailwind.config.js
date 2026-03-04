/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef5ff',
          100: '#d9e8ff',
          200: '#bcd8ff',
          300: '#8ec1ff',
          400: '#599fff',
          500: '#3478ff',
          600: '#1b57f5',
          700: '#1443e1',
          800: '#1736b6',
          900: '#19338f',
          950: '#142157',
        },
        navy: {
          800: '#1e2a4a',
          900: '#0f172a',
          950: '#080d1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
