import type { LiveBoardData, LiveboardFuture, MarketInfo, DanhSachNhomNganh, TaiKhoanTheoDoi, NganhCap } from "~/models/Global"
import { getInfo, updateProfile } from "~~/services/Login"
export async function getliveboard() {
  try {
    useGlobal().value.LiveBoardSymbol = {}
    await nextTick()
    const axios = useNuxtApp().$axios
    const res = await axios.get(`${_urlApi('Stockexchange')}/api/StockExchange/liveboard`);
    if (!res.data.data || !res.data.data.length) return
    const arr = res.data.data.map((e: LiveBoardData) => {
      if (e.liveboard.Close == 0) {
        e.liveboard.Close = e.liveboard.Reference
      }
      return e
    })
    const output = arr.reduce((obj: { [key: string]: LiveBoardData }, item: LiveBoardData) => {
      const { Symbol } = item.liveboard;
      obj[Symbol as string] = item;
      return obj;
    }, {});
    useGlobal().value.LiveBoardSymbol = output
  } catch (error) {
    console.log(error);
  }
}
export async function getliveboardFuture() {
  if (useGlobal().value.liveboardFuture.length) return
  useGlobal().value.liveboardFuture = []
  await nextTick()
  const axios = useNuxtApp().$axios
  const res = await axios.get(`${ _urlApi('Stockexchange')}/api/StockExchange/liveboard-future`);
  useGlobal().value.liveboardFuture = res.data.data.map((e: LiveboardFuture) => {
    const Reference = e.Close - e.Change
    return {
      ...e,
      Reference: Reference
    }
  }) || []
  const output = res.data.data.reduce((obj: { [key: string]: LiveboardFuture }, item: LiveboardFuture) => {
    const Code = item.Code
    obj[Code as string] = item
    return obj;
  }, {});
  useGlobal().value.liveboardFutureSymbol = output
}
export async function getDanhSachNhomNganh() {
  if (useGlobal().value.DanhSachNhomNganh.length) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Economic')}/api/industry/list`).then((res) => {
    useGlobal().value.DanhSachNhomNganh = res.data.data
    getNganhCap1(res.data.data)
    getNganhCap4(res.data.data)
  });
}
export async function getWatchlist() {
  if (useGlobal().value.TaiKhoanTheoDoi.length) return useGlobal().value.TaiKhoanTheoDoi || []
  if (!useAuth().value.isAuthenticated) return [];
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/watch-list`).then((response) => {
    useGlobal().value.TaiKhoanTheoDoi = response.data.data.sort((a: TaiKhoanTheoDoi, b: TaiKhoanTheoDoi) => a.DisplayOrder - b.DisplayOrder);
    return useGlobal().value.TaiKhoanTheoDoi || []
  }).catch((e) => {
    useGlobal().value.TaiKhoanTheoDoi = []
    return useGlobal().value.TaiKhoanTheoDoi || []
  })
}
export async function getMarketInfo(pass = false) {
  if (Object.keys(useGlobal().value.MarketInfo).length && !pass) return
  useGlobal().value.MarketInfo = []
  await nextTick()
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Stockexchange')}/api/market/info`).then(res => {
    const arr = res.data.data || []
    if (!arr || !arr.length) return
    arr.forEach((elm: MarketInfo) => {
      if (elm.Symbol == "HNX30") return
      if (elm.Open == 0) {
        elm.Open = elm.Close
        elm.High = elm.Close
        elm.Low = elm.Close
      }
      useGlobal().value.MarketInfo[elm.Symbol] = {...elm}
    });
  }).catch(() => {
    useGlobal().value.MarketInfo = {
      VNINDEX: {},
      VN30: {},
      HNXINDEX: {},
      UPINDEX: {}
    }
  })
}
export async function notificationRegister(token: String) {
  const tokenLogin = _useCookie('token') as any
  if (!token || !tokenLogin.value) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/notification/register/${token}`)
}
function getNganhCap1 (data: DanhSachNhomNganh[]) {
  if (!data) return
  const unique = data.reduce((acc: DanhSachNhomNganh[], obj: DanhSachNhomNganh) => {
    const found = acc.some(
      (uniqueObj: DanhSachNhomNganh) =>
        obj.SectorID === uniqueObj.SectorID &&
        obj.SectorName === uniqueObj.SectorName
    );
    if (!found) acc.push(obj);
    return acc;
  }, []);
  const arrMap = unique.map((e: DanhSachNhomNganh) => {
    return {
      name: e.SectorName,
      SectorID: e.SectorID,
    }
  })
  useConst().value.nganhCap1 = _sortString(arrMap, 'name') || [] as NganhCap[]
}

function getNganhCap4 (data: DanhSachNhomNganh[]) {
  if (!data) return
  const unique4 = data.reduce((acc: DanhSachNhomNganh[], obj: DanhSachNhomNganh) => {
    const found = acc.some(
      (uniqueObj: DanhSachNhomNganh) =>
        obj.SubSectorID === uniqueObj.SubSectorID
      );
    if (!found) {
      acc.push(obj);
    }
    return acc;
  }, []);
  const arrMap = unique4.map((e) => {
    return {
      name: e.SubSectorName,
      SectorID: e.SubSectorID,
    }
  })
  useConst().value.nganhCap4 = _sortString(arrMap, 'name') || [] as NganhCap[]
}
export async function getTimeServer() {
  let response = null
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/config/time`).then(res => {
    response = res.data
  }).catch(e => {
    response = null
  })
  return response
}
export async function CapNhatTaiKhoan(data: any) {
  if (!data) return null
  let response = null
  await updateProfile(data).then(async (res) => {
    response = res
  })
  return response
}
export async function getInfoUser () {
  const token = _useCookie('token') as any
  if (!token.value) return
  await getInfo()
}
export async function getThongBao() {
  const token = _useCookie('token') as any
  if (!token.value) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/setting/notification`).then(res => {
    getObjNotificationSubscribe(res.data.data)
  }).catch((e) => {
    useConst().value.objNotificationSubscribe = {
      noti_general: false,
      noti_commodity: false,
      noti_dividend: false,
      noti_businessresult: false,
      noti_hotnews: false,
      noti_recommendation: false,
    }
  })
}
export async function getObjNotificationSubscribe(data: any) {
  const arrKeys = Object.keys(data) || []
  if (!data || !arrKeys.length) {
    useConst().value.objNotificationSubscribe = {}
    return
  }
  arrKeys.forEach(key => {
    useConst().value.objNotificationSubscribe[key] = data[key] == "true" ? true : false
  })
}
export async function getConfig(includes: string) {
  const axios = useNuxtApp().$axios
  return await axios.get(`${_urlApi('Auth')}/api/config`, {params: {includes}})
}