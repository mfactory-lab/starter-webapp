import type { QuasarPluginOptions } from 'quasar'
import { Dark, Dialog, Loading, LocalStorage, Notify, Quasar } from 'quasar'
import iconSet from 'quasar/icon-set/svg-eva-icons.js'
import type { UserModule } from '~/types'

export const install: UserModule = (ctx) => {
  ctx.app.use(Quasar, {
    config: {
      ripple: false,
    },
    plugins: {
      Dialog,
      Notify,
      LocalStorage,
      Dark,
      Loading,
    },
    iconSet,
  } as QuasarPluginOptions,
  // @ts-expect-error - ssrContext is valid here
  {
    req: {
      url: ctx.router.currentRoute.value.path,
      headers: {},
    },
  },
  )
}
