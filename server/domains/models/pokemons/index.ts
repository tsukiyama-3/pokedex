import z from 'zod'

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
