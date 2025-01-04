// クエリの型
type Query = Partial<{
  offset: number
  limit: number
}>

export const usePokemons = async (query: Query = {}) => {
  // サーバからAPIリクエスト
  const { data } = await useFetch('/api/v1/pokemons', {
    query: { ...query },
    default: () => ([]),
    transform: (response) => {
      if (!response) {
        return []
      }
      return response.results
    },
  })

  return { pokemons: data }
}
