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
  ssr: true,
  runtimeConfig: {
    public: {
      RS_BASE_URL: process.env.RS_BASE_URL,
      AUTH_TOKEN_URL: process.env.AUTH_TOKEN_URL,
      AUTH_TOKEN_VALIDATE_URL: process.env.AUTH_TOKEN_VALIDATE_URL,
      USER_INFO_URL: process.env.USER_INFO_URL,
      INITIATE_REPORT_URL: process.env.INITIATE_REPORT_URL,
      ALL_REPORT_INFOS_URL: process.env.ALL_REPORT_INFOS_URL,
      REPORT_INFO_BY_INVOICE_NO_URL: process.env.REPORT_INFO_BY_INVOICE_NO_URL,
      DOWNLOAD_REPORT_INFO_URL: process.env.DOWNLOAD_REPORT_INFO_URL,
      END_OF_DAY_TRANCS_URL: process.env.END_OF_DAY_TRANCS_URL,
    },
  },
});
