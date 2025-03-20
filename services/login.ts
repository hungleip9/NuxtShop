interface dataLogin {
  PhoneNumber: number,
  Password: string
}
export async function login(data: dataLogin) {
  const axios = useNuxtApp().$axios
  return await axios.post(`http://103.188.83.74:8080/api/auth/login`, data)
}