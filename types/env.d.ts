/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly MODE: 'production' | 'development' | 'staging'
  readonly VERSION: string

  readonly VITE_APP_URL?: string
  readonly VITE_APP_NAME?: string
  readonly VITE_APP_SHORT_NAME?: string
  readonly VITE_APP_DESCRIPTION?: string
  readonly VITE_APP_KEYWORDS?: string
  readonly VITE_SENTRY_DSN?: string
}
