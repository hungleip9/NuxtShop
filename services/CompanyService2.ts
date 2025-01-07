export async function getTemplate(stockCode: string, statementType: string, isYear: boolean) {
  if (!stockCode || !statementType) return
  const obj = { stockCode, statementType, isYear }
  const axios = useNuxtApp().$axios
  let response = null as any
  await axios.get(`${_urlApi('Economic')}/api/financial/template`, {params: obj}).then(res => {
    response = res
  }).catch(e => {
    console.log('e: ', e)
  })
  if (response && response.data) {
    return response.data;
  }
}
export async function getStatements(stockCode: string, statementType: string, take: number, isYear: boolean) {
  if (!stockCode || !statementType || !take) return
  const obj = { stockCode, statementType, take, isYear }
  const axios = useNuxtApp().$axios
  let response = null as any
  await axios.get(`${_urlApi('Economic')}/api/financial/statements`, {params: obj}).then(res => {
    response = res
  }).catch(e => {
    console.log('e: ', e)
  })
  if (response && response.data) {
    return response.data;
  }
}
export async function getStatement(stockCode: string, statementType: string, year: number, quarter: number ) {
  if (!stockCode || !statementType) return
  let obj = { stockCode, statementType, year } as any
  const axios = useNuxtApp().$axios
  let response = null as any
  if (quarter) {
    obj.quarter = quarter
  }
  await axios.get(`${_urlApi('Economic')}/api/financial/statement`, {params: obj}).then(res => {
    response = res
  }).catch(e => {
    console.log('e: ', e)
  })
  if (response && response.data) {
    return response.data;
  }
}
export async function getFinancialBaseStatement (param: any) {
  if (!param || !param.symbol) return
  let response = null
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/financial/base-statement`, {params: param}).then(res => {
    response = res.data
    response.data.Data = response.data.Data.sort((a: any, b: any) => {
      return a.Year - b.Year || a.Quarter - b.Quarter;
    });
  }).catch(e => {
    console.log(e)
  })
  return response
}
export async function _getFinancialBaseStatementForQuarterYear (param: any) {
  if (!param) return
  const { symbol, quarter, year, group} = param
  let response = null
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/financial/base-statement/${symbol}/${quarter}/${year}/${group}`).then(res => {
    response = res.data
  }).catch(e => {
    console.log(e)
  })
  return response
}
export async function getFinancialStatementIndicator (stock: string, params: {field: string, grouping: boolean}) {
  let response = null
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/financial/statement/indicator/${stock}`, {params}).then(res => {
    response = res.data.data
  }).catch(e => {
    console.log(e)
  })
  return response
}
export async function getChiSoTaiChinhTheoNganh(symbol: string, params: {field: string, grouping: boolean}) {
  let response = [] as {
    Code: string,
    Name: string,
    Indicators: {Id: string, Name: string, Value: number}[]
  }[]
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/financial/statement/indicator/sector/${symbol}`, {params}).then((res) => {
    if (res.data.code != 200) return []
    response = res.data.data || []
  });
  return response
}