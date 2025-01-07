export async function getLocMoHinh(moHinh: string) {
  let response = null as any
  const axios = useNuxtApp().$axios;
  await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/loc-mo-hinh/${moHinh}`).then(res => {
    response = res.data.data || null
  })
  return response;
}
export async function getTaiKhoanBoLoc() {
  if (!useAuth().value.isAuthenticated) return
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Auth')}/api/account/filter`).then(res => {
    useConst().value.DanhSachBoLoc = res.data.data.map((e: any) => {
      const Value = JSON.parse(e.Value)
      return {...e, Value}
    })
  });
}
export async function createTaiKhoanBoLoc(data: {Name: string, Value: string}) {
  let Id = null
  if (!useAuth().value.isAuthenticated) return null
  const axios = useNuxtApp().$axios
  await axios.post(`${_urlApi('Auth')}/api/account/filter`, data).then(res => {
    if (res.data.data && res.data.data.length) {
      Id = res.data.data.at(-1).Id
      useConst().value.DanhSachBoLoc = res.data.data.map((e: any) => {
        const Value = JSON.parse(e.Value)
        return {...e, Value}
      })
    }
    if (res.data.messages) {
      _showMsg({type: 'success', msg: res.data.messages})
    }
  });
  if (Id) {
    const { $event } = useNuxtApp();
    $event("dropIdBoLocDaLuu", Id);
  }
}
export async function updateTaiKhoanBoLoc(data: any) {
  if (!useAuth().value.isAuthenticated || !data) return
  const axios = useNuxtApp().$axios
  await axios.post(`${_urlApi('Auth')}/api/account/filter/${data.Id}`, data).then(res => {
    if (res.data.messages) {
      _showMsg({type: 'success', msg: res.data.messages})
    }
    useConst().value.DanhSachBoLoc = res.data.data.map((e: any) => {
      const Value = JSON.parse(e.Value)
      return {...e, Value}
    })
  });
}
export async function deleteTaiKhoanBoLoc(id: any) {
  if (!useAuth().value.isAuthenticated) return
  const axios = useNuxtApp().$axios
  await axios.delete(`${_urlApi('Auth')}/api/account/filter/${id}`).then(res => {
    if (res.data.messages) {
      _showMsg({type: 'success', msg: res.data.messages})
    }
    useConst().value.DanhSachBoLoc = res.data.data.map((e: any) => {
      const Value = JSON.parse(e.Value)
      return {...e, Value}
    })
  });
}
export async function locCoTuc(type: number) {
  if (!type) return []
  let arr = [] as any
  const axios = useNuxtApp().$axios
  await axios.get(`${_urlApi('Stockexchange')}/api/stockexchange/loc-co-tuc?type=${type}`).then(res => {
    arr = res.data.data.Payment.concat(res.data.data.Structure)
    arr = arr.map((e: any) => {
      return {
        ...e,
        Code: e.StockCode,
        Phase: e.Phase || '-',
        DateExRights: new Date(e.DateExRights).getTime(),
        ValueOfPayment: e.ValueOfPayment || '-',
        Ratio: e.Ratio || '-'
      }
    }).sort((a: any, b: any) => b.DateExRights - a.DateExRights) || []
  });
  return arr
}