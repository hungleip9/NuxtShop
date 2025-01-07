export async function getMarketFearGreed() {
  const axios = useNuxtApp().$axios
  let response = {} as {
    prediction: {
      status: string,
      message: string,
      recommendation: string
    },
    score: number,
    date: Date
  }
  await axios.get(`${_urlApi('Stockexchange')}/api/market/fear-greed`).then(res => {
    response = res.data.data || {}
  })
  return response
}
export async function getMarketFearGreedHistory() {
  const axios = useNuxtApp().$axios
  let response = [] as {
    score: number,
    status: string,
    label: string,
    date: Date
  }[]
  await axios.get(`${_urlApi('Stockexchange')}/api/market/fear-greed/history`).then(res => {
    response = res.data.data || []
  })
  return response
}