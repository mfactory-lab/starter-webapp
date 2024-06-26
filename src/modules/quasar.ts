import type { QuasarPluginOptions } from 'quasar'
import iconSet from 'quasar/icon-set/svg-eva-icons.js'
import { Dark, Loading, LocalStorage, Notify, Quasar } from 'quasar'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, app }) => {
  if (!isClient) {
    return
  }

  app.use(Quasar, {
    plugins: {
      Notify,
      LocalStorage,
      Dark,
      Loading,
    },
    iconSet,
  } as QuasarPluginOptions)
}
