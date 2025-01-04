import z from 'zod'

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
