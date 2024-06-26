// import i18next from 'i18next'
// import I18NextVue from 'i18next-vue'
// import LanguageDetector from 'i18next-browser-languagedetector'
// import type { UserModule } from '~/types'
//
// const resources = Object
//   .entries(import.meta.glob<{ default: any }>('@/locales/*.json', { eager: true }))
//   .reduce((acc, [key, value]) => {
//     // eslint-disable-next-line regexp/no-super-linear-backtracking
//     const id = key.match(/.*\/(.*)\.json$/)![1]!.toLowerCase()
//     acc[id] = { translation: value }
//     return acc
//   }, {} as Record<string, any>)
//
// export const install: UserModule = ({ app }) => {
//   i18next
//     .use(LanguageDetector)
//     .init({
//       // debug: import.meta.env.DEV,
//       fallbackLng: 'en',
//       resources,
//     })
//     .catch()
//   app.use(I18NextVue, { i18next })
// }
