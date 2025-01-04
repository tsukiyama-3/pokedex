<script setup lang="ts">
import { usePokemons } from '~/composables/pokemons'
import { formatName } from '~/utils/format'

const { pokemons } = await usePokemons()
</script>

<template>
  <div class="py-16">
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
  </div>
</template>
