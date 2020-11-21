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
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    'nuxt-purgecss',
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      './assets/scss/*.scss',
      './assets/scss/_mixins.scss',
      './assets/scss/breakpoints.scss',
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    ['@nuxt/http', {
      baseURL: ''
    }],
    'nuxt-i18n'
  ],

  i18n: {}
}
