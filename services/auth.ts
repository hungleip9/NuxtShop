interface dataLogin {
  PhoneNumber: string,
  Password: string
}
interface dataRegister {
  userName: string,
  phoneNumber:  string,
  email:  string,
  password:  string,
}
export async function login(data: dataLogin) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/login`, data)
}
export async function register(data: dataRegister) {
  const axios = useNuxtApp().$axios
  return await axios.post(`/api/auth/register`, data)
}
export async function info() {
  const axios = useNuxtApp().$axios
  return await axios.get(`/api/auth/info`)
}

export async function logout() {
  const dataConst = useConst().value;
  const dataAuth = useAuth().value;
  const refreshToken = keyLocalStorage({ type: 'GET', key: "refresh"}) || ''
  const axios = useNuxtApp().$axios
  await axios.get(`/api/auth/logout/${refreshToken}`).then().catch()
  await keyLocalStorage({ type: 'SET', key: "token", value: ''})
  await keyLocalStorage({ type: 'SET', key: "refresh", value: ''})
  dataConst.userInfo = null
  dataAuth.isAuthenticated = false
}