const development = process.env.NODE_ENV !== 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    // baseURL: development ? '/' : 'http://www.supervisionscoaching.at/'
    // baseURL: '/wp-content/themes/intentionally-blank/templates/'
    baseURL: '/de/'
  },
  nitro: {
    preset: 'static',
  },
  runtimeConfig: {
    // Public configuration available to the client-side
    public: {
      apiBase: 'https://www.supervisionscoaching.at/wp-json', // URL of the WordPress backend
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
