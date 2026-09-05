export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  devServer: {
    host: '127.0.0.1',
    port: 3000
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      exclude: ['lucide-vue-next']
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'OFFICEPEAK | Современная офисная мебель',
      meta: [
        { name: 'description', content: 'Каталог офисной мебели и проектных решений OFFICEPEAK для бизнеса и организаций.' },
        { name: 'theme-color', content: '#171A19' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' },
        { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="%23171A19"/><text x="50%25" y="58%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-family="Arial">OP</text></svg>' },
      ]
    }
  }
})
