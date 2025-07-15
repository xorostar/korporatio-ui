export default defineNuxtConfig({
  devtools: { enabled: true },

  // Add compatibility date
  compatibilityDate: "2025-07-15",

  // Add required modules
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],

  // Add Tailwind CSS
  css: ["~/assets/css/main.css"],

  // TypeScript configuration
  typescript: {
    strict: false,
    typeCheck: false,
  },

  // Auto-imports configuration
  imports: {
    autoImport: true,
  },

  // App configuration
  app: {
    head: {
      title: "BVI Company Formation - Nuxt 3 TypeScript",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "BVI Company Formation with Nuxt 3, TypeScript and Composition API",
        },
      ],
    },
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: "123",

    // Public keys (exposed to client-side)
    public: {
      apiBase: "/api",
    },
  },
});
