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
export async function getInfo() {
  const dataConst = useConst().value;
  const dataAuth = useAuth().value;
  const token = await keyLocalStorage({ type: 'GET', key: "token" });
  if (!token) return;
  const axios = useNuxtApp().$axios;
  await axios.get(`/api/auth/info`).then(res => {
    dataAuth.isAuthenticated = true;
    if (res?.data?.data?.info) {
      dataConst.userInfo = res.data.data.info;
    }
  }).catch(error => {
    console.log(error);
    dataAuth.isAuthenticated = false;
    dataConst.userInfo = null;
  });
}

export async function logout() {
  const dataConst = useConst().value;
  const dataAuth = useAuth().value;
  keyLocalStorage({ type: 'SET', key: "token", value: ''})
  const refreshToken = keyLocalStorage({ type: 'GET', key: "refresh"}) || ''
  dataConst.userInfo = null
  dataAuth.isAuthenticated = false
  const axios = useNuxtApp().$axios
  await axios.get(`/api/auth/logout/${refreshToken}`).then().catch()
  keyLocalStorage({ type: 'SET', key: "refresh", value: ''})
}