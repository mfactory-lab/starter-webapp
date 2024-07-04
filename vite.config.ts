import path, { resolve } from 'node:path'
import fs from 'node:fs'
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
          globPatterns: ['**/*.{js,css,webp,png,svg,gif,mp4,ico,woff2}'],
        },
        includeAssets: ['**/*.{webp,png,jpg,svg,gif,ico,txt,woff2}'],
        manifest: {
          name: env.VITE_APP_NAME ?? 'Starter',
          short_name: env.VITE_APP_SHORT_NAME ?? env.VITE_APP_NAME ?? 'Starter',
          description: env.VITE_APP_DESCRIPTION,
          theme_color: '#ffffff',
          display: 'minimal-ui',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'favicon.svg',
              sizes: '50x50',
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
      },
      includedRoutes(paths) {
        const staticPaths = paths.filter(path => !path.includes(':'))
        const dynamicPaths = [] as string[]
        return [...staticPaths, ...dynamicPaths, '/404']
      },
      onPageRendered(_, renderedHTML) {
        // support critters with base path
        if (base !== '/') {
          const srcDir = path.resolve('./dist')
          const destDir = path.join('./dist', base)
          fs.mkdirSync(destDir, { recursive: true })
          fs.readdirSync(srcDir).forEach((item) => {
            if (item !== path.basename(base)) {
              const srcPath = path.join(srcDir, item)
              const destPath = path.join(destDir, item)
              fs.cpSync(srcPath, destPath, { recursive: true })
            }
          })
        }
        return renderedHTML
      },
      onFinished() {
        generateSitemap({
          hostname: env.VITE_APP_URL ?? 'http://localhost/',
        })
        // support critters with base path
        if (base !== '/') {
          fs.rmSync(path.join('./dist', base), { recursive: true, force: true })
        }
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
