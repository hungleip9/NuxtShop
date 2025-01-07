export async function getMarketMatchingIntraday(str: string) {
  let key = str
  if (str == 'HNX') {
    key = 'HNXINDEX'
  }
  if (str == 'UPINDEX' || str == 'UPCOM') {
    key = 'HNXUPCOMINDEX'
  }
  try {
    const axios = useNuxtApp().$axios
    await axios.get(`${_urlApi('Stockexchange')}/api/market/chart-intraday/${str}`).then((res) => {
      if (!useGlobal().value.MarketIntradayHistory[key]) return
      let data = res.data.data
      if (data.length && data[0].o == 0) {
        data[0].o = data[0].c
        data[0].h = data[0].c
        data[0].l = data[0].c
      }
      useGlobal().value.MarketIntradayHistory[key] = data.reverse()
    })
  } catch (error) {
    console.log(error);
  }
}
export async function getnhomCoPhieuVN30() {
  try {
    if (useGlobal().value.VN30.length) return
    const axios = useNuxtApp().$axios
    const res = await axios.get(`${_urlApi('Economic')}/api/cong-ty/nhom-co-phieu/VN30`);
    useGlobal().value.VN30 = res.data.data;
  } catch (error) {
    console.log(error);
  }
}
export async function getChungQuyen() {
  if (useGlobal().value.ChungQuyen.length) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Stockexchange')}/api/StockExchange/chung-quyen`).then(res => {
    useGlobal().value.ChungQuyen = res.data.data.map((e: any) => {
      // Cap nhat Change và ChangePercent cho chứng quyền
      const { Close, Reference } = e
      const Change = isnum(Close - Reference)
      const ChangePercent = isnum((Close - Reference) / Reference)
      return {
        ...e,
        Change,
        ChangePercent
      }
    });
  }).catch((e) => {
    console.log(e);
  });
}
export async function getThoaThuan() {
  try {
    const axios = useNuxtApp().$axios
    const res = await axios.get(`${_urlApi('Stockexchange')}/api/StockExchange/agree-trading`);
    return res.data.data || []
  } catch (error) {
    console.log(error);
  }
}