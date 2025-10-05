/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                accent: '#F2545B',
                ink: '#101010',
                secondaryText: '#3D3D3D',
                soft: '#f8f9fa',
            },
            fontFamily: {
                suse: ['"SUSE"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                'title-large': ['49px', {lineHeight: '49px', fontWeight: '700'}],
                'title-medium': ['31px', {lineHeight: '1.25', fontWeight: '700'}],
                'title-small': ['25px', {lineHeight: '1.3', fontWeight: '700'}],

                'body-large': ['20px', {lineHeight: '28px', fontWeight: '400'}],
                'body-medium': ['17px', {lineHeight: '22px', fontWeight: '400'}],
                'body-small': ['10px', {lineHeight: '14px', fontWeight: '400'}],
            },
            keyframes: {
                float: {
                    '0%, 100%': {transform: 'translateY(20%)'},
                    '50%': {transform: 'translateY(-20%)'} // tweak lift here
                },
                'slide-out-right': {
                    '0%': {opacity: '1', transform: 'translateX(0)'},
                    '100%': {opacity: '0', transform: 'translateX(20px)'},
                },
                'slide-in-right': {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-in-down': {
                    '0%': { opacity: '0', transform: 'translateY(-100%)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-out-up': {
                    '0%': { opacity: '1', transform: 'translateY(0)' },
                    '100%': { opacity: '0', transform: 'translateY(-100%)' },
                },
            },

            dropShadow: {
                'card': '0 8px 24px rgba(0,0,0,0.08)'
            },
            animation: {
                float: 'float 2s ease-in-out infinite',
                'slide-out-right': 'slide-out-right 0.6s ease forwards',
                'slide-in-right': 'slide-in-right 0.6s ease forwards',
                'slide-in-down': 'slide-in-down 2s ease forwards',
                'slide-out-up': 'slide-out-up 2s ease forwards',
            },
        },
    },
    plugins: [],
}
