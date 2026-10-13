const terser = require('@rollup/plugin-terser')
const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')

module.exports = [
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
    external: ['react', 'react-dom'],
    plugins: [typescript(), terser()],
  },
]
