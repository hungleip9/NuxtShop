export async function getCommodityHistoryData(code: string, isIntraday: boolean, limit: number) {
  const axios = useNuxtApp().$axios
  const codeMap = code.toLowerCase()
  let response = await axios.get(`${_urlApi('Economic')}/api/hang-hoa/lich-su/${codeMap}?skip=${isIntraday? 1 : 0}&take=${limit}`);
  if (response && response.data) {
    return response.data;
  }
}