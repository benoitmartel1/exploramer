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
    script: [
      {
        src: ' https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/dist/mindar-image.prod.js',
      },
      { src: ' https://aframe.io/releases/1.2.0/aframe.min.js' },
      {
        src: ' https://unpkg.com/aframe-transparent-video-shader@1.0.3/dist/aframe-transparent-video-shader.umd.js',
      },
      {
        src: ' https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/dist/mindar-image-aframe.prod.js',
      },
    ],
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
