import { NuxtConfig } from '@nuxt/types';

import webpack from 'webpack';
import CopyWebpackPlugin from "copy-webpack-plugin";
import CopyPatterns from "./client/utils/autoBuild";


const config: NuxtConfig = {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  srcDir: './client/',

  // 调试模式
  dev: true,

  generate:{
    devtools: true
  },

  // ENV Config
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    BASE_URL: process.env.BASE_URL || 'localhost',
    BASE_POST: process.env.BASE_POST || '443',
  },

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web-client',
    htmlAttrs: {
      ['xmlns:v-on']: "http://www.w3.org/1999/xhtml",
      ['xmlns:th']: "http://www.thymeleaf.org",
      ['xmlns:sec']: "http://www.thymeleaf.org/thymeleaf-extras-springsecurity3",
      lang: 'zh-cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  loading: '~/components/MoLoader.vue',

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'vivify.css/vivify.scss',
    '@fortawesome/fontawesome-free/scss/brands.scss',
    '@fortawesome/fontawesome-free/scss/solid.scss',
    '@fortawesome/fontawesome-free/scss/regular.scss',
    '@fortawesome/fontawesome-free/scss/v4-shims.scss',
    '@fortawesome/fontawesome-free/scss/fontawesome.scss',
    '~/assets/styles/custom.scss',
    '~/assets/styles/scss/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/axios',
    '~/plugins/vuelidate',
    '~/plugins/slimscroll'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    // '@nuxtjs/auth',
    '@nuxtjs/dayjs',
    'nuxt-fontawesome',
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
  ],

  axios: {
    debug: process.env.NODE_ENV === "development",
    // https: true,
    host: process.env.HOST_URL || 'localhost',
    port: process.env.BASE_POST || 443,
  },

  dotenv: {
    path: './'
  },

  // dayjs Option
  dayjs: {
    locales: ['zh'],
    defaultLocale: 'zh'
  },

  // bootstrap-vue Option
  bootstrapVue: {
    icons: false,
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false // Or `bvCSS: false`
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devtools: true,
    analyze: false,
    // 外联样式
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: "all",
      }
    },
    babel:{
      compact: false
    },
  },

  vue:{
    config:{
      devtools: true,
      performance: true,
    }
  },

  hooks: {
    generate: {
      done: (generator) => {
        // ~ 在编译完成后复制资源到Java项目更新前端资源
        console.log("Generate done!");
        let compiler = webpack({
          mode: "none",
          target: undefined,
          plugins:[
            new CopyWebpackPlugin({
              patterns: CopyPatterns
            })
          ]
        });
        // console.log("__dirname: %O", path.resolve(__dirname, "dist", "_nuxt"));
        // console.log("__dirname: %O", path.resolve(__dirname, "..", "resource","src","main","resources","static","_nuxt"))
        compiler.run((err, stats) => {
          // console.log("err: %O", err);
          // console.log("stats: %O", stats);
          console.log("Copy File To Java Project Finish");
        });
      }
    }
  }

  // server: {
  //   host: process.env.BASE_URL,
  //   port: process.env.BASE_POST,
  //   // https: {
  //   //   key: fs.readFileSync(path.join(path.resolve("./"), process.env.SSL_KEY!)),
  //   //   cert: fs.readFileSync(path.join(path.resolve("./"), process.env.SSL_CERT!))
  //   // }
  // },

  // serverMiddleware: [
  //   { path: "/api", handler: "../server/app.ts" }
  // ]
}

export default config;