// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint'],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2024-11-01',
  postcss: {
    plugins: { tailwindcss: {} },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
