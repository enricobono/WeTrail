export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-graphql-client'],
  runtimeConfig: {
    public: {
      ENVIRONMENT_NAME: process.env.ENVIRONMENT_NAME,
      GQL_HOST: process.env.API_URL
    }
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  imports: {
    dirs: ['./stores']
  },
  routeRules: {
    '/': { redirect: '/travels' }
  },
  // plugins: [
  //   './plugins/something'
  // ],
  helpers: [
    './helpers/formatDate'
  ]

})
