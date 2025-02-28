export function _useCookie(nameCookie = '') {
  if (!nameCookie) return
  return useCookie(nameCookie, {
    maxAge: 60 * 60 * 24 * 365
  })
}
export function hasData(data: any) {
  if (data === 0 || (data && data != 'undefined')) return true
  return false
}
export function keyLocalStorage(obj: any) {
  if (!obj.type || !obj.key || obj.key.length === 0 || obj.type.length === 0) {
    return false;
  } else {
    if (obj.type.toUpperCase() === "GET") {
      let data = localStorage.getItem(obj.key)
      if (!data) return false
      return JSON.parse(data);
    } else if (obj.type.toUpperCase() === "SET") {
      localStorage.setItem(obj.key, JSON.stringify(obj.value));
      return true;
    } else {
      return false;
    }
  }
}
export function _createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}
export function _formatPriceVND(price: number) {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
export function _handleAddToCart(id: any) {
  if (!id) {
    _showMsg({type: 'error', summary: 'Thất bại', msg: 'Thêm vào giỏ hàng thất bại!', placement: 'bootomRight'})
    return
  }
  let Cart = keyLocalStorage({ type: 'GET', key: "Cart"}) as any;
  if (!Cart) {
    Cart = {}
  }
  if (!Cart[id]) {
    Cart[id] = 1
  } else {
    Cart[id]++
  }
  keyLocalStorage({ type: 'SET', key: "Cart", value: Cart})
  useConst().value.carts = Cart
  _showMsg({type: 'success', summary: 'Thành công', msg: 'Thêm vào giỏ hàng thành công!', placement: 'bootomRight'})
}
export function _handleDeleteItemInCart(id: any) {
  if (!id) {
    _showMsg({type: 'error', summary: 'Thất bại', msg: 'Xóa vật phẩm thất bại!'})
    return
  }
  let Cart = keyLocalStorage({ type: 'GET', key: "Cart"}) as any;
  if (Cart[id]) {
    delete Cart[id]
  }
  keyLocalStorage({ type: 'SET', key: "Cart", value: Cart})
  useConst().value.carts = Cart
  _showMsg({type: 'success', summary: 'Thành công', msg: 'Xóa sản phẩm thành công!', placement: 'bootomRight'})
}
export function _pushParamsRouter(type: string, data: any) {
  const router = useRouter()
  const route = useRoute()
  const currentQueryParams = { ...route.query, [type]: data };
  router.push({
    query: {
      ...currentQueryParams
    },
  })
}
export function _pushParamsRouterArray(objTypeData: any = {}) {
  if (!objTypeData || !Object.keys(objTypeData).length) return
  const router = useRouter()
  const route = useRoute()
  let currentQueryParams = Object.assign({}, route.query, objTypeData)
  router.push({
    query: {
      ...currentQueryParams
    },
  })
}
export function _deleteParamsRouter(arrType: string[]) {
  const router = useRouter()
  const route = useRoute()
  let currentQueryParams = { ...route.query };
  arrType.forEach(type => {
    delete currentQueryParams[type];
  })
  router.push({
    query: {
      ...currentQueryParams,
    },
  });
}
// Router, popup
export function _openModal(popupName: string) {
  const { $event } = useNuxtApp();
  $event("openModal", popupName);
  useConst().value.hasPopup[popupName] = true
}
export function _closeModal(popupName: string) {
  const { $event } = useNuxtApp();
  $event("closeModal", popupName);
  useConst().value.hasPopup[popupName] = false
}