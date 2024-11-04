import fs from 'node:fs'
import path from 'node:path'
import { quasar } from '@quasar/vite-plugin'
import UnheadVite from '@unhead/addons/vite'
import { unheadVueComposablesImports } from '@unhead/vue'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Imagemin from 'unplugin-imagemin/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import generateSitemap from 'vite-ssg-sitemap'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd())
  const base = env.VITE_BASE_URL || '/'

  return {
    base,

    resolve: {
      alias: {
        'lodash': 'lodash-es',
        '~/': `${path.resolve(import.meta.dirname, 'src')}/`,
      },
    },

    define: {
      'import.meta.env.VERSION': JSON.stringify(version),
    },

    plugins: [
      Vue(),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue', '.md'],
        exclude: ['src/pages/README.md'],
        dts: 'types/typed-router.d.ts',
      }),

      // https://github.com/unjs/unhead
      UnheadVite({ treeshake: { enabled: true } }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts({
        importMode(name) {
          return name === 'home' ? 'sync' : 'async'
        },
      }),

      // https://github.com/antfu/unplugin-icons
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        transform(svg) {
          return svg.replace(/^<svg /, '<svg fill="currentColor" ')
        },
        customCollections: {
          app: FileSystemIconLoader('./src/assets/img/icons'),
        },
        // iconCustomizer(collection, icon, props) {
        //   if (collection === 'app') {
        //     props.class = 'app-icon'
        //   }
        // },
      }),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          '@vueuse/core',
          unheadVueComposablesImports,
          VueRouterAutoImports,
          {
            // 'i18next-vue': ['useTranslation'],
            'vue-router/auto': ['useLink'],
            'quasar': [
              'useQuasar',
            ],
          },
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: ['src/hooks/**', 'src/stores/**'],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'types/components.d.ts',
        resolvers: [
          IconsResolver({
            customCollections: ['app'],
          }),
        ],
      }),
      // https://github.com/quasarframework/quasar
      quasar({
        autoImportComponentCase: 'kebab',
        runMode: isSsrBuild ? 'ssr-server' : 'web-client',
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
        // navigateFallback: 'index.html',
        // navigateFallbackAllowlist: [/^index.html$/],
          navigateFallback: null,
          globPatterns: ['**/*.{js,css,webp,png,svg,gif,ico,html,json,txt}'],
          maximumFileSizeToCacheInBytes: 5_000_000,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/www\.googletagmanager\.com\/gtm\.js/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gtm',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        includeAssets: [
          'img/apple-touch-icon.png',
          'img/favicon.svg',
          'img/favicon.ico',
          'img/robots.txt',
        ],
        manifest: {
        // start_url: '/?utm_source=pwa',
          name: process.env.VITE_APP_NAME ?? 'jpool',
          short_name: process.env.VITE_APP_SHORT_NAME ?? process.env.VITE_APP_NAME ?? 'jpool',
          description: process.env.VITE_APP_DESCRIPTION,
          theme_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: 'img/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'img/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'img/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),

      // https://github.com/unplugin/unplugin-imagemin
      Imagemin({
        beforeBundle: true,
      }),

      // // https://github.com/davidmyersdev/vite-plugin-node-polyfills
      // nodePolyfills(),

      // // https://github.com/webfansplz/vite-plugin-vue-devtools
      // VueDevTools(),
    ],

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@unhead/vue',
        '@vueuse/core',
        'pinia',
        'axios',
        'quasar',
        'lodash-es',
      ],
      // exclude: [
      //   'vue-demi',
      // ],
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      concurrency: 25,
      beastiesOptions: {
        // preload: 'swap',
        pruneSource: true,
        // reduceInlineStyles: false,
      },
      // includedRoutes(paths) {
      //   console.log(paths)
      //   return paths
      // },
      // onPageRendered(routePath, renderedHTML) {
      //   console.log(`Rendering page: ${routePath}`)
      //   const filePath = routePath === '/' ? 'index.html' : `${routePath.replace(/\/$/, '')}.html`
      //   const destPath = path.join('./dist', filePath)
      //   fs.mkdirSync(path.dirname(destPath), { recursive: true })
      //   fs.writeFileSync(destPath, renderedHTML)
      //   return renderedHTML
      // },
      onFinished() {
        // fix imagemin invalid optimization :D
        const copyFiles = ['apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png']
        for (const file of copyFiles) {
          fs.copyFileSync(`./public/img/${file}`, `./dist/img/${file}`)
        }
        generateSitemap({
          hostname: process.env.VITE_APP_URL ?? 'http://localhost/',
        })
      },
    },

    ssr: {
      noExternal: ['workbox-window'],
    },

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      server: {
        deps: {
          inline: ['@vue', '@vueuse', 'vue-demi'],
        },
      },
    },
  }
})
