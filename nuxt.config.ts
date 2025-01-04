// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'PokeDex',
      meta: [
        {
          name: 'description',
          content: 'Discover detailed information about each Pokémon, including their types, abilities, stats, and more',
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    },
  },
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    pokeapi: {
      baseURL: 'https://pokeapi.co/api/v2/',
    },
  },
  experimental: {
    viewTransition: true,
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
