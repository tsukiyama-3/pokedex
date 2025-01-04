// @ts-check
import tailwindcss from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    tailwindcss,
  },
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
  },
  settings: {
    tailwindcss: {
      config: './tailwind.config.js',
    },
  },
})
