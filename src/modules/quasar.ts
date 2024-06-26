import type { QuasarPluginOptions } from 'quasar'
import { Dark, Dialog, Loading, LocalStorage, Notify, Quasar } from 'quasar'
import iconSet from 'quasar/icon-set/svg-eva-icons.js'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, app }) => {
  if (!isClient) {
    return
  }

  app.use(Quasar, {
    plugins: {
      Dialog,
      Notify,
      LocalStorage,
      Dark,
      Loading,
    },
    iconSet,
  } as QuasarPluginOptions)
}
