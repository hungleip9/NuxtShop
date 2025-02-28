export function _openModalLogin(type: string) {
  _pushParamsRouter('login_type', type)
}
export function _openModalLoginArrayKey(type: string, action: any = {}) {
  if (!type || !action || !Object.keys(action).length) return
  let obj = {
    'login_type': type,
  }
  obj = Object.assign({}, obj, action)
  _pushParamsRouterArray(obj)
}