export default defineNuxtConfig({
  compatibilityDate: '2026-08-23',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      '@pandacss/dev/postcss': {},
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'sk' },
      title: 'Daktus — weby, softvér & appky',
      meta: [
        {
          name: 'description',
          content: 'Daktus je štúdio pre dizajn a vývoj. Navrhujeme a staviame weby, softvér a mobilné aplikácie — od prvej skice až po ostrú prevádzku.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=Instrument+Sans:wght@400;500;600&display=swap' },
      ],
    },
  },
})
