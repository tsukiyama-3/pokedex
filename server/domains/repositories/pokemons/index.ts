// モデルからクエリの型をインポート
import type { PokemonsQuery } from '~/server/domains/models/pokemons'
// インフラからPokeAPIの一覧の型をインポート
import type { Pokemons as PokemonsFromPokeApi } from '~/server/infrastructures/pokeapi'
// インフラからポケモン一覧取得処理をインポート
import { getPokemons as getPokemonsFromPokeApi } from '~/server/infrastructures/pokeapi'

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

// ポケモン一覧取得処理の抽象化
export const getPokemons = async (query: PokemonsQuery): Promise<PokemonsFromPokeApi> => {
  const pokemons = await getPokemonsFromPokeApi(createQuery(query))
  return pokemons
}
