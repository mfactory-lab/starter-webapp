import * as Sentry from '@sentry/vue'
import type { UserModule } from '~/types'

const ignoreErrors = [
  /ResizeObserver/,
  // Wallets
  /.*TrustWeb3Provider*/g,
  /.*trustwallet*/g,
  /.*solana*/g,
  // Known errors
  /.*Too many requests*/g,
  /.*Loading chunk*/g,
  /.*Load failed*/g,
  /.*Cancel rendering route*/g,
  /.*currentTarget, detail, isTrusted, target*/g,
  /.*Network Error*/g,
  /.*Failed to fetch*/g,
  /.*User rejected request*/g,
  /.*The source https*/g,
  /.*Missing or invalid topic field*/g,
  /.*AbortError: The user aborted a request*/g,
  /.*INVALID_ARGUMENT*/g,
  /.*Invalid JSON RPC response*/g,
  /.*Blocked a frame with origin*/g,
  /.*User closed modal*/g,
  /.*Something went wrong!*/g,
]

export const install: UserModule = ({ app, router }) => {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (dsn) {
    Sentry.init({
      app,
      dsn,
      release: import.meta.env.VERSION,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.2,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [
        Sentry.browserTracingIntegration({ router }),
        Sentry.replayIntegration(),
      ],
      ignoreErrors,
      tracePropagationTargets: ['jpool.one', 'localhost', /^\//],
    })
  }
}
