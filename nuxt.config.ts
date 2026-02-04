export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate'
  ],
  pinia: {
    storesDirs: ['./app/stores/**'],
  },
  imports: {
    dirs: ['stores']
  },
  ssr: false,
  css: ['~/assets/css/main.css']
});
