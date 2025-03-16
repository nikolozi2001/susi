/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DejaVuSansCondensed', 'system-ui', 'sans-serif'],
      },
      colors: {
        'susi': {
          'black': '#000000',
          'darkgray': '#282828',
          'gray-800': '#3c3c3c',
          'gray-700': '#4d4d4d',
          'gray-600': '#626262',
          'gray-500': '#7d7d7d',
          'gray-400': '#808080',
          'gray-300': '#828282',
          'beige': '#d9cbae',
          'lightbeige': '#e3e0da', 
          'white': '#ffffff',
        },
        'susi-opacity': {
          'black-0': 'rgba(0, 0, 0, 0)',
          'black-4': 'rgba(0, 0, 0, 0.04)',
          'black-50': 'rgba(0, 0, 0, 0.5)',
          'lightgray-60': 'rgba(212, 208, 200, 0.6)',
          'white-60': 'rgba(255, 255, 255, 0.6)',
          'darkgray-50': 'rgba(44, 44, 44, 0.5)',
          'darkgray-80': 'rgba(44, 44, 44, 0.8)',
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            color: theme('colors.susi.gray-700'),
            h1: {
              color: theme('colors.susi.black'),
              fontFamily: theme('fontFamily.sans').join(', '),
            },
            h2: {
              color: theme('colors.susi.darkgray'),
              fontFamily: theme('fontFamily.sans').join(', '),
            },
            h3: {
              color: theme('colors.susi.gray-800'),
              fontFamily: theme('fontFamily.sans').join(', '),
            },
            a: {
              color: theme('colors.susi.gray-600'),
              '&:hover': {
                color: theme('colors.susi.black'),
              },
            },
            blockquote: {
              borderLeftColor: theme('colors.susi.beige'),
              color: theme('colors.susi.gray-600'),
            },
            code: {
              color: theme('colors.susi.gray-800'),
              backgroundColor: theme('colors.susi.lightbeige'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
