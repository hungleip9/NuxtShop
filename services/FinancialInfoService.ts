export async function getBankInterest(isOnline: boolean) {
	const axios = useNuxtApp().$axios;
	let response = await axios.get(
		`${_urlApi('Economic')}/api/tai-chinh/lai-suat?isOnline=${isOnline}`
	);
	if (response && response.data) {
		return response.data;
	}
}
export async function getBankInterestHistory(bankId: number, from: number, to: number, isOnline: boolean) {
	const axios = useNuxtApp().$axios;
	let response = await axios.get(
		`${_urlApi('Economic')}/api/tai-chinh/lai-suat/${bankId}?from=${from}&to=${to}&isOnline=${isOnline}`
	);
	if (response && response.data) {
		return response.data;
	}
}
export async function getBankExchangeRate() {
	const axios = useNuxtApp().$axios;
	let response = await axios.get(`${_urlApi('Economic')}/api/tai-chinh/ty-gia`);
	if (response && response.data) {
		return response.data;
	}
}
export async function getBankExchangeRateHistory(bankId: number, from: number, to: number) {
	const axios = useNuxtApp().$axios;
	let response = await axios.get(
		`${_urlApi('Economic')}/api/tai-chinh/ty-gia/${bankId}?from=${from}&to=${to}`
	);
	if (response && response.data) {
		return response.data;
	}
}
export async function getListBank() {
  const axios = useNuxtApp().$axios;
  let response = await axios.get(`${_urlApi('Economic')}/api/tai-chinh/bank-list`);
  if (response && response.data) {
		return response.data;
	}
}
