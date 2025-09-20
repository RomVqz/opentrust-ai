/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
        risk: {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444'
        }
      },
    },
  },
  plugins: [],
}
