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
        { name: 'description', content: 'Daktus — webdizajn a vývoj. Pripravujeme.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@112,700;112,800&family=Instrument+Sans:wght@400;500&display=swap' },
      ],
    },
  },
})
