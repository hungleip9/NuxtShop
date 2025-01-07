export async function getGroupMarket() {
  const axios = useNuxtApp().$axios;
	let res = await axios.get(`${_urlApi('News')}/api/tin-tuc/menu?isMarket=true`);
  return res.data.data
}
export async function getThiTruong(activeRadio: string) {
  useGlobal().value.ThiTruong = []
  await nextTick()
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/thi-truong/nhom?group=${activeRadio}`).then(res => {
    useGlobal().value.ThiTruong = res.data.data || [];
  })
}
export async function getMarketHistory(Symbol: string, limit: string) {
  let data = {c: [], h: [], l: [], o: [], t: [], v: []} as {[key: string]: any[]}
  const MarketInfo = useGlobal().value.MarketInfo[Symbol] || null
  if (!MarketInfo) return {c: [], h: [], l: [], o: [], t: [], v: []}
  const MarketHistory = useGlobal().value.MarketHistory[Symbol]
  let timeToday = MarketInfo.ModifiedDate || null as any
  timeToday = Math.floor(Date.parse(timeToday) / 1000)
  if (!limit || !Symbol) return
  if (MarketHistory && MarketHistory.c && getLimit(limit, 'number') + 20 <= MarketHistory.c.length) {
  } else {
    const axios = useNuxtApp().$axios
    await axios.get(`${_urlApi('Stockexchange')}/api/market/chart/${Symbol}?limit=${limit}`).then((res) => {
      data = {...res.data.data} || {c: [], h: [], l: [], o: [], t: [], v: []}
      // sau 3h chiều nếu tồn tại cây ngày hôm nay
      if (timeToday && _getFormatTime(data.t[0] * 1000, {getOnlyDate: true}) === _getFormatTime(timeToday * 1000, {getOnlyDate: true})) {
        data.c[0] = MarketInfo.Close
        data.h[0] = MarketInfo.High
        data.l[0] = MarketInfo.Low
        data.o[0] = MarketInfo.Open
        data.t[0] = timeToday
        data.v[0] = MarketInfo.TotalVolume
      } else {
        // khi chưa tồn tại ngày hôm này vào buổi sáng
        data.c.unshift(MarketInfo.Close)
        data.h.unshift(MarketInfo.High)
        data.l.unshift(MarketInfo.Low)
        data.o.unshift(MarketInfo.Open)
        data.t.unshift(timeToday)
        data.v.unshift(MarketInfo.TotalVolume)
      }
      useGlobal().value.MarketHistory[Symbol] = data
    })
  }
}
export async function getLichSuHangHoa(Symbol: string, take: number) {
  if (!take || !Symbol) return
  try {
    const params = {
      take: take
    }
    const SymbolMap = Symbol.toLowerCase()
    const axios = useNuxtApp().$axios
    await axios.get(`${_urlApi('Economic')}/api/hang-hoa/lich-su/${SymbolMap}`, {params}).then((res) => {
      if (useGlobal().value.LichSuHangHoa) {
        useGlobal().value.LichSuHangHoa[Symbol] = res.data.data
      }
    })
  } catch (error) {
    console.log(error);
  }
}

export async function getTinTuc(ids: string, skip: number, take: number) {
  const params = {
    ids: ids,
    skip: skip,
    take: take
  }
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('News')}/api/tin-tuc/danh-muc`, { params });
  return res.data.data
}
export async function getThiTruongLichSu1D(code: string) {
  if (!code) return
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/thi-truong/lich-su/${code}?skip=0&take=1`).then(res => {
    useGlobal().value.ThiTruongLichSu1D = res.data.data || [];
  })
}