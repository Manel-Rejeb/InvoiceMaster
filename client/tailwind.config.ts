import type { Config } from 'tailwindcss'
import { COLORS } from './styles/theme/tailwind-antd-colors'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './blueprints/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: { transparent: 'transparent', current: 'currentColor', ...COLORS },
    },
  },
  plugins: [require('preline/plugin')],
}
export default config
