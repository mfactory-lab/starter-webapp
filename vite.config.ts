import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import generateSitemap from 'vite-ssg-sitemap'
import { VitePWA } from 'vite-plugin-pwa'
import { quasar } from '@quasar/vite-plugin'
import { unheadVueComposablesImports } from '@unhead/vue'
import UnheadVite from '@unhead/addons/vite'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd())
  const baseUrl = env.VITE_BASE_URL ?? '/'

  return {
    base: baseUrl,

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

      // https://github.com/unjs/unhead
      UnheadVite({ treeshake: { enabled: true } }),

      // https://github.com/posva/unplugin-vue-router
      VueRouter({
        extensions: ['.vue', '.md'],
        dts: 'types/typed-router.d.ts',
      }),

      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),

      // https://github.com/antfu/unplugin-icons
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        customCollections: {
          app: FileSystemIconLoader(
            './src/assets/img/icons',
            svg => svg.replace(/^<svg /, '<svg fill="currentColor" '),
          ),
        },
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

      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: 'Jpool',
          short_name: 'Jpool',
          theme_color: '#ffffff',
          icons: [
            {
              src: `${baseUrl}pwa-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: `${baseUrl}pwa-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: `${baseUrl}pwa-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
      }),

      // https://github.com/quasarframework/quasar
      quasar({
        autoImportComponentCase: 'kebab',
        sassVariables: './src/assets/styles/_variables.scss',
        runMode: isSsrBuild ? 'ssr-server' : 'web-client',
      }),

      // // https://github.com/feat-agency/vite-plugin-webfont-dl
      // WebfontDownload(),
      //
      // // https://github.com/webfansplz/vite-plugin-vue-devtools
      // VueDevTools(),
    ],

    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@unhead/vue',
        '@vueuse/core',
        // 'quasar',
      ],
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
      crittersOptions: {
        reduceInlineStyles: false,
      },
      onFinished() {
        generateSitemap({
          // TODO: fix
          // hostname: VITE_BASE_URL ?? '/',
        })
      },
    },

    ssr: {
      // TODO: workaround until they support native ESM
      noExternal: ['workbox-window'],
    },

    // https://github.com/vitest-dev/vitest
    test: {
      include: ['test/**/*.test.ts'],
      environment: 'jsdom',
      deps: {
        inline: ['@vue', '@vueuse'],
      },
    },
  }
})
