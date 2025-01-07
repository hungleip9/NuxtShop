export async function getMacroDefine() {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
  await axios.get(`${_urlApi('Economic')}/api/kinh-te-vi-mo/loai-vi-mo`).then(res => {
    response = res.data.data
  });
  return response;
}
export async function getMacroDefineList(macroType: string) {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
  await axios.get(`${_urlApi('Economic')}/api/kinh-te-vi-mo/danh-sach-bao-cao?macroType=${macroType}`).then(res => {
    response = res.data.data || []
  });
  return response;
}
export async function getMacroProperty(macroDefineId: string) {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
  await axios.get(`${_urlApi('Economic')}/api/kinh-te-vi-mo/mau-bao-cao?macroDefineId=${macroDefineId}`).then(res => {
    response = res.data.data || []
  });
  return response;
}
export async function getMacroEconomic(macroDefineId: number, from: number, to: number) {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
  await axios.get(`${_urlApi('Economic')}/api/kinh-te-vi-mo/du-lieu-bao-cao?macroDefineId=${macroDefineId}&from=${from}&to=${to}`).then(res => {
    response = res.data.data || []
  });
  return response;
}

export async function getMacroEconomicNew(macroDefineId: number, take: number) {
  const axios = useNuxtApp().$axios;
  let response = [] as any
  await axios.get(`${_urlApi('Economic')}/api/kinh-te-vi-mo/du-lieu-bao-cao/mobile/${take}?macroDefineId=${macroDefineId}`).then(res => {
    response = res.data.data
  });
  return response;
}
