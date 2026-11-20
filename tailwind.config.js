/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#050505',
          card: '#101318',
          cardHover: '#161B22',
          border: '#242A35',
          muted: '#181E27',
        },
        electric: {
          DEFAULT: '#00A8FF',
          hover: '#38BDF8',
          glow: 'rgba(0, 168, 255, 0.35)',
        },
        royal: {
          DEFAULT: '#1265C8',
          hover: '#1D72DB',
          dark: '#0B4A96',
        },
        tealAccent: {
          DEFAULT: '#20C5B5',
          hover: '#2DD4BF',
        },
        textMuted: '#A1A1AA',
      },
      boxShadow: {
        'glow-electric': '0 0 25px rgba(0, 168, 255, 0.25)',
        'glow-electric-lg': '0 0 45px rgba(0, 168, 255, 0.4)',
        'glow-teal': '0 0 25px rgba(32, 197, 181, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 168, 255, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 168, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
};
