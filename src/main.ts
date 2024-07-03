import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'

import './assets/styles/main.scss'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    // strict: true,
    base: import.meta.env.BASE_URL,
    routes: setupLayouts(routes),
  },
  (ctx) => {
    Object.values(import.meta.glob<{ install: any }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
  },
)
