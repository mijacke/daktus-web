export default defineNuxtConfig({
  compatibilityDate: '2026-08-23',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  postcss: {
    plugins: {
      '@pandacss/dev/postcss': {},
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'sk' },
      title: 'Daktus — webdizajn a vývoj',
      meta: [
        { name: 'description', content: 'Daktus je štúdio pre dizajn a vývoj. Navrhujeme a staviame weby, softvér a aplikácie.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap' },
      ],
    },
  },
})
