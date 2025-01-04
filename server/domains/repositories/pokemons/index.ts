// モデルからクエリの型をインポート
import type { PokemonsQuery } from '~/server/domains/models/pokemons'
// インフラからPokeAPIの一覧と詳細の型をインポート
import type { Pokemons as PokemonsFromPokeApi, Pokemon as PokemonFromPokeApi } from '~/server/infrastructures/pokeapi'
// インフラからポケモン一覧と詳細取得処理をインポート
import {
  getPokemons as getPokemonsFromPokeApi,
  getPokemon as getPokemonFromPokeApi,
} from '~/server/infrastructures/pokeapi'

// クエリを生成するメソッド 不必要なクエリを除外する
const createQuery = ({ offset, limit }: PokemonsQuery) => {
  return Object.entries({
    offset,
    limit,
  })
    .filter(([_, value]) => value !== undefined)
    .reduce((obj, [key, value]) => {
      return Object.assign(obj, { [key]: value })
    }, {})
}

// ポケモン詳細取得処理の抽象化
export const getPokemon = async (name: string): Promise<PokemonFromPokeApi> => {
  const pokemon = await getPokemonFromPokeApi(name)
  return pokemon
}

// ポケモン一覧取得処理の抽象化
export const getPokemons = async (query: PokemonsQuery): Promise<PokemonsFromPokeApi> => {
  const pokemons = await getPokemonsFromPokeApi(createQuery(query))
  return pokemons
}
