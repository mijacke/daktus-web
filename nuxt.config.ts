export default defineNuxtConfig({
  compatibilityDate: '2026-08-23',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/main.css'],
  nitro: {
    // statická 404 (pages/404.vue) nie je nikde linkovaná — crawler ju sám nenájde
    prerender: { routes: ['/404'] },
  },
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
        { property: 'og:title', content: 'Daktus — weby, softvér & appky' },
        {
          property: 'og:description',
          content: 'Daktus je štúdio pre dizajn a vývoj. Navrhujeme a staviame weby, softvér a mobilné aplikácie — od prvej skice až po ostrú prevádzku.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://daktus.sk' },
        { property: 'og:image', content: 'https://daktus.sk/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://daktus.sk/og.png' },
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
