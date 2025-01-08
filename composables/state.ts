export const useConst = () => 
  useState(() => ({
    theme: 'dark' as string,
  }))
export const useLoading = () => 
useState(() => ({
  Fa: false as boolean,
  Ta: false as boolean
}))