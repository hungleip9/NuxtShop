import en from '~/lang/en.json'
import vi from '~/lang/vi.json'
export default defineI18nConfig(() => ({
  legacy: false,
  locales: 'vi',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: false, // Chỉ chuyển hướng khi chưa có giá trị cookie
    fallbackLocale: 'vi', // Ngôn ngữ dự phòng
  },
  messages: {
    en: en,
    vi: vi
  }
}))