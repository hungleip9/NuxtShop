export default defineNuxtRouteMiddleware((to: any, from: any) => {
  if (!useDevice().isMobile || to.name.toLowerCase() == 'ptkt') return
  if (!to.query.ref || useAuth().value.isAuthenticated) {
    if (['tai-app', 'devices', 'flash-sale'].includes(to.name.toLowerCase()) || to.name.toLowerCase().includes('mobile')) return
    useConst().value.linkShare = useRoute().fullPath
    return navigateTo('/devices');
  }
  if (!['dang-ky'].includes(to.name.toLowerCase()) && to.query.ref) {
    const url = `/dang-ky?ref=${to.query.ref}`
    return navigateTo(url);
  }
})
