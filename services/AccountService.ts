import type { TaiKhoanTheoDoi } from "~/models/Global";
import axios from "~/plugins/axios";

export async function removeWatchlist(id: number) {
    let response = [] as TaiKhoanTheoDoi[];
    const axios = useNuxtApp().$axios
    await axios.delete(`${_urlApi('Auth')}/api/account/watch-list/${id}`).then((res) => {
      useGlobal().value.TaiKhoanTheoDoi = [...res.data.data].sort((a: TaiKhoanTheoDoi, b: TaiKhoanTheoDoi) => a.DisplayOrder - b.DisplayOrder) || []
      response = useGlobal().value.TaiKhoanTheoDoi
      _showMsg({type: 'success', summary: 'Thành công', msg: res.data.messages, placement: 'bottomRight'})
    }).catch(e => {
      _showMsg({type: 'error', summary: 'Thất bại', msg: e.response.data.messages, placement: 'bottomRight'})
    })
    return response;
}
export async function addWatchlist(data: TaiKhoanTheoDoi) {
    let response = [] as TaiKhoanTheoDoi[];
    const axios = useNuxtApp().$axios
    await axios.post(`${_urlApi('Auth')}/api/account/watch-list`, data).then((res) => {
      useGlobal().value.TaiKhoanTheoDoi = [...res.data.data].sort((a: TaiKhoanTheoDoi, b: TaiKhoanTheoDoi) => a.DisplayOrder - b.DisplayOrder) || []
      response = useGlobal().value.TaiKhoanTheoDoi || []
      _showMsg({type: 'success', summary: 'Thành công', msg: res.data.messages, placement: 'bottomRight'})
    }).catch(e => {
      _showMsg({type: 'error', summary: 'Thất bại', msg: e.response.data.messages, placement: 'bottomRight'})
    })
    return response;
}
export async function updateWatchlist(data: TaiKhoanTheoDoi) {
  let response = null
  const axios = useNuxtApp().$axios
  await axios.post(`${_urlApi('Auth')}/api/account/watch-list/${data.Id}`, data).then((res) => {
    response = res.data.data
    useGlobal().value.TaiKhoanTheoDoi = [...res.data.data].sort((a: TaiKhoanTheoDoi, b: TaiKhoanTheoDoi) => a.DisplayOrder - b.DisplayOrder) || []
  }).catch(e => {
    _showMsg({type: 'error', summary: 'Thất bại', msg: e.response.data.messages, placement: 'bottomRight'})
  })
  return response;
}
export async function getUpgradeMember() {
  const axios = useNuxtApp().$axios;
	let response = await axios.get(`${_urlApi('Auth')}/api/account/upgrade`);
	if (response && response.data) {
		return response.data;
	}
}
export async function postUpgradeMember(data: {PlanId: number, NumOfMonth: number, CouponCode: string, TransactionId: string, Uuid: string, PaymentMethod: string }) {
  const axios = useNuxtApp().$axios;
	let response = await axios.post(`${_urlApi('Auth')}/api/account/upgrade`, data).then(async (res) => {
    return res.data;
  })
  .catch(error => {
    return error.response.data.messages
  });
  return response;
}

export async function getAffiliate() {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Auth')}/api/account/affiliate`)
  return res.data.data
}

export async function getListAffiliate(skip: number = 0, take: number) {
  const axios = useNuxtApp().$axios
  // đổi api/account/reward
  let res = await axios.get(`${_urlApi('Auth')}/api/account/affiliate-list?skip=${skip}&take=${take}`)
  return res.data.data
}
export async function getAffiliateMember(skip: number = 0) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Auth')}/api/account/affiliate-member/?skip=${skip}`)
  return res.data.data
}

export async function getReferral() {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Auth')}/api/account/referral`)
  return res.data.data
}

export async function taiKhoanMaKm(data: { CouponCode: string, PlanId: number, Month: number }) {
  if (!data) return
  const axios = useNuxtApp().$axios;
	let response = await axios.post(`${_urlApi('Auth')}/api/account/coupon`, data);
	if (response && response.data) {
		return response.data;
	}
}

export async function getPricePlan(planId: number, month: number) {
  const axios = useNuxtApp().$axios;
	let response = await axios.post(`${_urlApi('Auth')}/api/account/plan-price?planId=${planId}&month=${month}`)
	if (response && response.data) {
		return response.data;
	}
}

export async function getHistoryUpgrade(skip: number = 0, take: number = 10) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Auth')}/api/account/transaction-history?skip=${skip}&take=${take}`)
  return res.data.data
}

export async function sortingWatchList(data: number[]) {
  const dataDrop = {
    listId: data
  }
  const axios = useNuxtApp().$axios;
	await axios.post(`${_urlApi('Auth')}/api/account/watch-list/sort`, dataDrop).then(res => {
    useGlobal().value.TaiKhoanTheoDoi = [...res.data.data].sort((a: TaiKhoanTheoDoi, b: TaiKhoanTheoDoi) => a.DisplayOrder - b.DisplayOrder)
  }).catch((e) => {
    console.log(e)
  });
}

export async function getCoupon(coupon: string) {
  const axios = useNuxtApp().$axios
  let res = await axios.get(`${_urlApi('Auth')}/api/account/coupon/${coupon}`)
  return res.data.data
}


