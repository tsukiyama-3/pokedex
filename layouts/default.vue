<script setup lang="ts">
import { useShinyMode } from '~/composables/pokemons/shiny-mode'

const { isShiny } = useShinyMode('shiny')
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-100 text-gray-700">
    <header class="py-4 nm-flat-gray-100">
      <div class="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4">
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/">
            PokeDex
          </NuxtLink>
        </h1>
        <label
          class="relative flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300 nm-inset-gray-100"
          :class="{ 'nm-inset-blue-500': isShiny }"
        >
          <input
            v-model="isShiny"
            type="checkbox"
            class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          >
          <div
            class="absolute h-6 w-6 scale-110 transform rounded-full bg-white shadow-md transition-transform duration-300"
            :class="{ 'translate-x-6': isShiny, 'translate-x-0': !isShiny }"
          />
        </label>
      </div>
    </header>
    <main class="mx-auto w-full max-w-[1200px] grow">
      <slot />
    </main>
    <footer class="flex items-center justify-center gap-x-1 pb-8">
      <p class="text-sm opacity-80 md:text-base">
        © PokeDex created by
      </p>
      <NuxtLink
        to="https://x.com/tsuyakima3"
        target="_blank"
        class="text-sm opacity-80 md:text-base"
      >tsukiyama</NuxtLink>
    </footer>
  </div>
</template>

<style scoped>
.transition-all {
  transition: background-color 0.3s, color 0.3s;
}
</style>
