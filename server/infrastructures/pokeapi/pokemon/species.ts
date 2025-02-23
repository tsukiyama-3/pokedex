import z from 'zod'

const rawSpeciesSchema = z.object({
  evolution_chain: z.string(),
})

export type Species = z.infer<typeof rawSpeciesSchema>

export const getSpecies = async (name: string) => {
  const { pokeapi: { baseURL } } = useRuntimeConfig()
  const response = await $fetch(`/pokemon-species/${name}`, {
    baseURL,
  })

  return rawSpeciesSchema.parse(response)
}
