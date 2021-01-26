export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-spa-boilerplate',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'nuxt-spa-boilerplate' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    'nuxt-purgecss',
    '@nuxtjs/style-resources'
  ],

  purgeCSS: {
    whiteList: () =>['dark-mode']
  },

  css: [
    './assets/css/fonts.css',
    './assets/css/theme.css',
  ],

  styleResources: {
    scss: [
      './assets/scss/main.scss'
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/color-mode' //only necassary if color templates are included
  ],

  axios: {
    browserBaseURL: ''
  },

  i18n: {}
}
