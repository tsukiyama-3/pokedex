import z from 'zod'
// インフラからPokeAPIの一覧の型をインポート
import type { Pokemon as PokemonFromPokeApi } from '~/server/infrastructures/pokeapi'

// ポケモン一覧ドメインモデルのスキーマ
const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.object({
    default: z.string(),
    shiny: z.string(),
  }),
  types: z.string().array(),
})

// スキーマから型を取り出す
export type Pokemon = z.infer<typeof pokemonSchema>

// クエリのスキーマ
const querySchema = z.object({
  offset: z.coerce.number(),
  limit: z.coerce.number(),
}).partial()

// スキーマから型を取り出す
export type PokemonsQuery = z.infer<typeof querySchema>

// クエリのバリデーション
export const validatePokemonsQuery = (query: unknown): PokemonsQuery => {
  return querySchema.parse(query)
}

// PokeAPIから受け取ったデータをポケモン一覧ドメインモデルへ変換
export const convert = (pokemon: PokemonFromPokeApi): Pokemon => {
  return pokemonSchema.parse({
    id: pokemon.id,
    name: pokemon.name,
    image: {
      default: pokemon.sprites.front_default,
      shiny: pokemon.sprites.front_shiny,
    },
    types: pokemon.types.map(type => type.type.name),
  })
}
