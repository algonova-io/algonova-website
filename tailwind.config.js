
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#F2545B',
        ink: '#101010',
        soft: '#f6f7f8',
      },
      fontFamily: {
        suse: ['"SUSE"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'title-large':  ['49px', { lineHeight: '1.2', fontWeight: '700' }],
        'title-medium': ['31px', { lineHeight: '1.25', fontWeight: '700' }],
        'title-small':  ['25px', { lineHeight: '1.3', fontWeight: '700' }],

        'body-large':   ['16px', { lineHeight: '19spx', fontWeight: '400' }],
        'body-medium':  ['13px', { lineHeight: '17px', fontWeight: '400' }],
        'body-small':   ['10px', { lineHeight: '14px', fontWeight: '400' }],
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
