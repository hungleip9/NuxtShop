interface DataChiSoTaiChinh {
  PS: number,
  PB: number,
  EPS: number,
  PE: number,
  TyLeLaiRong: number,
  TyLeLaiGop: number,
  Ebit: number,
  TyLeEbit: number,
  TyLeLaiTuHDKD: number,
  ThanhToanHienHanh: number,
  ThanhToanNhanh: number,
  ThanhToanLaiVay: number,
  NoVCSH: number,
  VongQuayTongTS: number,
  VongQuayHangTonKho: number,
  VongQuayCacKhoanPhaiThu: number,
  VongQuayTSNH: number,
  ROA: number,
  ROE: number,
  ROIC: number,
  ROCE: number,
}
export async function getLishSuNganh(params: {level: number}) {
  const axios = useNuxtApp().$axios
  let response = [] as {
    Day1: number,
    Day5: number,
    Day10: number,
    Day20: number,
    Day60: number,
    Day120: number,
    Day240: number,
    Id: string,
    Name: string,
    Divisor: number
  }[]
  await axios.get(`${ _urlApi('Economic')}/api/industry/history`, {params}).then(res => {
    response = res.data.data || []
  });
  return response
}

export async function getDanhSachLocFa() {
  if (useConst().value.DanhSachLocFa) return
  useLoading().value.Fa = true
  useConst().value.DanhSachLocFa = {}
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/loc-fa`).then(async (res) => {
    const output = res.data.data.reduce((obj: any, item: any) => {
      if (item) {
        const Symbol = item.Code as number;
        const Reference = useGlobal().value.LiveBoardSymbol[Symbol]?.liveboard.Reference || 0
        const { EPS, B, S } = item;
        const PE = EPS ? isnum(Reference * 1000 / EPS) : -999999999999;
        const PB = B ? isnum(Reference * 1000 / B) : -999999999999;
        const PS = S ? isnum(Reference * 1000 / S) : -999999999999;
        const itemObj = {...item, PE, PB, PS}
        obj[Symbol] = itemObj;
      }
      return obj;
    }, {});
    useConst().value.DanhSachLocFa = output
    await nextTick()
    useLoading().value.Fa = false
  }).catch(e => {
    console.log(e)
    useLoading().value.Fa = false
  })
}
export async function getDanhSachLocTa(pass = false) {
  if (!useConst().value.DanhSachLocTa || pass) {
    useLoading().value.Ta = true
    useConst().value.DanhSachLocTa = {}
    const axios = useNuxtApp().$axios
    await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/loc-ta`).then(async (res) => {
      const output = res.data.data.reduce((obj: any, item: any) => {
        const Symbol = item.Code;
        obj[Symbol] = item;
        return obj;
      }, {});
      useConst().value.DanhSachLocTa = output
      await nextTick()
      useLoading().value.Ta = false
    }).catch(e => {
      console.log(e)
      useLoading().value.Ta = false
    })
  }
}
export async function getLichSuGia(params: any) {
  if (!params) return
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${ _urlApi('Economic')}/api/industry/price-history`, {params});
  return res.data.data
}
export async function getNganhRsi() {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${ _urlApi('Economic')}/api/industry/rsi`);
  return res.data.data
}
export async function getNganhRsiCode(Code: any, params: {from: number, to: number}) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${ _urlApi('Economic')}/api/industry/rsi/${Code}`, {params});
  return res.data.data
}
export async function getCongTyRsi(congty: any, params: {from: number, to: number}) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${ _urlApi('Economic')}/api/cong-ty/rsi/${congty}`, {params});
  return res.data.data
}
export async function getStockexchangePriceHistoryChart(Symbols: string, params: {limit: string}) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/chart-multistock/${Symbols}`, {params});
  return res.data.data
}
export async function getDanhSachRSINganh(stock: string) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Economic')}/api/industry/rsi/${stock}/list`);
  return res.data.data
}
export async function getDanhSachNganh(stock: string) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Economic')}/api/industry/${stock}/list`);
  return res.data.data
}
export async function getMarketHistory(Symbol: string, limit: string) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Stockexchange')}/api/market/chart/${Symbol}?limit=${limit}`);
  return res.data.data
}
export async function getTemplate(params: {financialTag: string, takeGroup: boolean}) {
  let response = [] as {
    Name: string,
    Templates: {Id: string, Name: string}[]
  }[]
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/financial/statement/indicator/template`, {params}).then((res) => {
    if (res.data.code != 200) return response
    response = res.data.data || []
  });
  return response
}
export async function getChiSoTaiChinhThaoCap(level: string) {
  let response = [] as {
    Code: string,
    Data: DataChiSoTaiChinh
  }[]
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/financial/statement/indicator/sector?level=${level}`).then((res) => {
    if (res.data.code != 200) return []
    response = res.data.data || []
  }).catch((e) => {
    response = []
  });
  return response
}
export async function getChiSoTaiChinhTheoNganh(code: string) {
  let response = [] as any[]
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/financial/statement/indicator/detail?code=${code}`).then((res) => {
    if (res.data.code != 200) return []
    response = res.data.data || []
  });
  return response
}
export async function getChiSoTaiChinhTheoCongTy(symbol: string, params: {field: string, grouping: boolean}) {
  let response = [] as {
    Code: string,
    Name: string,
    Indicators: {Id: string, Name: string, Value: number}[]
  }[]
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/financial/statement/indicator/${symbol}`, {params}).then((res) => {
    if (res.data.code != 200) return []
    response = res.data.data || []
  });
  return response
}
export async function getIndustryCashFlow() {
  let response = [] as any[]
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/industry/cash-flow`).then((res) => {
    if (res.data.code != 200) return []
    response = res.data.data || []
  });
  return response
}
export async function getFinancialStatementIndicator(sector: string) {
  let response = [] as any[]
  if (!sector) return []
  const axios = useNuxtApp().$axios
  await axios.get(`${ _urlApi('Economic')}/api/financial/statement/indicator/sector/${sector}?grouping=false`).then((res) => {
    response = res.data.data || []
  });
  return response
}