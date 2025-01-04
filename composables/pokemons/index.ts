import { useShinyMode } from '~/composables/pokemons/shiny-mode'

// ポケモン一覧で利用するポケモン型
type PokemonListItem = {
  id: number
  name: string
  image: {
    default: string
    shiny: string
  }
  types: string[]
}

// クエリの型
type Query = Partial<{
  offset: number
  limit: number
}>

const MAX_POKEMON_COUNT = 1025

export const usePokemon = async (name: string) => {
  const { isShiny } = useShinyMode('shiny')
  // サーバからAPIリクエスト
  const { data } = await useFetch(`/api/v1/pokemons/${name}`, {
    default: () => null,
    transform: (response) => {
      if (!response) {
        return null
      }
      return response
    },
  })

  const pokemonImage = computed(() => {
    if (data.value === null) {
      return ''
    }
    if (isShiny.value) {
      return data.value.image.animated.shiny ?? data.value.image.still.shiny
    }
    return data.value.image.animated.default ?? data.value.image.still.default
  })

  return { pokemon: data, pokemonImage }
}

export const usePokemons = async (query: Query = { limit: 40 }) => {
  // サーバからAPIリクエスト
  const { data } = await useFetch('/api/v1/pokemons', {
    query: { ...query },
    default: () => ([]),
    transform: (response) => {
      if (!response) {
        return []
      }
      return response
    },
  })

  const isLoading = ref(false)
  const offset = ref(query.limit || 40)
  const limit = 40
  const pokemons = ref<PokemonListItem[]>(data.value)
  const hasMore = computed(() => pokemons.value.length < MAX_POKEMON_COUNT)
  // 無限スクロールで追加データ取得
  const fetchNextPokemons = async () => {
    if (isLoading.value || !hasMore.value) return
    isLoading.value = true
    const remaining = MAX_POKEMON_COUNT - pokemons.value.length
    const fetchLimit = Math.min(remaining, limit) // 次回取得件数を決定
    const response = await $fetch('/api/v1/pokemons', {
      query: { offset: offset.value, limit: fetchLimit },
    })
    if (response) {
      pokemons.value.push(...response)
      offset.value += response.length // 実際に取得した件数を加算
    }
    isLoading.value = false
  }
  return {
    pokemons,
    isLoading,
    hasMore,
    fetchNextPokemons,
  }
}
