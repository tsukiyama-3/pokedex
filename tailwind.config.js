/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './*.vue',
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  safelist: [
    {
      pattern:
        /bg-types-(normal|fighting|flying|poison|ground|rock|bug|ghost|steel|fire|water|grass|electric|psychic|ice|dragon|dark|fairy|shadow)/,
    },
    {
      pattern: /nm-inset-stats-(HP|ATK|DEF|SpA|SpD|SPD|TOT)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          700: '#4a5568',
          300: '#d9e2ec',
          100: '#edf2f7',
        },
        types: {
          normal: '#BCBCAC',
          fighting: '#BC5442',
          flying: '#669AFF',
          poison: '#AB549A',
          ground: '#DEBC54',
          rock: '#BCAC66',
          bug: '#ABBC1C',
          ghost: '#6666BC',
          steel: '#ABACBC',
          fire: '#FF421C',
          water: '#2F9AFF',
          grass: '#78CD54',
          electric: '#FFCD30',
          psychic: '#FF549A',
          ice: '#78DEFF',
          dragon: '#7866EF',
          dark: '#785442',
          fairy: '#FFACFF',
          shadow: '#0E2E4C',
        },
        stats: {
          HP: '#DF2140',
          ATK: '#FF994D',
          DEF: '#EECD3d',
          SpA: '#85DDFF',
          SpD: '#96DA83',
          SPD: '#FB94A8',
          TOT: '#7195DC',
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [require('tw-neumorphism')],
}
