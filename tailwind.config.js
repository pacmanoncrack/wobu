/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      aspectRatio: {
        landscape: '3 / 2'
      }
    },
    fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    colors: {
      white: '#FFF',
      black: '#000',
      green: {
        100: '#4a6741',
        200: '#3f5a36',
        300: '#374f2f',
        400: '#304529',
        500: '#22311d',
        DEFAULT: '#4a6741'
      }
    }
  },
  plugins: [],
}

