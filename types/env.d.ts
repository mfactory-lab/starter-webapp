/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly MODE: 'production' | 'development' | 'staging'
  readonly VERSION: string

  readonly VITE_SENTRY_DSN?: string
  readonly VITE_APP_URL?: string
}
