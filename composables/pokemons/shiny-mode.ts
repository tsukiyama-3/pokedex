export const useShinyMode = (injectionKey: string | InjectionKey<Ref<boolean>> = Symbol()) => {
  const isShiny = inject(
    injectionKey,
    () => {
      const isShiny = ref(false)
      provide(injectionKey, isShiny)
      return isShiny
    },
    true,
  )

  return { isShiny }
}
