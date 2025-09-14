
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#FF5A5F',
        ink: '#101010',
        soft: '#f6f7f8',
      },
      fontFamily: {
        suse: ['"SUSE"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-5%)' } // tweak lift here
        },
      },

      dropShadow: {
        'card': '0 8px 24px rgba(0,0,0,0.08)'
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },

    },
  },
  plugins: [],
}
