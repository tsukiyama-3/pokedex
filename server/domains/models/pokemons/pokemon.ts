import z from 'zod'
// インフラからPokeAPIの詳細の型をインポート
import type { Pokemon as PokemonFromPokeApi } from '~/server/infrastructures/pokeapi'

// ポケモン詳細ドメインモデルのスキーマ
const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.string(),
  weight: z.string(),
  abilities: z.string().array(),
  image: z.object({
    still: z.object({
      default: z.string(),
      shiny: z.string(),
    }),
    animated: z.object({
      default: z.string().nullable(),
      shiny: z.string().nullable(),
    }),
  }),
  stats: z.object({
    name: z.string(),
    value: z.number(),
  }).array(),
  types: z.string().array(),
})

// スキーマから型を取り出す
export type Pokemon = z.infer<typeof pokemonSchema>

// routerParamsのスキーマ
const routerParamsSchema = z.object({
  name: z.string(),
})

// スキーマから型を取り出す
export type PokemonParams = z.infer<typeof routerParamsSchema>

// routerParamsのバリデーション
export const validatePokemonParams = (routerParams: unknown): PokemonParams => {
  return routerParamsSchema.parse(routerParams)
}

// PokeAPIから受け取ったデータをポケモン詳細ドメインモデルへ変換
export const convert = (pokemon: PokemonFromPokeApi): Pokemon => {
  return pokemonSchema.parse({
    id: pokemon.id,
    name: pokemon.name,
    height: convertHeight(pokemon.height),
    weight: convertWeight(pokemon.weight),
    abilities: pokemon.abilities.map(ability => ability.ability.name),
    image: {
      still: {
        default: pokemon.sprites.front_default,
        shiny: pokemon.sprites.front_shiny,
      },
      animated: {
        default: pokemon.sprites.versions['generation-v']['black-white'].animated.front_default,
        shiny: pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny,
      },
    },
    stats: calculateStats(pokemon.stats),
    types: pokemon.types.map(type => type.type.name),
  })
}

// 高さをドメインモデル（メートル）へ変換
const convertHeight = (height: number): string => {
  return (height / 10).toString() + 'm'
}

// 重さをドメインモデル（キロメートル）へ変換
const convertWeight = (weight: number): string => {
  return (weight / 10).toString() + 'kg'
}

// ステータスに合計値を計算し含める
const calculateStats = (pokemonStats: PokemonFromPokeApi['stats']): { name: string, value: number }[] => {
  // ステータス名マッピング用
  const statNameMapping: Record<string, string> = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    'speed': 'SPD',
  }
  // ステータスをドメインモデルへ変換
  const stats = pokemonStats.map(stat => ({
    name: statNameMapping[stat.stat.name] || stat.stat.name,
    value: stat.base_stat,
  }))
  // 合計値を計算
  const totalStats = stats.reduce((sum, stat) => sum + stat.value, 0)
  // 合計値をステータスにpush
  stats.push({ name: 'TOT', value: totalStats })

  return stats
}
