import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import filesize from 'rollup-plugin-filesize'
import progress from 'rollup-plugin-progress'
import visualizer from 'rollup-plugin-visualizer'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    external: ['react', 'react-dom', 'react-is', 'styled-components'],
    plugins: [
      resolve(),
      typescript(),
      filesize(),
      progress({ clearLine: false }),
      visualizer({
        filename: './bundleStats.html',
        title: 'Bundle Stats',
      }),
      commonjs({
        namedExports: {
          'node_modules/react/index.js': ['createElement'],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      terser(),
    ],
  },
]
