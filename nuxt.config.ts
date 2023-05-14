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
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:9809/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  },
});
