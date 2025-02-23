import z from 'zod'

// PokeAPIから返却されるデータのスキーマ
const rawPokemonsSchema = z.object({
  results: z.object({
    name: z.string(),
  }).array(),
})

// スキーマから型を取り出す
export type Pokemons = z.infer<typeof rawPokemonsSchema>

// クエリのスキーマ
const querySchema = z.object({
  offset: z.number(),
  limit: z.number(),
}).partial()

// スキーマから型を取り出す
type PokemonsQuery = z.infer<typeof querySchema>

// PokeAPI からポケモンの Resource Lists データを取得する
export const getPokemons = async (query: PokemonsQuery = {}): Promise<Pokemons> => {
  // runtimeConfig から PokeAPI の baseURL を取得する
  const { pokeapi: { baseURL } } = useRuntimeConfig()
  // APIリクエスト
  const response = await $fetch('/pokemon', {
    baseURL,
    query,
  })

  // レスポンスデータのバリデーションを行い、型安全なデータとして返却する
  return rawPokemonsSchema.parse(response)
}
