export const useConst = () => 
  useState(() => ({
    carts: {} as any,
    menu: [] as any[],
    hasPopup: {} as {[key: string]: boolean},
  }))
export const useLoading = () => 
useState(() => ({
  Fa: false as boolean,
  Ta: false as boolean
}))
export const useAuth = () => 
  useState(() => ({
    isAuthenticated: false as boolean,
  }))