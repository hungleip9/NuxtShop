export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  experimental: {
    sharedPrerenderData: true
  },
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
      BASE_URL: process.env.BASE_URL
    }
  },

  modules: [
    '@nuxtjs/device',
    '@ant-design-vue/nuxt',
    'nuxt-build-cache',
    '@vueuse/nuxt',
    '@nuxt/image',
  ]
});