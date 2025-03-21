export const useConst = () => 
  useState(() => ({
    carts: {} as any,
    menu: [] as any[],
    hasPopup: {} as {[key: string]: boolean},
    userInfo: null as {
      userName: string,
      fullName: string,
      email: string,
      address: string,
      id: number,
      status: string,
      photo: string,
      isLocked: boolean,
      idNumber: string,
      dateOfBirth: string,
    } | null
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