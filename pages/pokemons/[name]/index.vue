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
        :src="pokemon.sprites.front_default"
        alt=""
        width="120"
        height="120"
      >
      <p class="space-x-2">
        types: <span
          v-for="(type, index) in pokemon.types"
          :key="index"
        >{{ type.type.name }}</span>
      </p>
      <p class="space-x-2">
        abilities: <span
          v-for="(ability, index) in pokemon.abilities"
          :key="index"
        >{{ ability.ability.name }}</span>
      </p>
      <p class="space-x-2">
        stats: <span
          v-for="(stat, index) in pokemon.stats"
          :key="index"
        >
          {{ stat.stat.name }}{{ stat.base_stat }}
        </span>
      </p>
    </div>
  </div>
</template>
