//  search
export async function searchCongTy(search: string) {
  if (!search) return
  let response = [] as {
    Id: string,
    Name: string
  }[]
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/cong-ty/tim-kiem/${search}`).then(res => {
    response = res.data.data || []
  })
  return response
}
export async function searchLanhDao(searchString: string) {
  interface DataLanhDao {
    LeaderDetailId: number,
    Name: string,
    Birthday: string,
    Gender: string,
    PhotoUrl: string,
    Positions: Positions[]
  }
  interface Positions {
    CompanyId: number,
    StockCode: string,
    CompanyName: string,
    PositionName: string,
    DisplayOrder: number
  }
  let response = [] as DataLanhDao[]
  if (!searchString) return response
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/lanh-dao/tim-kiem/${searchString}`).then(res => {
    response = res.data.data || []
  });
  return response
}
export async function searchCommodity(search: string) {
  if (!search) return
  useGlobal().value.CommodityRealTime = {}
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/commodity/search?keyword=${search}`).then(res => {
    const arrMap = res.data.data.filter((e: any) => e.Type == 'Commodity') || []
    if (!arrMap.length) return
    arrMap.forEach((e: any) => {
      useGlobal().value.CommodityRealTime[e.Id] = e
    })
  }).catch((e) => {})
}
export async function getCommodity(code: string) {
  const axios = useNuxtApp().$axios
  const codeMap = code.toLowerCase()
  await axios.get(`${_urlApi('Economic')}/api/commodity/${codeMap}`).then(res => {
    const obj = res.data.data || null
    if (!obj || !Object.keys(obj).length) return
    const {Code, UpdateCode} = obj
    const newObj = {
      ...obj,
      Id: Code,
      Code: UpdateCode
    }
    useGlobal().value.CommodityRealTime[newObj.Id] = newObj
  }).catch((e) => {})
}
export const handleLogout = useDebounceFn(async() => {
  const token = _useCookie('token') as any
  const refresh = _useCookie('refresh') as any
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/logout/${refresh.value}`)
  await nextTick()
  token.value = null
  useAuth().value.isAuthenticated = false;
  refresh.value = null
  keyLocalStorage({ type: 'SET', key: "userInfo", value: "{}" })
  keyLocalStorage({ type: 'SET', key: "dataSaveAlert", value: [] })
  keyLocalStorage({ type: 'SET', key: "CanhBaoSwitch", value: false })
  useAuth().value.userInfo = {};
  useGlobal().value.Permission = ''
  useGlobal().value.FeatureToggle = []
  useGlobal().value.TaiKhoanTheoDoi = []
  await nextTick()
  if (useDevice().isMobile) {
    navigateTo('/devices')
    return
  }
}, 500, {maxWait: 500});

// Notification
export async function getNotification(skip: number, take: number) {
  if (!useAuth().value.isAuthenticated) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/notification?skip=${skip}&take=${take}`).then((res) => {
    useConst().value.notification = [...res.data.data.notifications]
  }).catch(e => {
  })
}
export async function getNotificationReadAll() {
  if (!useAuth().value.isAuthenticated) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/notification/readall`).then((res) => {
    useConst().value.notification = useConst().value.notification.map(e => {
      return {
        ...e,
        IsRead: true
      }
    })
  }).catch(e => {})
}
export async function readNotificationById(id: string) {
  if (!useAuth().value.isAuthenticated) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/notification/read/${id}`).then((res) => {
  }).catch(e => {})
}