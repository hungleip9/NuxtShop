export async function getHistoryPrice(params: {
  symbol: string,
  resolution: string,
  from: number,
  to: number,
  type: string
} | any) {
  let paramsMap = {...params} as any
  paramsMap.symbol = paramsMap.symbol.toLowerCase()
  if (!paramsMap.type) {
    await getInfoSymbol(paramsMap.symbol).then((res: any) => {
      paramsMap.type = res.type || ''
    })
  }
  if (!paramsMap.type) return
  const axios = useNuxtApp().$axios
  return await axios.get(`${_urlApi('Stockexchange')}/api/tradingview/history`, { params: paramsMap })
}
export async function getInfoSymbol(symbolName = '') {
  let symbolItem = null
  let params = {
    symbol: symbolName.toLowerCase()
  }
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Stockexchange')}/api/tradingview/symbols`, { params }).then((res) => {
    symbolItem = res.data
  }).catch((e) => {})
  return symbolItem
}