export function _navigateToMobile () {
  let url = 'stockproxx://deeplink'
  if (useConst().value.linkShare) {
    url = `${url}${useConst().value.linkShare}`
  }
  // navigateTo(url, { external: true })
  (<any> window).location = url;
}