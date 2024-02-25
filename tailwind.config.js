/** @type {import('tailwindcss').Config} */
import Color from 'color'
const lighten = (col, ratio) => Color(col).lighten(ratio).rgb().string()
const darken = (col, ratio) => Color(col).darken(ratio).rgb().string()

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          yellow: '#FFDC8E',
          'yellow-lighter': lighten('#FFDC8E', 0.05),
          'yellow-darker': darken('#FFDC8E', 0.05),
          red: '#F77A70',
          'red-lighter': lighten('#F77A70', 0.05),
          'red-darker': darken('#F77A70', 0.05),
          blue: '#AAB7E4',
          'blue-lighter': lighten('#AAB7E4', 0.05),
          'blue-darker': darken('#AAB7E4', 0.05),
          green: '#89E779'
        },
        black: '#1c1c1c',
        white: '#f0f0f0',
        'on-black': '#383838'
      },
      borderRadius: {
        '2.5xl': '1.25rem'
      }
    }
  },
  plugins: []
}
