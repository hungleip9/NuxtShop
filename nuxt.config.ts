export default defineNuxtConfig({
  devtools: { enabled: false },

  experimental: {
    sharedPrerenderData: true
  },

  ssr: false,

  css: [
    'vue-virtual-scroller/dist/vue-virtual-scroller.css',
    '@/assets/css/main.css',
    '@/assets/css/style.css',
    '@/assets/css/base.css',
    '@/assets/css/loading.css',
    '@/assets/scss/style.scss',
    '@/assets/scss/base.scss',
    '@/assets/scss/themes-ant-vue.scss',
    '@/assets/scss/themes-ag-grid-vue.scss'
  ],

  build: {
    transpile: ['']
  },

  nitro: {
    preset: 'node-server',
    compressPublicAssets: true
  },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  components: true,

  plugins: [
    { src: '~/plugins/axios', mode: 'client' },
    { src: '~/plugins/vue-image-crop-upload', mode: 'client' },
    { src: '~/plugins/vue-virtual-scroller', mode: 'client' },
    { src: '~/plugins/first', mode: 'client' },
  ],

  runtimeConfig: {
    public: {
    }
  },

  modules: [
    '@nuxtjs/device',
    'nuxt-gtag',
    '@zadigetvoltaire/nuxt-gtm',
    '@ant-design-vue/nuxt',
    'nuxt-build-cache',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n'
  ],

  gtm: {
    id: 'GTM-NVZX6GQP',
    defer: false,
    compatibility: false,
    enabled: true,
    debug: false,
    loadScript: true,
    enableRouterSync: true,
    trackOnNextTick: false,
    devtools: true
  },

  gtag: {
    id: 'G-FK4ZY1C381',
    config: {
      page_title: 'Phần mềm phân tích chứng khoán số 1 Việt Nam'
    }
  },

  i18n: {
    vueI18n: './i18n.config.ts',
  },
});