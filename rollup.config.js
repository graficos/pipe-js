// https://github.com/jaebradley/example-rollup-library/blob/master/rollup.config.js
// https://github.com/rollup/rollup-starter-lib/blob/master/rollup.config.js
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const NAME = 'pipe-js'
const INPUT_FILE = 'index'

const terserOptions = {
  compress: true,
  mangle: true,
}

const plugins = [babel({ exclude: 'node_modules/**' })]

const createConfig = ({ input, minify, format, ext = 'js' }) => {
  const minifierSuffix = minify ? '.min' : ''
  return {
    input: `src/${input}.js`,
    output: {
      name: NAME,
      file: `dist/${NAME}.${format}${minifierSuffix}.${ext}`,
      format,
      sourcemap: true,
    },
    plugins: [...plugins, ...(minify ? [terser(terserOptions)] : [])],
  }
}

require('rimraf').sync('dist')

export default [
  { input: INPUT_FILE, format: 'esm', minify: false, ext: 'mjs' },
  { input: INPUT_FILE, format: 'esm', minify: true, ext: 'mjs' },
  { input: INPUT_FILE, format: 'esm', minify: false },
  { input: INPUT_FILE, format: 'esm', minify: true },
  { input: INPUT_FILE, format: 'umd', minify: false },
  { input: INPUT_FILE, format: 'umd', minify: true },
  { input: INPUT_FILE, format: 'cjs', minify: false },
  { input: INPUT_FILE, format: 'cjs', minify: true },
].map(createConfig)
