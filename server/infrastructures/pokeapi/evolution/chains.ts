import z from 'zod'

type ChainType = {
  evolves_to: ChainType[]
  is_baby: boolean
  species: {
    name: string
  }
}

const chainSchema: z.ZodType<ChainType> = z.lazy(() =>
  z.object({
    evolves_to: z.array(z.lazy(() => chainSchema)).optional().transform(val => val ?? []), // ここで `undefined` を `[]` に変換
    is_baby: z.boolean(),
    species: z.object({
      name: z.string(),
    }),
  }) as z.ZodType<ChainType>,
)

const rawChainsSchema = z.object({
  id: z.number(),
  chain: chainSchema,
})

export type Chains = z.infer<typeof rawChainsSchema>

export const getChains = async (endPoint: string) => {
  const response = await $fetch(endPoint)

  return rawChainsSchema.parse(response)
}
