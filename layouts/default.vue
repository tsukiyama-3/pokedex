<template>
  <div class="flex min-h-screen flex-col bg-gray-100 text-gray-700">
    <header class="py-4 nm-flat-gray-100">
      <h1 class="mx-auto max-w-[1200px] px-4 text-2xl font-bold">
        <NuxtLink to="/">
          PokeDex
        </NuxtLink>
      </h1>
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
