export const useConst = () => 
  useState(() => ({
    theme: 'dark' as string,
    carts: {} as any,
    menu: [] as any[]
  }))
export const useLoading = () => 
useState(() => ({
  Fa: false as boolean,
  Ta: false as boolean
}))