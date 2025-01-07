import type { UserInfo } from '~/models/Global';
import { getNotification } from '~~/services/Header';
import { getWatchlist } from '~/services/FirstApi';
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
export async function _getAffterLogin() {
  if (!useAuth().value.isAuthenticated) {
    // nếu không có token thì clear
    keyLocalStorage({ type: 'SET', key: "userInfo", value: "{}" })
    useAuth().value.userInfo = {} as UserInfo;
  } else {
    // lấy danh sách thông báo
    await getNotification(0, 100)
    await getWatchlist()
    // firebase
    useNuxtApp().$authenticateFireBase()
  }
}