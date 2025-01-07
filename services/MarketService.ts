export async function getMarketPriceHistory(code: string, skip: number, take: number) {
	const axios = useNuxtApp().$axios;
	return axios.get(`${_urlApi('Stockexchange')}/api/market/price-history/${code}?skip=${skip}&take=${take}`)
}
export async function getStockPriceHistory() {
	const axios = useNuxtApp().$axios;
	let response = [] as any[]
	await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/price-change`).then(res => {
		response = res.data.data || []
	});
	return response;
}
export async function getStockPriceHistoryByCode(code: string) {
	let response = null as any
	const axios = useNuxtApp().$axios;
	await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/price-change/${code}`).then(res => {
		response = res.data.data
	});
	return response
}
export async function getMarketChart(code: string, limit: string) {
	const axios = useNuxtApp().$axios;
	let response = null as any
	await axios.get(`${_urlApi('Stockexchange')}/api/market/chart/${code}?limit=${limit}`).then(res => {
		response = res.data.data || null
	})
	return response;
}
export async function getMarketLiquidityHistory(code: string) {
	const axios = useNuxtApp().$axios;
	return axios.get(`${_urlApi('Stockexchange')}/api/market/liquidity-history/${code}`)
}
export async function getMarketBreadthHistory(code: string) {
	const axios = useNuxtApp().$axios;
	let response = [] as any
	await axios.get(`${_urlApi('Stockexchange')}/api/market/market-breadth-history/${code}`).then(res => {
		response = res.data.data || []
	});
	return response;
}
export async function getHistoryMarketForeign(market: string, timeStamp: number) {
  let response = [] as any[]
	const axios = useNuxtApp().$axios;
  await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/foreign-trading?market=${market}&timeStamp=${timeStamp}`).then(res => {
		response = res.data.data
	});
	return response;
}
export async function getMarketProprietaryTrading(code: string, skip: number, take: number) {
  let response = [] as any[]
	const axios = useNuxtApp().$axios;
  await axios.get(`${_urlApi('Stockexchange')}/api/market/proprietary-trading/${code}?skip=${skip}&take=${take}`).then(res => {
		response = res.data.data
	});
	return response;
}
export async function getMarketProprietaryTradingChart(code: string, timeStamp: number) {
	let response = [] as any[]
  const axios = useNuxtApp().$axios;
  await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/chart/proprietary-trading/${code}?timeStamp=${timeStamp}`).then(res => {
		response = res.data.data || []
	});
	return response;
}
export async function getOrderBigMatchingIntraday(skip: number, take: number){
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
	await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/big-matching?skip=${skip}&take=${take}`).then(res => {
		response = res.data.data
	});
	return response
}
export async function getSignalBuy() {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
	await axios.get(`${_urlApi('Stockexchange')}/api/signal/buy`).then(res => {
		response = res.data.data
	});
	return response
}
export async function getSignalSell() {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
	await axios.get(`${_urlApi('Stockexchange')}/api/signal/sell`).then(res => {
		response = res.data.data
	});
	return response
}
export async function getSignalHistory(skip: number, take: number, code: string, exchange: string, type: string) {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
	await axios.get(`${_urlApi('Stockexchange')}/api/signal/paging?skip=${skip}&take=${take}&code=${code}&exchange=${exchange}&type=${type}`).then(res => {
		response = res.data.data
	});
	return response
}
export async function getSignalHold() {
  const axios = useNuxtApp().$axios;
  let response = [] as any[]
	await axios.get(`${_urlApi('Stockexchange')}/api/signal/hold`).then(res => {
		response = res.data.data
	});
	return response
}