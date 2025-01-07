// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  plugins: [
    { src: '~/plugins/first' },
  ],
  postcss: {
    plugins: {
      tailwindcss: {}
    }
  },
  modules: ['@element-plus/nuxt', '@nuxtjs/color-mode', '@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  },
  colorMode: {
    preference: 'system', // Sử dụng chế độ màu của hệ thống làm mặc định
    fallback: 'light',    // Sử dụng chế độ sáng nếu không tìm thấy thiết lập hệ thống
    classSuffix: '',
  },
  elementPlus: { 
    importStyle: 'css',
  },
  css: [
    'element-plus/theme-chalk/dark/css-vars.css',
    '@/assets/css/main.css',
    '@/assets/css/style.css',
    '@/assets/scss/style.scss',
    '@/assets/scss/element-plus.scss',
  ]
})