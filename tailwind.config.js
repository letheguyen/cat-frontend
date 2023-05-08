/** @type {import('tailwindcss').Config} */
import { extendTailwind } from './src/themes/theme'

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: extendTailwind
  },
  plugins: [],
}
