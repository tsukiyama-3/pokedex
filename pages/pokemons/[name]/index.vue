<script setup lang="ts">
import { usePokemon } from '~/composables/pokemons'
import { formatName } from '~/utils/format'
import { calculatePercentage } from '~/utils/calculate'

const route = useRoute('pokemon-name')
const router = useRouter()
const { pokemon } = await usePokemon(route.params.name as string)
</script>

<template>
  <div class="mx-auto max-w-[800px] space-y-4 p-4">
    <div
      v-if="pokemon"
      class="space-y-4"
    >
      <img
        :src="pokemon.image"
        alt=""
        width="120"
        height="120"
        class="mx-auto"
      >
      <div class="space-y-2">
        <p class="text-center font-bold leading-none opacity-70">
          N° {{ pokemon.id }}
        </p>
        <p class="text-center text-2xl font-bold leading-none">
          {{ formatName(pokemon.name) }}
        </p>
      </div>
      <div class="space-y-2">
        <div class="grid grid-cols-[20%_80%] gap-x-1">
          <p
            class="flex items-center justify-center rounded-l-full px-2 py-1 text-sm font-semibold nm-inset-gray-300 md:text-base"
          >
            Types
          </p>
          <p class="space-x-2 rounded-r-full px-4 py-1 nm-inset-gray-100">
            <span
              v-for="(type, index) in pokemon.types"
              :key="index"
              :class="`bg-types-${type}`"
              class="rounded px-2 py-1 text-sm font-bold leading-none text-white"
            >
              {{ formatName(type) }}
            </span>
          </p>
        </div>
        <div class="grid grid-cols-[20%_80%] gap-x-1">
          <p
            class="flex items-center justify-center rounded-l-full px-2 py-1 text-sm font-semibold nm-inset-gray-300 md:text-base"
          >
            Height
          </p>
          <p class="rounded-r-full px-4 py-1 font-semibold nm-inset-gray-100">
            {{ pokemon.height }}
          </p>
        </div>
        <div class="grid grid-cols-[20%_80%] gap-x-1">
          <p
            class="flex items-center justify-center rounded-l-full px-2 py-1 text-sm font-semibold nm-inset-gray-300 md:text-base"
          >
            Weight
          </p>
          <p class="rounded-r-full px-4 py-1 font-semibold nm-inset-gray-100">
            {{ pokemon.weight }}
          </p>
        </div>
        <div class="grid grid-cols-[20%_80%] gap-x-1">
          <p
            class="flex items-center justify-center rounded-l-full px-2 py-1 text-sm font-semibold nm-inset-gray-300 md:text-base"
          >
            Abilities
          </p>
          <p class="space-x-2 rounded-r-full px-4 py-1 font-semibold nm-inset-gray-100">
            <span
              v-for="(ability, index) in pokemon.abilities"
              :key="index"
            >{{ formatName(ability) }}</span>
          </p>
        </div>
        <div class="space-y-1">
          <p class="rounded-full px-2 py-1 text-center text-sm font-semibold nm-inset-gray-300 md:text-base">
            Stats
          </p>
          <div
            v-for="(stat, index) in pokemon.stats"
            :key="index"
            class="grid grid-cols-[20%_80%] items-center md:grid-cols-[10%_90%]"
          >
            <p class="grid grid-cols-2 text-sm font-semibold md:text-base">
              <span>{{ stat.name }}</span><span>{{ stat.value }}</span>
            </p>
            <div class="h-4 rounded-full nm-inset-gray-100-sm">
              <div
                v-if="stat.name !== 'TOT'"
                class="h-full rounded-full nm-inset-red-500"
                :style="{ width: `${calculatePercentage(stat.value)}%` }"
                :class="`nm-inset-stats-${stat.name}`"
              />
              <div
                v-else
                class="h-full rounded-full nm-inset-red-500"
                :style="{ width: `${calculatePercentage(stat.value, 720)}%` }"
                :class="`nm-inset-stats-${stat.name}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center pb-4">
      <button
        class="inline-flex h-10 w-10 items-center justify-center rounded-full nm-flat-gray-100"
        @click="router.back"
      >
        <Icon
          name="mynaui:x"
          class="h-6 w-6 text-gray-700"
          width="24"
          height="24"
        />
      </button>
    </div>
  </div>
</template>
