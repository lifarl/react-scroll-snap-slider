import { nodeResolve } from '@rollup/plugin-node-resolve'
import { fileURLToPath } from 'url'
import { dirname, resolve as resolvePath } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'
import visualizer from 'rollup-plugin-visualizer'
import dts from 'rollup-plugin-dts'
import { readFileSync } from 'fs'

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
)

export default [
  // JS builds (ESM + CJS)
  {
    input: { index: 'src/index.ts' },
    output: [
      { dir: 'dist', format: 'esm', entryFileNames: '[name].mjs', sourcemap: true },
      { dir: 'dist', format: 'cjs', entryFileNames: '[name].cjs', sourcemap: true, exports: 'named' },
    ],
    external: ['react', 'react-dom'],
    treeshake: true,
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      visualizer({ filename: './bundleStats.html', title: 'Bundle Stats' }),
      terser(),
    ],
  },

  // Types: roll up to a single dist/index.d.ts
  {
    input: 'dist/src/index.d.ts',
    output: { file: 'dist/index.d.ts', format: 'es' },
    plugins: [dts()],
  },
]
