import { resolve } from 'node:path'
import * as path from 'node:path'
import * as fs from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Layouts from 'vite-plugin-vue-layouts'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import WebfontDownload from 'vite-plugin-webfont-dl'
import VueRouter from 'unplugin-vue-router/vite'
import Imagemin from 'unplugin-imagemin/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { quasar } from '@quasar/vite-plugin'
import { unheadVueComposablesImports } from '@unhead/vue'
import UnheadVite from '@unhead/addons/vite'
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
        '~/': `${resolve(__dirname, 'src')}/`,
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
        sassVariables: './src/assets/styles/variables.scss',
        runMode: isSsrBuild ? 'ssr-server' : 'web-client',
      }),

      // https://github.com/feat-agency/vite-plugin-webfont-dl
      WebfontDownload(),

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          navigateFallback: '404.html',
          offlineGoogleAnalytics: true,
        },
        includeAssets: ['/*.{ico,svg,png}'],
        // includeAssets: ['favicon.ico', 'favicon.svg', 'favicon-dark.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Jpool',
          short_name: 'Jpool',
          theme_color: '#ffffff',
          icons: [
            {
              src: `pwa-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `pwa-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: `favicon.svg`,
              sizes: '165x165',
              type: 'image/svg',
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
      ],
      exclude: [
        'vue-demi',
      ],
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      concurrency: 25,
      crittersOptions: {
        preload: 'swap',
        pruneSource: true,
        reduceInlineStyles: false,
        inlineFonts: false,
        preloadFonts: false,
      },
      base: '/',
      includedRoutes(paths) {
        const staticPaths = paths.filter(path => !path.includes(':'))
        const dynamicPaths = [] as string[]
        return [...staticPaths, ...dynamicPaths, '/404']
      },
      onFinished() {
        generateSitemap({
          hostname: env.VITE_APP_URL ?? 'http://localhost/',
        })

        // Apply base path to all HTML files
        if (base) {
          const distDir = path.resolve(__dirname, 'dist')
          const files = fs.readdirSync(distDir)
          files.forEach((file) => {
            if (file.endsWith('.html')) {
              const filePath = path.join(distDir, file)
              let content = fs.readFileSync(filePath, 'utf-8')
              content = content.replace(/(href|src)="\/([^"]*)"/g, `$1="${base}$2"`)
              content = content.replace(/(url\()\/([^)]*)/g, `$1${base}$2`)
              fs.writeFileSync(filePath, content, 'utf-8')
            }
          })
        }
      },
    },

    // ssr: {
    //   noExternal: ['workbox-window'],
    // },

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
