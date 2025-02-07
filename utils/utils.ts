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
    _showMsg({type: 'error', summary: 'Thất bại', msg: 'Thêm vào giỏ hàng thất bại!'})
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
  _showMsg({type: 'success', summary: 'Thành công', msg: 'Thêm vào giỏ hàng thành công!'})
}