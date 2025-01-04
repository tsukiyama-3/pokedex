<script setup lang="ts">
import { usePokemon } from '~/composables/pokemons'

const route = useRoute('pokemon-name')
const { pokemon } = await usePokemon(route.params.name as string)
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">
      PokeDex
    </h1>
    <div v-if="pokemon">
      <p>id: {{ pokemon.id }}</p>
      <p>name: {{ pokemon.name }}</p>
      <p>height: {{ pokemon.height }}</p>
      <p>weight: {{ pokemon.weight }}</p>
      <img
        :src="pokemon.image"
        alt=""
        width="120"
        height="120"
      >
      <p class="space-x-2">
        types: <span
          v-for="(type, index) in pokemon.types"
          :key="index"
        >{{ type }}</span>
      </p>
      <p class="space-x-2">
        abilities: <span
          v-for="(ability, index) in pokemon.abilities"
          :key="index"
        >{{ ability }}</span>
      </p>
      <p class="space-x-2">
        stats: <span
          v-for="(stat, index) in pokemon.stats"
          :key="index"
        >
          {{ stat.name }}{{ stat.value }}
        </span>
      </p>
    </div>
  </div>
</template>
