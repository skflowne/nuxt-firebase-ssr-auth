module.exports.default = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/firebase"],

  firebase: {
    config: {
      apiKey: "AIzaSyC5Yz_XKNs9nnYQcKIIAMRWj26cBUS10LQ",
      authDomain: "nuxt-firebase-ssr-auth.firebaseapp.com",
      databaseURL: "https://nuxt-firebase-ssr-auth.firebaseio.com",
      projectId: "nuxt-firebase-ssr-auth",
      storageBucket: "nuxt-firebase-ssr-auth.appspot.com",
      messagingSenderId: "339794081337",
      appId: "1:339794081337:web:d10b4270d3bd7e45be3fe8"
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: "onAuthStateChanged"
        },
        ssr: true
      }
    }
  },
  pwa: {
    // disable the modules you don't need
    meta: false,
    icon: false,
    // if you omit a module key form configuration sensible defaults will be applied
    // manifest: false,

    workbox: {
      importScripts: [
        // ...
        "/firebase-auth-sw.js"
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: false
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
