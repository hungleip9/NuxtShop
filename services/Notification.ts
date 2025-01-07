import { getObjNotificationSubscribe } from "~/services/FirstApi";
export async function postThongBao(key: string, value: boolean) {
  if (!key) return
  const axios = useNuxtApp().$axios
  await axios.post(`${_urlApi('Auth')}/api/account/setting?key=${key}&value=${value}`).then(res => {
    getObjNotificationSubscribe(res.data.data)
  }).catch((e) => {
  })
}