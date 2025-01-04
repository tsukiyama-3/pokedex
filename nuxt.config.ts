// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    pokeapi: {
      baseURL: 'https://pokeapi.co/api/v2/',
    },
  },
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
