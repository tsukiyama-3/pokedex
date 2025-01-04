<script setup lang="ts">
import { usePokemons } from '~/composables/pokemons'

const { pokemons } = await usePokemons()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">
      PokeDex
    </h1>
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>
