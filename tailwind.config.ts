import { Config } from 'tailwindcss'

import typography from '@tailwindcss/typography'

const fonts = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
]

const config: Config = {
  content: ['./web/**/*.{tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rethink Sans', ...fonts],
      },
    },
  },
  plugins: [typography()],
}

export default config
