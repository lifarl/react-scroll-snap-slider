import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  include: [
    './src/**/*.{ts,tsx}',
    './examples/**/*.{ts,tsx}',
    './App.tsx',
    './index.html',
  ],
  exclude: [],
  presets: ['@pandacss/preset-panda'],
  jsxFramework: 'react',
  outdir: 'styled-system',
  importMap: 'styled-system'
})
