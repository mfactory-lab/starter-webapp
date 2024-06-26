declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<NonNullable<unknown>, NonNullable<unknown>, any>
  export default component
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<NonNullable<unknown>, NonNullable<unknown>, any>
  export default component
}
