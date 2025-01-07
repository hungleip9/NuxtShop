export async function getTopCoPhieu(type: string) {
  interface Response {
    StockCode: string,
    QuarterProfitGrowthRate: number,
    QuarterProfitAfter: number,
    QuarterProfitGrowthRateText: string,
    ROE: number,
    DividendRate: number,
    PB: number,
    NoVCSH: number,
    KLGD: number,
    KLTB3: number,
    KLTB5: number,
    TkCdk: number,
    Year5ProfitGrowth: {
      Key: number,
      Value: number,
    }[],
    Year5Revenue: {
      Key: number,
      Value: number,
    }[],
    CapitalMarket: number,
  }
  let response = [] as Response[]
  if (!type) return response
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/top-co-phieu/${type}`).then((res) => {
    response = res.data.data || []
  })
  return response
}