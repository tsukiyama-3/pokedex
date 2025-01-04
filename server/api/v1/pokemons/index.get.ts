// モデルからクエリのバリデーション処理をインポート
import { validatePokemonsQuery } from '~/server/domains/models/pokemons'
// レポジトリからポケモン一覧取得処理をインポート
import { getPokemons } from '~/server/domains/repositories/pokemons'

// API リクエストの結果を サーバーサイドのメモリ にキャッシュする
export default defineCachedEventHandler(
  async (event) => {
    try {
      // クエリのバリデーションを行い、型安全なクエリとして返却する
      const query = await getValidatedQuery(event, validatePokemonsQuery)
      // クエリを元にポケモン一覧を取得する
      const pokemons = await getPokemons(query)

      return pokemons
    }
    catch (error) {
      console.error('APIリクエスト中にエラーが発生しました。', error)
    }
  },
  {
    // swr: false,
    maxAge: 24 * 60 * 60, // キャッシュのmaxAgeを設定 (1日)
  },
)
