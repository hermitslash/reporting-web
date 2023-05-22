// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Oswald: [200, 300, 400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active',
    },
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
  },
  formkit: {
    configFile: './formkit.config.ts',
  },
  ssr: false,
  runtimeConfig: {
    public: {
      AUTH_TOKEN_URL: '/api/auth/token',
      AUTH_TOKEN_VALIDATE_URL: '/api/auth/token/validate',
      USER_INFO_URL: '/api/auth/userinfo',
      INITIATE_REPORT_URL: '/api/reporting-svc/reportInfoData/initiate',
      ALL_REPORT_INFOS_URL: '/api/reporting-svc/reportInfos',
      REPORT_INFO_BY_INVOICE_NO_URL: '/api/reporting-svc/reportInfo',
      DOWNLOAD_REPORT_INFO_URL: '/api/reporting-svc/download/reportInfo',
      END_OF_DAY_TRANCS_URL: '/api/reporting-svc/end-of-day-transactions',
    },
  },
});
