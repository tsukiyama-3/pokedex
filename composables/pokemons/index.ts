// ポケモン一覧で利用するポケモン型
type PokemonListItem = {
  id: number
  name: string
  image: string
  types: string[]
}

// クエリの型
type Query = Partial<{
  offset: number
  limit: number
}>

const MAX_POKEMON_COUNT = 1025

export const usePokemon = async (name: string) => {
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

  return { pokemon: data }
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
