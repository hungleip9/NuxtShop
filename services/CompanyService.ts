
export async function getCompanyBasicInfo(stockCode: string) {
    const axios = useNuxtApp().$axios
    let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/thong-tin-co-ban?symbol=${stockCode}`)
    if (response && response.data) {
      return response.data;
    }
}
export async function getCongTyDsLanhDao(stockCode: string) {
  if (!stockCode) return
  const axios = useNuxtApp().$axios
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/ds-lanh-dao/${stockCode}`)
  if (response && response.data) {
    return response.data;
  }
}
export async function getCongTyDsCongTy(stockCode: string) {
  if (!stockCode) return
  const axios = useNuxtApp().$axios
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/ds-cong-ty-con/${stockCode}`)
  if (response && response.data) {
    return response.data;
  }
}
export async function getCompanyIndicator(stockCode: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/chi-so-tai-chinh?symbol=${stockCode}`);
    if (response && response.data) {
      return response.data;
    }
}
export async function getOrderMatchingIntraday(stockCode: string) {
  if (!stockCode) return
  const axios = useNuxtApp().$axios
  let response = await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/matching-intraday/${stockCode}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getAllCommodity() {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/hang-hoa`);
    if (response && response.data) {
      return response.data;
    }
}
export async function getCommodityHistory(commodity: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/hang-hoa/lich-su/${commodity}`);
    if (response && response.data) {
      return response.data;
    }
}
export async function getDefaultFinancialReport(stockcode: string, type: number, isYear: boolean) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/bctc/${stockcode}?type=${type}&year=${isYear}`);
    if (response && response.data) {
      return response.data;
    }
}
export async function getFinancialReport(qIndexes: any, type: boolean, stockCode: string, reportType: number) {
    let requests = qIndexes.map(async (item: any) => {
        return await getFinancialReportByType(item, type, stockCode, reportType)
    })
    return Promise.all(requests).then(function (data) {
        return data.map(i => i.data)
    });
}
export async function getFinancialReportByType(qIndex: any, type: boolean, stockCode: string, reportType: number) {
    let t;
    if (!type)
        t = getQY(qIndex);
    else if (type)
        t = `${(qIndex + 1) / 4}`;
    else t = '';
    const axios = useNuxtApp().$axios
    return await axios.get(`${_urlApi('Economic')}/api/cong-ty/bctc/${stockCode}/${t}?type=${reportType}`);
}
function getQY(qIndex: number) {
    let db4 = (qIndex + 1) / 4;
    let split = db4.toString().split('.');
    if (split.length == 1) return `${parseInt(split[0]) - 1}/4`;
    switch (split[1]) {
        case '25':
            return `${split[0]}/1`;
        case '5':
            return `${split[0]}/2`
        case '75':
            return `${split[0]}/3`
        default:
            return '';
    }
}
export async function getPagingNews(stockCode: string, type: any, skip: number) {
  const axios = useNuxtApp().$axios
  return await axios.get(`${_urlApi('News')}/api/tin-tuc/cong-ty/${stockCode}?${!type && type != 0? '' : `type=${type}&`}skip=${skip}`);
}
export async function getPriceHistory(stockCode: string, skip: number, take: number) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/price-history/${stockCode}?skip=${skip}&take=${take}`);
    if (response && response.data) {
      return response.data;
    }
}
export function getFileUrl() {
    return 'https://cdn.stockproxx.com';
}
export async function getShareholder(stockCode: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/co-cau-co-dong?stock=${stockCode}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getTransaction(stockCode = '', type = '', skip: number, take: number) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/chi-tiet-giao-dich-co-dong?stockCode=${stockCode}&skip=${skip}&take=${take}${type? '&type=' + type : ''}`)
  if (response && response.data) {
    return response.data;
  }
}
export async function getCompanyDividend(stockCode: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/thay-doi-co-cau-von?stock=${stockCode}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getCompanyDividendByCash(stockCode: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/chi-tra-co-tuc-bang-tien?stock=${stockCode}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getOrderMatchingHistory(stockCode: string, interval: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/chart/${stockCode}?limit=${interval}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getSubSector() {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/industry/list`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getFinancialBaseReport(stockCode: string, year: number, quarter: number) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Economic')}/api/cong-ty/bctc-co-ban/${stockCode}/${year}/${quarter}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getPriceHistoryChart(code: string, limit = '6m') {
  const axios = useNuxtApp().$axios  
  return await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/chart/${code}?limit=${limit}`);
}
export async function getChartIntraday(code: string) {
  const axios = useNuxtApp().$axios  
  let response = await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/chart-intraday/${code}`);
  if (response && response.data) {
    return response.data;
  }
}
export async function getCompanyProprietaryTrading(code: string, skip: number, take: number) {
  const axios = useNuxtApp().$axios
  let response = await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/proprietary-trading/${code}?skip=${skip}&take=${take}`);
  if (response && response.data) {
    return response.data;
  }
}
