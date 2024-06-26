import antfu from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'

export default antfu(
  {
    gitignore: true,
    stylistic: true,
    typescript: true,
    markdown: true,
    formatters: {
      css: 'prettier',
    },
    yaml: true,
    toml: true,
    vue: true,
    ignores: [
      '**/build/**',
      '**/dist/**',
      '**/coverage/**',
    ],
    plugins: [
      oxlint.configs['flat/recommended'],
    ],
  }, {
    rules: {
      'antfu/consistent-list-newline': 'off',
      'curly': ['error', 'all'],
      'max-statements-per-line': ['error', { max: 2 }],
      'node/prefer-global/process': 'off',
      'node/prefer-global/buffer': 'off',
      'no-console': 'off',
      'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'toml/padding-line-between-pairs': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    },
  },
)
