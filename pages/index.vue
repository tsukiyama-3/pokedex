<script setup lang="ts">
import { usePokemons } from '~/composables/pokemons'
import { formatName } from '~/utils/format'

const { pokemons, hasMore, fetchNextPokemons, isLoading } = await usePokemons()
// IntersectionObserverでスクロール検知
const sentinel = ref(null)
onMounted(() => {
  if (!sentinel.value) return // sentinel が存在しない場合は処理を中断

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasMore.value && !isLoading.value) {
        fetchNextPokemons() // 追加データを取得
      }
    })
  })

  observer.observe(sentinel.value) // sentinel を監視

  // コンポーネントがアンマウントされたときに Observer を切断
  onUnmounted(() => {
    observer.disconnect()
  })
})
if (pokemons.value.length <= 0) {
  throw createError({ statusCode: 404, message: 'Pokemon Not Found' })
}
</script>

<template>
  <div class="space-y-4 py-16">
    <ul
      v-if="pokemons"
      class="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-x-4 gap-y-16 px-4"
    >
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        <NuxtLink
          :to="`/pokemons/${pokemon.name}`"
          class="group relative box-border block h-full rounded-xl border-2 border-transparent px-4 pb-4 pt-14 nm-flat-gray-100-lg hover:border-gray-300"
        >
          <img
            :src="pokemon.image"
            alt=""
            width="120"
            height="120"
            class="absolute left-1/2 top-[-64px] -translate-x-1/2 transform transition-transform duration-100 ease-in-out group-hover:scale-125"
          >
          <div class="space-y-2">
            <p class="text-center text-sm font-bold leading-none opacity-70">N° {{ pokemon.id }}</p>
            <p class="text-center text-lg font-bold leading-none">{{ formatName(pokemon.name) }}</p>
            <p class="flex items-center justify-center space-x-1">
              <span
                v-for="type in pokemon.types"
                :key="type"
                :class="`bg-types-${type}`"
                class="rounded px-2 py-1 text-sm font-bold leading-none text-white"
              >{{ formatName(type) }}</span>
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
    <div
      v-if="hasMore"
      ref="sentinel"
      class="flex h-16 w-full items-center justify-center"
    >
      <Icon
        name="mynaui:spinner"
        class="h-10 w-10 animate-spin text-gray-700"
        width="40"
        height="40"
      />
    </div>
  </div>
</template>
