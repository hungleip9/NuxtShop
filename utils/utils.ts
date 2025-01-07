export function _openOrHideSidebar () {
  useGlobal().value.showSidebar = !useGlobal().value.showSidebar
}
export function _t(key: string) {
  if (useI18n().locale.value == 'en') {
    return useI18n().t(key)
  }
  return key
}
export function _useCookie(nameCookie = '') {
  if (!nameCookie) return
  return useCookie(nameCookie, {
    maxAge: 60 * 60 * 24 * 365
  })
}