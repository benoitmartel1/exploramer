module.exports = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'exploramer',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    '~/assets/css/fonts.css',
    '~/assets/css/transition.css',
  ],

  plugins: [],

  components: true,

  buildModules: [],
  router: {
    // base: '/dist/',
  },

  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://localhost:3030', // Used as fallback if no runtime config is provided
  },

  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },
  dev: process.env.NODE_ENV === 'dev',
}
