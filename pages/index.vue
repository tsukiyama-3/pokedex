<script setup lang="ts">
import { usePokemons } from '~/composables/pokemons'

const { pokemons } = await usePokemons()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">
      PokeDex
    </h1>
    <ul class="grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4">
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        <NuxtLink :to="`/pokemons/${pokemon.name}`">
          <img
            :src="pokemon.image"
            alt=""
            width="120"
            height="120"
          >
          <p>id: {{ pokemon.id }}</p>
          <p>name: {{ pokemon.name }}</p>
          <p class="space-x-1">
            types: <span
              v-for="type in pokemon.types"
              :key="type"
            >{{ type }}</span>
          </p>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
