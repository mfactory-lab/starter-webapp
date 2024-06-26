import { createPinia } from 'pinia'
import type { UserModule } from '~/types'

export const install: UserModule = ({ isClient, app, initialState }) => {
  const pinia = createPinia()
  app.use(pinia)

  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) {
    pinia.state.value = initialState.pinia || {}
  } else {
    initialState.pinia = pinia.state.value
  }
}
