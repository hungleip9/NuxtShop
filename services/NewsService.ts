export async function getRelatedNews(stockCode: string[], skip: number) {
    let stcd = stockCode.join('%2C');
    const axios = useNuxtApp().$axios
    let response = [] as any
    await axios.get(`${_urlApi('News')}/api/tin-tuc/cong-ty/${stcd}?skip=${skip}`).then(res => {
      response = res.data.data || []
    })
    return response;
}

export async function getNewsCategory() {
  interface Response {
    NewsCategoryId: number,
    NewsCategoryName: string,
    ParentId: number,
    DisplayOrder: number,
    News: {
      NewsId: number,
      Title: string,
      Summary: string,
      MetaTitle: string,
      MetaKeywords: string,
      StockCode: string,
      MetaDescription: string,
      Thumbnail: string,
      Author: string,
      PostDate: Date,
      Hit: number,
      Type: number,
      TypeName: string,
      NewsCategoryId: number,
      NewsCategoryName: string,
      Source: string,
    }[]
  }
  let response = [] as Response[]
    const axios = useNuxtApp().$axios
    await axios.get(`${_urlApi('News')}/api/tin-tuc`).then(res => {
      response = res.data.data || [] as Response[]
    })
    return response;
}

export async function getNews(categoryId: number, skip: number = 0, take: number = 20) {
  let response = [] as any[]
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('News')}/api/tin-tuc/danh-muc?ids=${categoryId}&skip=${skip}&take=${take}`).then(res => {
    response = res.data.data || []
  });
  return response
}

export async function getNewsMenu(isMarket = false) {
  let response = [] as any
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('News')}/api/tin-tuc/menu?isMarket=${isMarket}`).then(res => {
    response = res.data.data || []
  });
  return response;
}

export async function getHomePageNews(categoryId: number, take: number) {
  const axios = useNuxtApp().$axios
  let response = [] as any
  await axios.get(`${_urlApi('News')}/api/tin-tuc/noi-bat?categoryId=${categoryId}&take=${take}`).then(res => {
    response = res.data.data || []
  });
  return response;
}
// MostHit
export async function getHomeMostHitNews(categoryId: number, take: number = 0) {
  const axios = useNuxtApp().$axios
  let response = [] as any
  await axios.get(`${_urlApi('News')}/api/tin-tuc/xem-nhieu?categoryId=${categoryId}&take=${take}`).then(res => {
    response = res.data.data || []
  });
  return response;
}
// Load news
export async function getHomeLoadMoreNews(categoryId: number, skip: number, take: number, ids: string) {
  const axios = useNuxtApp().$axios
  let response = [] as any
  await axios.get(`${_urlApi('News')}/api/tin-tuc/thuong?categoryId=${categoryId}&skip=${skip}&take=${take}&ids=${ids}`).then(res => {
    response = res.data.data || []
  });
  return response;
}

export function getNewsDetail(id: any) {
  const axios = useNuxtApp().$axios
  return axios.get(`${_urlApi('News')}/api/tin-tuc/chi-tiet/${id}`)
}
export async function getNewsDetailUrl(url: string) {
  const axios = useNuxtApp().$axios
  return await axios.get(`${_urlApi('News')}/api/tin-tuc/${url}`)
}